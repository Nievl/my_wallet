import neatCsv from 'neat-csv';
import { Service } from 'typedi';
import config from '../config';
import { ExceptionTypes } from '../models/enums/exceptionTypes';
import ServiceException from '../models/exceptions/serviceException';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const version: string = require('../../package.json').version;

@Service()
export default class UploadService {
  public async uploadCsv(file: Express.Multer.File): Promise<object> {
    try {
      const fileArray = file.buffer.toString();
      const data = await neatCsv(fileArray, { separator: config.csvSeparator });

      return { result: 'ok', data };
    } catch (error) {
      throw new ServiceException(ExceptionTypes.BadRequest, 'Incorrect file format');
    }
  }
}
