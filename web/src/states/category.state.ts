import { makeObservable } from 'mobx';
import { ICategory } from '../../dto/Category';
import AbstractState from './AbstractState';

class Category extends AbstractState<ICategory> {
  constructor() {
    super('/category');
    makeObservable(this, {});
  }
}

export const CategorysState = new Category();
