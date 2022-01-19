import { makeAutoObservable } from 'mobx';
import { Iresult, IresultWithData } from '../../dto/result';
import { ITransaction, TransactionRequest, uploadOptions } from '../../dto/Transaction';
import request from '../controllers';

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
  async upload(form: FormData, option: uploadOptions) {
    const url = `/uploadcsv?option=${option}`;
    const result = await request.post<IresultWithData<ITransaction[]>>({ url, body: form });
    if (result?.result === 'ok') {
      if (option === 'doubles') {
        console.log(result.data);
      } else if (option === 'base') {
        this.transactions = result.data;
      } else if (option === 'save') {
        alert('uploaded');
      }
    }
  }
}

export const transactionState = new Transaction();
