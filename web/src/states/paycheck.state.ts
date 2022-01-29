import { makeObservable } from 'mobx';
import { Iresult } from '../../dto/result';
import { IPaycheck, PaycheckRequest } from '../../dto/Paycheck';
import request from '../controllers';
import AbstractState from './AbstractState';

class Paycheck extends AbstractState<IPaycheck> {
  constructor() {
    super('/paycheck');
    makeObservable(this, {});
  }

  async remove(id: number) {
    const url = this.url + `/${id}`;
    const result = await request.delete<Iresult>({ url });
    if (result) this.list = this.list.filter((tr) => tr.id !== id);
  }
  async addOne(transaction: PaycheckRequest) {
    const result = await request.post<IPaycheck>({ url: this.url, body: transaction });
    if (result) this.list.push(result);
  }
}

export const PaycheckState = new Paycheck();
