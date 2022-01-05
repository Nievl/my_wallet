import { Get, Controller, Post, Body, Delete, Param } from 'routing-controllers';
import { Service } from 'typedi';
import { Category } from '../models/entity/Category';
import CategoryService from '../services/category.service';
import { CategoryRequest } from '../../web/dto/Category';

@Service()
@Controller('/category')
export class CategoryController {
  constructor(public categoryService: CategoryService) {}

  @Get('/')
  public getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Post('/')
  public addOne(@Body() category: CategoryRequest): Promise<Category[]> {
    return this.categoryService.addOne(category);
  }

  @Delete('/:id')
  public remove(@Param('id') id: number): Promise<Category[]> {
    return this.categoryService.remove(id);
  }
}
