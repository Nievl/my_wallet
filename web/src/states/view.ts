import { makeAutoObservable } from 'mobx';
import { CategorysState } from './category.state';
import { CompanyState } from './company.state';
import { CurrenciesState } from './currency.state';
import { PaycheckState } from './paycheck.state';
import { SalaryState } from './salary.state';
import { TransactionState } from './transaction.state';

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
    CategorysState.getAll();
    CurrenciesState.getAll();
    TransactionState.getAll();
    PaycheckState.getAll();
    CompanyState.getAll();
    SalaryState.getAll();
  }
}

export const viewState = new View();
