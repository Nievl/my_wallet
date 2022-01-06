import { makeAutoObservable } from 'mobx';

class Modals {
  addOption = false;

  constructor() {
    makeAutoObservable(this);
  }

  showAddOption(isOpened: boolean) {
    this.addOption = isOpened;
  }
}

export const modalsState = new Modals();
