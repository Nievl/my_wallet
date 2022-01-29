import { action, makeObservable, observable } from 'mobx';
import request from '../controllers';

const Props = {
  list: observable,
  getAll: action,
};

export default abstract class AbstractState<T> {
  list: T[];
  url: string;
  constructor(url: string) {
    this.list = [];
    this.url = url;
    makeObservable(this, Props);
  }

  async getAll() {
    const result = await request.get<T[]>({ url: this.url });
    if (result) this.list = result;
  }

  // async remove(id: number) {
  //   const url = this.url + `/${id}`;
  //   const result = await request.delete<Iresult>({ url });
  //   if (result) this.removeCb(id);
  // }
}
