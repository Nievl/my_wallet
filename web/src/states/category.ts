import { makeAutoObservable } from 'mobx';
import { ICategory } from '../../dto/Category';
import { addOption, deleteOption, getOption } from '../controllers/options';

class Category {
  list: ICategory[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  add(category: ICategory[]) {
    this.list = category;
  }
  async getAll() {
    const result = await getOption<ICategory>('category');
    if (result) this.list = result;
  }
}

export const categorysState = new Category();
