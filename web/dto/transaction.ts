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
  category: number;
  converted_amount: number;
  currency: number;
  dateCreate: Date;
  dateChange: Date | null;
  description: string | null;
  hash: string;
}

export type TransactionRequest = Omit<ITransaction, 'id' | 'dateChange' | 'hash'>;
