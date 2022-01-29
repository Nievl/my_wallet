import { IinOutCome as _IinOutCome } from '../../src/models/interfaces/Itransaction';

export interface ParsedTransaction {
  amount: string;
  category: string;
  'converted amount': string;
  currency: string;
  date: string;
  description: string;
}

export type inOutComeRequest = {
  category: string;
  currency: string;
  date: number;
  amount: number;
  DO_TYPE: string;
  description: string;
};

export type IinOutCome = _IinOutCome;

export type uploadOptions = 'doubles' | 'base' | 'save';
