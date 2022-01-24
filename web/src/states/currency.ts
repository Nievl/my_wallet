import { makeAutoObservable } from 'mobx';
import { ICurrency } from '../../dto/Currency';
import { addOption, deleteOption, getOption } from '../controllers/options';

class Currency {
  list: ICurrency[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  add(currency: ICurrency[]) {
    this.list = currency;
  }
  async getAll() {
    const result = await getOption<ICurrency>('currency');
    if (result) this.list = result;
  }
}

export const currenciesState = new Currency();
