import { Service } from 'typedi';
import { getConnection } from 'typeorm';
import { Icurrency } from '../models/interfaces/Icurrency';

@Service()
export default class CurrencyRepository {
  public getAll(): Promise<Icurrency[]> {
    return getConnection('inoutcomes').query(
      `
    SELECT
      uid,
      NAME 
    FROM 
      CURRENCY
    `
    );
  }
  public findOne(name: string): Promise<Icurrency> {
    return getConnection('inoutcomes').query(
      `
    SELECT
      uid,
      NAME 
    FROM 
      CURRENCY c
    WHERE 
      c.uid = $1
    `,
      [name]
    );
  }
}
