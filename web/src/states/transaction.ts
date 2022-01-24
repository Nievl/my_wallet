import { makeAutoObservable } from 'mobx';
import { Iresult, IresultWithData } from '../../dto/result';
import { IinOutCome, ITransaction, inOutComeRequest, uploadOptions } from '../../dto/Transaction';
import request from '../controllers';

class Transaction {
  transactions: IinOutCome[] = [];
  private url = '/transaction';

  constructor() {
    makeAutoObservable(this);
  }

  add(currency: IinOutCome[]) {
    this.transactions = currency;
  }
  async getAll() {
    const result = await request.get<IinOutCome[]>({ url: this.url });
    if (result) this.transactions = result;
  }
  async remove(id: string) {
    const url = `/transaction/${id}`;
    const result = await request.delete<Iresult>({ url });
    if (result) this.transactions = this.transactions.filter((tr) => tr.uid !== id);
  }
  async addOne(transaction: inOutComeRequest) {
    const result = await request.post<IinOutCome[]>({ url: this.url, body: transaction });
    if (result) this.transactions = result;
  }
  async upload(form: FormData, option: uploadOptions) {
    const url = `/uploadcsv?option=${option}`;
    const result = await request.post<IresultWithData<IinOutCome[]>>({ url, body: form });
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
