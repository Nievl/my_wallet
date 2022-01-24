import { Service } from 'typedi';
import { getConnection } from 'typeorm';
import { Icategory } from '../models/interfaces/Icategory';

@Service()
export default class CategoryRepository {
  public getAll(): Promise<Icategory[]> {
    return getConnection('inoutcomes').query(
    `
    SELECT
      uid,
      NAME 
    FROM 
      ZCATEGORY
    WHERE 
      STATUS = 0
    `
    );
  }
  public findOne(name: string): Promise<Icategory> {
    return getConnection('inoutcomes').query(
    `
    SELECT
      uid,
      NAME 
    FROM 
      ZCATEGORY z
    WHERE 
      z.uid = $1
    `,
      [name]
    );
  }
}
