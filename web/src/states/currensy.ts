import { makeAutoObservable } from 'mobx';
import { ICurrency } from '../../dto/Currency';
import { addOption, deleteOption, getOption } from '../controllers/options';

class Currency {
  currency: ICurrency[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  add(currency: ICurrency[]) {
    this.currency = currency;
  }
  async getAll() {
    const result = await getOption<ICurrency>('currency');
    if (result) this.currency = result;
  }
  async remove(id: number) {
    const result = await deleteOption<ICurrency>(id, 'currency');
    if (result) this.currency = result;
  }
  async addOne(name: string, description: string) {
    const result = await addOption<ICurrency>(name, description, 'currency');
    if (result) this.currency = result;
  }
}

export const currencysState = new Currency();
