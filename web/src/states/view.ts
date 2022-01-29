import { makeAutoObservable } from 'mobx';
import { CategorysState } from './category.state';
import { CompanyState } from './company.state';
import { CurrenciesState } from './currency.state';
import { MonthState } from './Month.state';
import { PaycheckState } from './paycheck.state';
import { SalaryState } from './Salary.state';
import { TransactionState } from './transaction.state';

class View {
  addOption = false;
  addTransaction = false;
  addCompany = false;
  addPaycheck = false;
  addSalary = false;

  constructor() {
    makeAutoObservable(this);
  }

  showAddOption(isOpened: boolean) {
    this.addOption = isOpened;
  }
  showAddTransaction(isOpened: boolean) {
    this.addTransaction = isOpened;
  }
  showAddCompany(isOpened: boolean) {
    this.addCompany = isOpened;
  }
  showAddPaycheck(isOpened: boolean) {
    this.addPaycheck = isOpened;
  }
  showAddSalary(isOpened: boolean) {
    this.addSalary = isOpened;
  }
  initialReq() {
    CategorysState.getAll();
    CurrenciesState.getAll();
    TransactionState.getAll();
    PaycheckState.getAll();
    PaycheckState.getAllTypes();
    CompanyState.getAll();
    SalaryState.getAll();
    MonthState.getAll();
    MonthState.getAllTypes();
  }
}

export const viewState = new View();
