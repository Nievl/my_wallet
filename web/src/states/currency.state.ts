import { makeObservable } from 'mobx';
import { ICurrency } from '../../dto/Currency';
import AbstractState from './AbstractState';

class Currency extends AbstractState<ICurrency> {
  constructor() {
    super('/currency');
    makeObservable(this, {});
  }
}

export const CurrenciesState = new Currency();
