import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

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
