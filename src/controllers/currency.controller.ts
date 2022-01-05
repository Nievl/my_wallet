import { Get, Controller, Body, Post, Delete, Param } from 'routing-controllers';
import { Service } from 'typedi';
import { CurrencyRequest } from '../../web/dto/Currency';
import { Currency } from '../models/entity/Currency';
import CurrencyService from '../services/currency.service';

@Service()
@Controller('/currency')
export class CurrencyController {
  constructor(public currencyService: CurrencyService) {}

  @Get('/')
  public async getAll(): Promise<Currency[]> {
    return await this.currencyService.getAll();
  }

  @Post('/')
  public addOne(@Body() currency: CurrencyRequest): Promise<Currency[]> {
    return this.currencyService.addOne(currency);
  }

  @Delete('/:id')
  public remove(@Param('id') id: number): Promise<Currency[]> {
    return this.currencyService.remove(id);
  }
}
