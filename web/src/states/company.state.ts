import { Iresult } from '../../dto/result';
import { ICompany, CompanyRequest } from '../../dto/Company';
import request from '../controllers';
import { makeObservable } from 'mobx';
import AbstractState from './AbstractState';

class Company extends AbstractState<ICompany> {
  constructor() {
    super('/company');
    makeObservable(this, {});
  }

  async remove(id: number) {
    const url = this.url + `/${id}`;
    const result = await request.delete<Iresult>({ url });
    if (result) this.list = this.list.filter((tr) => tr.id !== id);
  }
  async addOne(company: CompanyRequest) {
    const result = await request.post<ICompany>({ url: this.url, body: company });
    if (result) this.list.push(result);
  }
}

export const CompanyState = new Company();
