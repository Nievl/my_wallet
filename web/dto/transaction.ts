import { ICategory } from './Category';
import { ICurrency } from './Currency';

export interface ParsedTransaction {
  account: string;
  amount: string;
  category: string;
  'converted amount': string;
  currency: string;
  date: string;
  description: string;
}
export interface ITransaction {
  id: number;
  account: string;
  amount: number;
  category: ICategory;
  converted_amount: number;
  currency: ICurrency;
  dateCreate: Date;
  dateChange: Date | null;
  description: string | null;
  hash: string;
}

export type TransactionRequest = Omit<ITransaction, 'id' | 'dateChange' | 'hash' | 'category' | 'currency'> & {
  category: number;
  currency: number;
};
