import { Service } from 'typedi';
import { Icategory } from '../models/interfaces/Icategory';
import CategoryRepository from '../repository/category.repository';

@Service()
export default class CategoryService {
  constructor(public categoryRepository: CategoryRepository) {}

  public getAll(): Promise<Icategory[]> {
    return this.categoryRepository.getAll();
  }
}
