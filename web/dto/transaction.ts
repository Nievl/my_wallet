import { Transaction } from '../../src/models/entity/Transaction';

export interface ParsedTransaction {
  amount: string;
  category: string;
  'converted amount': string;
  currency: string;
  date: string;
  description: string;
}

export type ITransaction = Transaction;

export type TransactionRequest = Omit<ITransaction, 'id' | 'dateChange' | 'hash' | 'category' | 'currency'> & {
  category: number;
  currency: number;
};

export type uploadOptions = 'doubles' | 'base' | 'save';
