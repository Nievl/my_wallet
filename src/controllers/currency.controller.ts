import { Get, Controller } from 'routing-controllers';
import { Service } from 'typedi';
import { Icurrency } from '../models/interfaces/Icurrency';
import CurrencyService from '../services/currency.service';

@Service()
@Controller('/currency')
export class CurrencyController {
  constructor(public currencyService: CurrencyService) {}

  @Get('/')
  public async getAll(): Promise<Icurrency[]> {
    return await this.currencyService.getAll();
  }
}
