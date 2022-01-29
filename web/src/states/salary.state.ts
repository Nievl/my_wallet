import { makeObservable } from 'mobx';
import { Iresult } from '../../dto/result';
import { ISalary, SalaryRequest } from '../../dto/Salary';
import request from '../controllers';
import AbstractState from './AbstractState';
class Salary extends AbstractState<ISalary> {
  constructor() {
    super('/salary');
    makeObservable(this, {});
  }

  async remove(id: number) {
    const url = this.url + `/${id}`;
    const result = await request.delete<Iresult>({ url });
    if (result) this.list = this.list.filter((tr) => tr.id !== id);
  }
  
  async addOne(salary: SalaryRequest) {
    const result = await request.post<ISalary>({ url: this.url, body: salary });
    if (result) this.list.push(result);
  }
}
export const SalaryState = new Salary();
