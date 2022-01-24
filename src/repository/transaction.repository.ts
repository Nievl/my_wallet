import { Service } from 'typedi';
import { getConnection } from 'typeorm';
import { IinOutCome, IinOutComeDB } from '../models/interfaces/Itransaction';

@Service()
export default class TransactionRepository {
  public getAll(): Promise<IinOutCome[]> {
    return getConnection('inoutcomes').query(
      `
    SELECT
      i.uid,
      utime,
      AMOUNT_ACCOUNT,
      DO_TYPE,
      zcontent,
      currencyUid,
      z.NAME 
    FROM 
      INOUTCOME i
    INNER JOIN ZCATEGORY z 
    ON z.ID = i.ctgUid 
    `
    );
  }
  public findOne(uid: string): Promise<[IinOutCome]> {
    return getConnection('inoutcomes').query(
      `
    SELECT
      i.uid,
      utime,
      AMOUNT_ACCOUNT,
      DO_TYPE,
      zcontent,
      currencyUid,
      z.NAME 
    FROM 
      INOUTCOME i
    INNER JOIN ZCATEGORY z 
    ON z.ID = i.ctgUid
    WHERE i.uid = $1
    `,
      [uid]
    );
  }
  public remove(uid: string) {
    return getConnection('inoutcomes').query(
      `
    DELETE FROM 
      INOUTCOME i
    WHERE
      i.uid = $1
    `,
      [uid]
    );
  }

  public addOne(transaction: IinOutComeDB): Promise<IinOutCome> {
    return getConnection('inoutcomes').query(
      `INSERT INTO INOUTCOME (
        ZMONEY,
        ZDATE,
        ZCONTENT,
        WDATE,
        uid,
        isSynced,
        IN_ZMONEY,
        DO_TYPE,
        currencyUid,
        ctgUid,
        CARDDIVIDMONTH,
        assetUid,
        UTIME,
        syncVersion,
        AMOUNT_ACCOUNT
      )
      VALUES( '$1', '$2', '$3', '$4', '$5', '0', '$6', '$7', '$8', '$9', '0', '11', $10, 0, $11)`,
      [
        transaction.AMOUNT_ACCOUNT.toFixed(1),
        transaction.UTIME.toString(),
        transaction.ZCONTENT,
        transaction.WDATE,
        transaction.uid,
        transaction.AMOUNT_ACCOUNT.toFixed(1),
        transaction.DO_TYPE,
        transaction.currencyUid,
        transaction.ctgUid,
        transaction.UTIME,
        transaction.AMOUNT_ACCOUNT,
      ]
    );
  }
}
