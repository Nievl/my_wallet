import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import { CategoryRequest } from '../../web/dto/Category';
import { Category } from '../models/entity/Category';

@Service()
export default class CategoryService {
  public getAll(): Promise<Category[]> {
    return getRepository(Category).find();
  }
  public async addOne(category: CategoryRequest): Promise<Category[]> {
    const _category = new Category();
    _category.name = category.name;
    _category.description = category.description;
    await getRepository(Category).save(_category);
    console.log('Category has been saved');
    return getRepository(Category).find();
  }
  public async remove(id: number): Promise<Category[]> {
    await getRepository(Category).delete(id);
    console.log('Category has been saved');
    return getRepository(Category).find();
  }
}
