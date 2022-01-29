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

  /**
   * @deprecated
   */
  async remove(id: string) {
    const url = this.url + `/${id}`;
    const result = await request.delete<Iresult>({ url });
    if (result) this.list = this.list.filter((tr) => tr.uid !== id);
  }
  async addOne(transaction: inOutComeRequest) {
    const result = await request.post<IinOutCome>({ url: this.url, body: transaction });
    if (result) this.list.push(result);
  }
  /**
   * @deprecated
   */
  async upload(form: FormData, option: uploadOptions) {
    const url = `/uploadcsv?option=${option}`;
    const result = await request.post<IresultWithData<IinOutCome[]>>({ url, body: form });
    if (result?.result === 'ok') {
      if (option === 'doubles') {
        console.log(result.data);
      } else if (option === 'base') {
        this.list = result.data;
      } else if (option === 'save') {
        alert('uploaded');
      }
    }
  }
}

export const TransactionState = new Transaction();
