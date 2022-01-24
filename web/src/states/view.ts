import { makeAutoObservable } from 'mobx';
import { categorysState } from './category';
import { currenciesState } from './currency';
import { transactionState } from './transaction';

class View {
  addOption = false;
  addTransaction = false;

  constructor() {
    makeAutoObservable(this);
  }

  showAddOption(isOpened: boolean) {
    this.addOption = isOpened;
  }
  showAddTransaction(isOpened: boolean) {
    this.addTransaction = isOpened;
  }
  initialReq() {
    categorysState.getAll();
    currenciesState.getAll();
    transactionState.getAll();
  }
}

export const viewState = new View();
