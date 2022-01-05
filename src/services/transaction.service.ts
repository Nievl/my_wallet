import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import { TransactionRequest } from '../../web/dto/Transaction';
import { createHashTransaction } from '../common/common';
import { Transaction } from '../models/entity/Transaction';
import { Iresult } from '../../web/dto/result';

@Service()
export default class TransactionService {
  public getAll(): Promise<Transaction[]> {
    return getRepository(Transaction).find();
  }
  public async addOne(transaction: TransactionRequest): Promise<Transaction[]> {
    const _transaction = new Transaction();

    _transaction.account = transaction.account;
    _transaction.amount = transaction.amount;
    _transaction.category = _transaction.category;
    _transaction.converted_amount = transaction.converted_amount;
    _transaction.currency = transaction.currency;
    _transaction.dateChange = new Date();
    _transaction.dateCreate = transaction.dateCreate;
    _transaction.description = transaction.description;
    _transaction.hash = createHashTransaction(transaction);

    await getRepository(Transaction).save(_transaction);
    console.log('Transaction has been saved');
    return getRepository(Transaction).find();
  }
  public async remove(id: number): Promise<Iresult> {
    await getRepository(Transaction).delete(id);
    console.log('Category has been saved');
    return { result: 'ok' };
  }
}
