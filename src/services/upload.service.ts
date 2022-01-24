import neatCsv from 'neat-csv';
import { Service } from 'typedi';
import config from '../config';
import { readFile, writeFile } from 'fs/promises';
import { ExceptionTypes } from '../models/enums/exceptionTypes';
import ServiceException from '../models/exceptions/serviceException';
import { ParsedTransaction } from '../../web/dto/Transaction';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import { Transaction } from '../models/entity/Transaction';
import { getRepository } from 'typeorm';
import { Currency } from '../models/entity/Currency';
import { Category } from '../models/entity/Category';
import { createHashTransaction } from '../common/common';
import path from 'path';
import { v4 } from 'uuid';
import { categories, categoryType } from '../models/constants';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
@Service()
export default class UploadService {
  public async uploadCsv(file: Express.Multer.File): Promise<object> {
    const fileArray = file.buffer.toString().trim();
    const parsedData: ParsedTransaction[] = await neatCsv(fileArray, { separator: config.csvSeparator });

    const correctedData = await this.correctSumm(parsedData);

    const doubles = await this.findDoubles(correctedData);
    if (Object.keys(doubles).length !== 0) {
      throw new ServiceException(ExceptionTypes.BadRequest, `file has doubles  \n ${Object.keys(doubles).join(',')} `);
    }

    await getRepository(Transaction).save(correctedData);
    const data = await getRepository(Transaction).find({ relations: ['currency', 'category'] });
    return { result: 'ok', data };
  }
  /**
   * @deprecated
   */
  public async uploadCsvAndFindDoubles(file: Express.Multer.File): Promise<object> {
    const fileArray = file.buffer.toString().trim();
    const parsedData: ParsedTransaction[] = await neatCsv(fileArray, { separator: config.csvSeparator });

    const correctedData = await this.correctSumm(parsedData);

    const data = await this.findDoubles(correctedData);

    return { result: 'ok', data };
  }
  /**
   * @deprecated
   */
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
  /**
   * @deprecated
   */
  public async UploadAndSaveOnDisk(file: Express.Multer.File): Promise<object> {
    const fileArray = file.buffer.toString().trim();
    const parsedData: ParsedTransaction[] = await neatCsv(fileArray, { separator: config.csvSeparator });
    const correctedData = await this.correctSumm(parsedData);
    const doubles = await this.findDoubles(correctedData);
    if (Object.keys(doubles).length !== 0) {
      throw new ServiceException(ExceptionTypes.BadRequest, `file has doubles  \n ${Object.keys(doubles).join(',')} `);
    }
    const preparedData = this.prepareForMoneyManager(correctedData);
    const preparedDataTXT = this.sqlCreate(preparedData);
    const fileName = `/monefy_${Date.now()}`;
    const pathFileJson = path.join('./src/uploaded' + fileName + '.json');
    const pathFileTXT = path.join('./src/uploaded' + fileName + '.sql');
    try {
      await writeFile(pathFileJson, JSON.stringify(preparedData, null, 2));
      await writeFile(pathFileTXT, preparedDataTXT);
    } catch (error) {
      throw new ServiceException(ExceptionTypes.BadRequest, `Incorrect path format \n ${error.message} `);
    }

    return { result: 'ok' };
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

      _transaction.amount = parseInt(t.amount.replace(',', ''));
      _transaction.category = category;
      // _transaction.converted_amount = parseInt(t['converted amount'].replace(',', ''));
      _transaction.currency = currency;
      _transaction.dateChange = new Date();
      _transaction.dateCreate = dayjs.utc(t.date, 'M/D/YYYY').toDate();
      _transaction.description = t.description;
      const { amount, description, dateCreate } = _transaction;
      _transaction.hash = createHashTransaction({ amount, description, category: category.id, dateCreate });

      return _transaction;
    });
    return result;
  }
  private async findDoubles(list: Transaction[]) {
    // const hashes = await getRepository(Transaction).createQueryBuilder().select('hash').execute();
    const counts = {};
    const doubles: { [key: string]: Transaction[] } = {};
    list.forEach(({ hash }) => {
      if (hash in counts) {
        counts[hash] += 1;
      } else {
        counts[hash] = 1;
      }
    });
    Object.entries(counts).forEach(([hash, count]: [string, number]) => {
      if (count > 1) {
        doubles[hash] = list.filter((t) => t.hash === hash);
      }
    });
    return doubles;
  }

  private prepareForMoneyManager(list: Transaction[]): TransactionManagerTrimed[] {
    return list.map(({ amount, category, dateCreate, description }) => {
      const _amount = amount < 0 ? amount * -1 : amount;
      const catType = categoryType[category.name];
      if (!catType) {
        throw new ServiceException(ExceptionTypes.BadRequest, `no find category  \n ${category.name}`);
      }
      return {
        AMOUNT_ACCOUNT: _amount,
        CARDDIVIDMONTH: '0',
        DO_TYPE: categoryType[category.name],
        IN_ZMONEY: _amount.toFixed(1),
        UTIME: dateCreate.getTime(),
        WDATE: dayjs(dateCreate).format('YYYY-MM-DD'),
        ZCONTENT: description ?? '',
        ZDATE: dateCreate.getTime().toString(),
        ZMONEY: _amount.toFixed(1),
        assetUid: '11',
        uid: v4(),
        ctgUid: categories[category.name],
        currencyUid: 'RUB_RUB',
        isSynced: '0',
        syncVersion: 0,
      };
    });
  }
  private sqlCreate(list: TransactionManagerTrimed[]): string {
    return (
      `INSERT INTO INOUTCOME (
      ZMONEY,
      ZDATE,
      ZCONTENT,
      WDATE,
      uid,
      isSynced,
      IN_ZMONEY,
      DO_TYPE,
      currencyUid,
      ctgUid,
      CARDDIVIDMONTH,
      assetUid,
      UTIME,
      syncVersion,
      AMOUNT_ACCOUNT
    )
    VALUES` +
      list
        .map(
          (t) => `(
  '${t.ZMONEY}',
  '${t.ZDATE}',
  '${t.ZCONTENT}',
  '${t.WDATE}',
  '${t.uid}',
  '${t.isSynced}',
  '${t.IN_ZMONEY}',
  '${t.DO_TYPE}',
  '${t.currencyUid}',
  '${t.ctgUid}',
  '${t.CARDDIVIDMONTH}',
  '${t.assetUid}',
  ${t.UTIME},
  ${t.syncVersion},
  ${t.AMOUNT_ACCOUNT})`
        )
        .join(', ')
    )
      .replace(/\n/g, '')
      .replace(/\s+/g, ' ')
      .replace(/^\s+|\s+$/, '');
  }
}

type TransactionManager = {
  uid: string;
  assetUid: string;
  CARDDIVIDMONTH: '0';
  syncVersion: 0;
  ctgUid: string;
  toAssetUid: '';
  // description
  ZCONTENT: string;
  // date in unnix
  ZDATE: string;
  // date in date
  WDATE: string;
  // plus o minus
  DO_TYPE: '1 ' | '0';
  // amount
  ZMONEY: string;
  txUidTrans: '';
  ZDATA: '';
  SMS_RDATE: '';
  // amount
  IN_ZMONEY: string;
  cardDivideUid: '';
  CARD_DIVIDE_MONTH_STR: '';
  // date in unnix
  UTIME: number;
  currencyUid: 'RUB_RUB';
  // amount
  AMOUNT_ACCOUNT: number;
  isSynced: '0';
};

type TransactionManagerTrimed = {
  uid: string;
  assetUid: string;
  CARDDIVIDMONTH: '0';
  syncVersion: 0;
  ctgUid: string;
  // description
  ZCONTENT: string;
  // date in unnix
  ZDATE: string;
  // date in date
  WDATE: string;
  // plus o minus
  DO_TYPE: '1 ' | '0';
  // amount
  ZMONEY: string;
  // amount
  IN_ZMONEY: string;
  // date in unnix
  UTIME: number;
  currencyUid: 'RUB_RUB';
  // amount
  AMOUNT_ACCOUNT: number;
  isSynced: '0';
};
