import { Request } from 'express';
import { createHash } from 'crypto';
import { Transaction } from '../models/entity/Transaction';

export const setRequestIdInRequest = (request: Request, requestId: string): void => {
  // tslint:disable-next-line:no-string-literal
  request['__requestId'] = requestId;
};

export const getRequestIdFromRequest = (request: Request): string => {
  // tslint:disable-next-line:no-string-literal
  return request['__requestId'] || '';
};

export const createHashTransaction = (
  transaction: Pick<Transaction, 'dateCreate' | 'category' | 'amount' | 'description'>
): string => {
  return createHash('md5')
    .update(`${transaction.dateCreate}${transaction.category}${transaction.amount}${transaction.description}`)
    .digest('hex');
};
