import path from 'path';
import { Connection, createConnections, getConnection } from 'typeorm';
import config from './config';
import { requiredMonthes, requiredPaychecks } from './models/constants';
import { MonthType } from './models/entity/MonthType';
import { MonthTypeRequest } from '../web/dto/Month';
import { PaycheckTypeRequest } from '../web/dto/Paycheck';
import { PaycheckType } from './models/entity/PaycheckType';
import { logger } from './services/initLog';

export class DataBase {
  public client: Connection[];
  constructor() {}

  public async connect() {
    try {
      this.client = await createConnections([
        {
          name: 'wallet',
          type: 'sqlite',
          database: config.sqlitePath1,
          entities: [path.join(__dirname + '/models/entity/*.ts')],
          synchronize: true,
        },
        {
          name: 'inoutcomes',
          type: 'sqlite',
          database: config.sqlitePath2,
        },
      ]);

      const queryResult1 = await getConnection('wallet').query(`SELECT date('now')`);
      const queryResult2 = await getConnection('inoutcomes').query(`SELECT date('now')`);
      await this.initMonthes();
      logger.info('init mothes success');
      await this.initPaychecks();
      logger.info('init paycheck types success');
    } catch (error) {
      return error;
    }
  }
  private async initMonthes() {
    const monthes = await getConnection('wallet').getRepository(MonthType).find();
    const newMothes: MonthTypeRequest[] = [];
    Object.entries(requiredMonthes).forEach(([name, days]) => {
      const result = monthes.find((m) => m.name === name);
      if (!result) newMothes.push({ name, days });
    });

    await getConnection('wallet').createQueryBuilder().insert().into(MonthType).values(newMothes).execute();
  }

  private async initPaychecks() {
    const paycheckTypes = await getConnection('wallet').getRepository(PaycheckType).find();
    const newPaycheckTypes: PaycheckTypeRequest[] = [];
    Object.entries(requiredPaychecks).forEach(([name, ruName]) => {
      const result = paycheckTypes.find((m) => m.name === name);
      if (!result) newPaycheckTypes.push({ name, ruName, description: null });
    });

    await getConnection('wallet').createQueryBuilder().insert().into(PaycheckType).values(newPaycheckTypes).execute();
  }
}
