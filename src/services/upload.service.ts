import neatCsv from 'neat-csv';
import { Service } from 'typedi';
import config from '../config';
import { readFile } from 'fs/promises';
import { ExceptionTypes } from '../models/enums/exceptionTypes';
import ServiceException from '../models/exceptions/serviceException';
import { ParsedTransaction } from '../../web/dto/Transaction';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Transaction } from '../models/entity/Transaction';
import { getRepository } from 'typeorm';
import { Currency } from '../models/entity/Currency';
import { Category } from '../models/entity/Category';
import { createHashTransaction } from '../common/common';

dayjs.extend(customParseFormat);
@Service()
export default class UploadService {
  public async uploadCsv(file: Express.Multer.File): Promise<object> {
    const fileArray = file.buffer.toString().trim();
    const parsedData: ParsedTransaction[] = await neatCsv(fileArray, { separator: config.csvSeparator });
    const correctedData = await this.correctSumm(parsedData);
    await getRepository(Transaction).save(correctedData);
    const data = await getRepository(Transaction).find({ relations: ['currency', 'category'] });
    return { result: 'ok', data };
  }
  public async uploadFromPath(path: string): Promise<object> {
    try {
      const file = (await readFile(path, { encoding: 'utf-8' })).trim();
      const data: ParsedTransaction[] = await neatCsv(file, { separator: config.csvSeparator });
      // const correctedData = this.correctSumm(data);
      return { result: 'ok', data: [] };
    } catch (error) {
      throw new ServiceException(ExceptionTypes.BadRequest, `Incorrect path format \n ${error.message} `);
    }
  }
  private async correctSumm(list: ParsedTransaction[]): Promise<Transaction[]> {
    const currencies = await getRepository(Currency).find();

    const categories = await getRepository(Category).find();

    const result = list.map((t, i) => {
      const _transaction = new Transaction();
      const currency = currencies.find((c) => c.name === t.currency);
      if (!currency) {
        throw new ServiceException(ExceptionTypes.NotFound, `Not found currency ${t.currency}`);
      }
      const category = categories.find((c) => c.name === t.category);

      if (!category) {
        throw new ServiceException(ExceptionTypes.NotFound, `Not found category ${t.category}`);
      }

      _transaction.account = t.account;
      _transaction.amount = parseInt(t.amount.replace(',', ''));
      _transaction.category = category;
      _transaction.converted_amount = parseInt(t['converted amount'].replace(',', ''));
      _transaction.currency = currency;
      _transaction.dateChange = new Date();
      _transaction.dateCreate = dayjs(t.date, 'DD-MM-YYYY').toDate();
      _transaction.description = t.description;
      const { amount, description, dateCreate } = _transaction;
      _transaction.hash = createHashTransaction({ amount, description, category: category.id, dateCreate });

      return _transaction;
    });
    return result;
  }
}
