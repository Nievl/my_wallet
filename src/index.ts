import 'reflect-metadata';
import bodyParser from 'body-parser';
import express from 'express';
import Container from 'typedi';
import path from 'path';
import { useContainer, useExpressServer } from 'routing-controllers';
import config from './config';
import { DataBase } from './database';
import ErrorHandlerMiddleware from './services/middlewares/errorHandlerMiddleware';
import { logger, loggerMiddleware } from './services/initLog';

const server = express();

useExpressServer(server, {
  defaultErrorHandler: false,
  controllers: [path.join(__dirname + '/controllers/*.ts')],
  classTransformer: false,
  validation: false,
  middlewares: [bodyParser.urlencoded({ extended: true }), bodyParser.json(), ErrorHandlerMiddleware, loggerMiddleware],
});

server.use('/', express.static(path.join(__dirname + '/../web/build')));
export const database = new DataBase();
useContainer(Container);

(async () => {
  try {
    await server.listen(config.listenPort);
    logger.info(`Example app listening at http://localhost:${config.listenPort}`);
    // DB connection init
    const message = await database.connect();
    logger.info(message, 'Connection to DB was established');
  } catch (error) {
    logger.error(error);
  }
})();
