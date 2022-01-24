import { Get, Controller } from 'routing-controllers';
import { Service } from 'typedi';
import CategoryService from '../services/category.service';
import { Icategory } from '../models/interfaces/Icategory';

@Service()
@Controller('/category')
export class CategoryController {
  constructor(public categoryService: CategoryService) {}

  @Get('/')
  public getAll(): Promise<Icategory[]> {
    return this.categoryService.getAll();
  }
}
