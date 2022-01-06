import { Get, Controller, Body, Post, Delete, Param } from 'routing-controllers';
import { Service } from 'typedi';
import { Iresult } from '../../web/dto/result';
import { TransactionRequest } from '../../web/dto/transaction';
import { Transaction } from '../models/entity/transaction';
import TransactionService from '../services/transaction.service';

@Service()
@Controller('/transaction')
export class transactionController {
  constructor(public transactionService: TransactionService) {}

  @Get('/')
  public async getAll(): Promise<Transaction[]> {
    return await this.transactionService.getAll();
  }

  @Post('/')
  public addOne(@Body() transaction: TransactionRequest): Promise<Transaction[]> {
    return this.transactionService.addOne(transaction);
  }

  @Delete('/:id')
  public async remove(@Param('id') id: number): Promise<Iresult> {
    return this.transactionService.remove(id);
  }
}
