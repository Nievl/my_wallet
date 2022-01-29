import { Request } from 'express';

export const setRequestIdInRequest = (request: Request, requestId: string): void => {
  // tslint:disable-next-line:no-string-literal
  request['__requestId'] = requestId;
};

export const getRequestIdFromRequest = (request: Request): string => {
  // tslint:disable-next-line:no-string-literal
  return request['__requestId'] || '';
};
