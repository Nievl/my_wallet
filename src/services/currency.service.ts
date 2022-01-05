import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import { Currency } from '../models/entity/Currency';
import { CurrencyRequest } from '../../web/dto/Currency';

@Service()
export default class CurrencyService {
  public getAll(): Promise<Currency[]> {
    return getRepository(Currency).find();
  }
  public async addOne(currency: CurrencyRequest): Promise<Currency[]> {
    const _currency = new Currency();
    _currency.name = currency.name;
    _currency.description = currency.description;
    await getRepository(Currency).save(_currency);
    console.log('Currency has been saved');
    return getRepository(Currency).find();
  }
  public async remove(id: number): Promise<Currency[]> {
    await getRepository(Currency).delete(id);
    console.log('Currency has been deleted');
    return getRepository(Currency).find();
  }
}
