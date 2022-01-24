import { Get, Controller, Body, Post, Delete, Param } from 'routing-controllers';
import { Service } from 'typedi';
import { Iresult } from '../../web/dto/result';
import { inOutComeRequest } from '../../web/dto/transaction';
import { IinOutCome } from '../models/interfaces/Itransaction';
import TransactionService from '../services/transaction.service';

@Service()
@Controller('/transaction')
export class transactionController {
  constructor(public transactionService: TransactionService) {}

  @Get('/')
  public async getAll(): Promise<IinOutCome[]> {
    return await this.transactionService.getAll();
  }

  @Post('/')
  public addOne(@Body() transaction: inOutComeRequest) {
    return this.transactionService.addOne(transaction);
  }

  @Get('/:id')
  public async findOne(@Param('id') id: string): Promise<[IinOutCome]> {
    return this.transactionService.findOne(id);
  }

  @Delete('/:id')
  public async remove(@Param('id') id: string): Promise<Iresult> {
    return this.transactionService.remove(id);
  }
}
