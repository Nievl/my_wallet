import 'reflect-metadata';
import bodyParser from 'body-parser';
import express from 'express';
import Container from 'typedi';
import config from './config';
import { useContainer, useExpressServer } from 'routing-controllers';
import { DataBase } from './database';
import ErrorHandlerMiddleware from './services/middlewares/errorHandlerMiddleware';
import { VersionController } from './controllers/version.controller';
import { UploadCsv } from './controllers/uploadCsv.controllers';

const server = express();

useExpressServer(server, {
  defaultErrorHandler: false,
  controllers: [VersionController, UploadCsv],
  classTransformer: false,
  validation: false,
  middlewares: [
    bodyParser.urlencoded({ extended: true }),
    bodyParser.json(),
    ErrorHandlerMiddleware,
    express.static('web/build'),
  ],
});
const database = new DataBase();
useContainer(Container);

// DB connection init
database
  .connect()
  .then(async (connection) => console.log('Connection to DB was established'))
  .catch(() => console.log("Can't establish connection to DB"));

server.listen(config.listenPort, () => {
  console.log(`Example app listening at http://localhost:${config.listenPort}`);
});
