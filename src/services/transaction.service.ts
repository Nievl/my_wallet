import { Service } from 'typedi';
import { inOutComeRequest } from '../../web/dto/Transaction';
import ServiceException from '../models/exceptions/serviceException';
import { ExceptionTypes } from '../models/enums/exceptionTypes';
import TransactionRepository from '../repository/transaction.repository';
import { IinOutCome, IinOutComeDB } from '../models/interfaces/Itransaction';
import CurrencyRepository from '../repository/currency.repository';
import CategoryRepository from '../repository/category.repository';
import { Iresult } from '../../web/dto/result';
import { v4 } from 'uuid';
import { categoryType } from '../models/constants';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
@Service()
export default class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    private currencyRepository: CurrencyRepository,
    private categoryRepository: CategoryRepository
  ) {}
  public getAll(): Promise<IinOutCome[]> {
    return this.transactionRepository.getAll();
  }
  public findOne(uid: string): Promise<[IinOutCome]> {
    return this.transactionRepository.findOne(uid);
  }

  public async addOne(transaction: inOutComeRequest) {
    const currency = await this.currencyRepository.findOne(transaction.currency);
    if (!currency) {
      throw new ServiceException(ExceptionTypes.NotFound, `Not found currency ${transaction.currency}`);
    }
    const category = await this.categoryRepository.findOne(transaction.category);
    if (!category) {
      throw new ServiceException(ExceptionTypes.NotFound, `Not found category ${transaction.category}`);
    }
    const _transaction: IinOutComeDB = {
      AMOUNT_ACCOUNT: transaction.amount,
      DO_TYPE: categoryType[transaction.category],
      UTIME: transaction.date,
      WDATE: dayjs(transaction.date).format('YYYY-MM-DD'),
      ZCONTENT: transaction.description ?? '',
      uid: v4(),
      ctgUid: transaction.category,
      currencyUid: transaction.currency,
    };

    await this.transactionRepository.addOne(_transaction);
    console.log('Transaction has been saved');
    return this.transactionRepository.findOne(_transaction.uid);
  }
  public async remove(uid: string): Promise<Iresult> {
    this.transactionRepository.remove(uid);
    console.log('Category has been saved');
    return { result: 'ok' };
  }
}
