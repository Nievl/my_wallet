import { Service } from 'typedi';
import CurrencyRepository from '../repository/currency.repository';
import { Icurrency } from '../models/interfaces/Icurrency';

@Service()
export default class CurrencyService {
  constructor(public currencyRepository: CurrencyRepository) {}

  public getAll(): Promise<Icurrency[]> {
    return this.currencyRepository.getAll();
  }
}
