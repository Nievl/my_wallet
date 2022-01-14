import { makeAutoObservable } from 'mobx';

export type Ierr = {
  id: number;
  message: string;
};
class Errors {
  errors: Ierr[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  add(message: string[]) {
    this.errors.push({ id: Date.now(), message: message.join('\n') });
  }
  remove(id: number) {
    this.errors = this.errors.filter((m) => !(m.id === id));
  }
}

export const errorsState = new Errors();
