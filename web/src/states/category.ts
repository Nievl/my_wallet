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
  async remove(id: number) {
    const result = await deleteOption<ICategory>(id, 'category');
    if (result) this.list = result;
  }
  async addOne(name: string, description: string) {
    const result = await addOption<ICategory>(name, description, 'category');
    if (result) this.list = result;
  }
}

export const categorysState = new Category();
