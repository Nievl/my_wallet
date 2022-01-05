import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Iresult } from '../../dto/result';
import { ITransaction, TransactionRequest } from '../../dto/Transaction';
import request from '../controllers';
import { addOption, deleteOption } from '../controllers/options';

class Transaction {
  transactions: ITransaction[] = [];
  private url = '/transaction';

  constructor() {
    makeAutoObservable(this);
  }

  add(currency: ITransaction[]) {
    this.transactions = currency;
  }
  async getAll() {
    const result = await request.get<ITransaction[]>({ url: this.url });
    if (result) this.transactions = result;
  }
  async remove(id: number) {
    const url = `/transaction/${id}`;
    const result = await request.delete<Iresult>({ url });
    if (result) this.transactions = this.transactions.filter((tr) => tr.id !== id);
  }
  async addOne(transaction: TransactionRequest) {
    const result = await request.post<ITransaction[]>({ url: this.url, body: transaction });
    if (result) this.transactions = result;
  }
}

export const currencysState = new Transaction();
