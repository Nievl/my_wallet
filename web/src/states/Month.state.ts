import { makeObservable } from 'mobx';
import { Iresult } from '../../dto/result';
import { IMonth, IMonthType, MonthRequest } from '../../dto/Month';
import request from '../controllers';
import AbstractState from './AbstractState';

class Month extends AbstractState<IMonth> {
  listTypes: IMonthType[] = [];

  constructor() {
    super('/month');
    makeObservable(this, {});
  }

  async getAllTypes() {
    const result = await request.get<IMonthType[]>({ url: '/monthtypes' });
    if (result) this.listTypes = result;
  }

  async remove(id: number) {
    const url = this.url + `/${id}`;
    const result = await request.delete<Iresult>({ url });
    if (result) this.list = this.list.filter((tr) => tr.id !== id);
  }

  async addOne(month: MonthRequest) {
    const result = await request.post<IMonth>({ url: this.url, body: month });
    if (result) this.list.push(result);
  }
}
export const MonthState = new Month();
