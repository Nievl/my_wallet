import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

export type Ierr = {
  id: number;
  message: string;
};
class Errors {
  errors: Ierr[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  add(message: string) {
    this.errors.push({ id: Date.now(), message });
  }
  remove(id: number) {
    this.errors.filter((m) => !(m.id === id));
  }
}

export const errorsState = new Errors();
