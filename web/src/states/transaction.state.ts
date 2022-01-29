import { makeObservable } from 'mobx';
import { Iresult, IresultWithData } from '../../dto/result';
import { IinOutCome, inOutComeRequest, uploadOptions } from '../../dto/Transaction';
import request from '../controllers';
import AbstractState from './AbstractState';

class Transaction extends AbstractState<IinOutCome> {
  constructor() {
    super('/transaction');
    makeObservable(this, {});
  }

  async addOne(transaction: inOutComeRequest) {
    const result = await request.post<IinOutCome>({ url: this.url, body: transaction });
    if (result) this.list.push(result);
  }
}

export const TransactionState = new Transaction();
