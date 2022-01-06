import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import { TransactionRequest } from '../../web/dto/Transaction';
import { createHashTransaction } from '../common/common';
import { Transaction } from '../models/entity/Transaction';
import { Iresult } from '../../web/dto/result';
import { Currency } from '../models/entity/Currency';
import ServiceException from '../models/exceptions/serviceException';
import { ExceptionTypes } from '../models/enums/exceptionTypes';
import { Category } from '../models/entity/Category';

@Service()
export default class TransactionService {
  public getAll(): Promise<Transaction[]> {
    return getRepository(Transaction).find({ relations:  ['currency', 'category'] });
  }
  public async addOne(transaction: TransactionRequest): Promise<Transaction[]> {
    const _transaction = new Transaction();
    const currency = await getRepository(Currency).findOne(transaction.currency);
    if (!currency) {
      throw new ServiceException(ExceptionTypes.NotFound, `Not found currency ${transaction.currency}`);
    }
    const category = await getRepository(Category).findOne(transaction.category);
    if (!category) {
      throw new ServiceException(ExceptionTypes.NotFound, `Not found category ${transaction.category}`);
    }

    _transaction.account = transaction.account;
    _transaction.amount = transaction.amount;
    _transaction.category = category;
    _transaction.converted_amount = transaction.converted_amount;
    _transaction.currency = currency;
    _transaction.dateChange = new Date();
    _transaction.dateCreate = transaction.dateCreate;
    _transaction.description = transaction.description;
    _transaction.hash = createHashTransaction(transaction);

    await getRepository(Transaction).save(_transaction);
    console.log('Transaction has been saved');
    return getRepository(Transaction).find({ relations: ['currency', 'category'] });
  }
  public async remove(id: number): Promise<Iresult> {
    await getRepository(Transaction).delete(id);
    console.log('Category has been saved');
    return { result: 'ok' };
  }
}
