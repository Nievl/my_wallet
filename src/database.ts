import path from 'path';
import Container from 'typedi';
import { Connection, createConnection, getConnection, getRepository } from 'typeorm';
import config from './config';
import { requiredCategories, requiredCurrency, requiredMonthes, requiredPaychecks } from './models/constants';
import CategoryService from './services/category.service';
import CurrencyService from './services/currency.service';
import { Category } from './models/entity/Category';
import { Currency } from './models/entity/Currency';
import { MonthType } from './models/entity/MonthType';
import { CategoryRequest } from '../web/dto/Category';
import { MonthTypeRequest } from '../web/dto/MonthType';
import { PaycheckTypeRequest } from '../web/dto/Paycheck';
import { PaycheckType } from './models/entity/PaycheckType';
import { logger } from './services/initLog';

export class DataBase {
  public client: Connection;
  constructor() {}

  public async connect() {
    try {
      this.client = await createConnection({
        type: 'sqlite',
        database: config.sqlitePath,
        entities: [path.join(__dirname + '/models/entity/*.ts')],
        synchronize: true,
      });
      const queryResult = await this.client.query(`SELECT date('now')`);
      await this.initOptions();
      logger.info('init options success');
      await this.initMonthes();
      logger.info('init mothes success');
      await this.initPaychecks();
      logger.info('init paycheck types success');
      return queryResult[0];
    } catch (error) {
      return error;
    }
  }
  private async initMonthes() {
    const monthes = await getRepository(MonthType).find();
    const newMothes: MonthTypeRequest[] = [];
    Object.entries(requiredMonthes).forEach(([name, days]) => {
      const result = monthes.find((m) => m.name === name);
      if (!result) newMothes.push({ name, days });
    });

    await getConnection().createQueryBuilder().insert().into(MonthType).values(newMothes).execute();
  }

  private async initPaychecks() {
    const paycheckTypes = await getRepository(PaycheckType).find();
    const newPaycheckTypes: PaycheckTypeRequest[] = [];
    Object.entries(requiredPaychecks).forEach(([name, ruName]) => {
      const result = paycheckTypes.find((m) => m.name === name);
      if (!result) newPaycheckTypes.push({ name, ruName, description: null });
    });

    await getConnection().createQueryBuilder().insert().into(PaycheckType).values(newPaycheckTypes).execute();
  }

  private async initOptions() {
    const category = Container.get(CategoryService);
    const categories = await category.getAll();
    const newCategories: CategoryRequest[] = [];
    requiredCategories.forEach((rc) => {
      const result = categories.find((c) => c.name === rc);
      if (!result) newCategories.push({ name: rc, description: null });
    });

    const currency = Container.get(CurrencyService);
    const currencies = await currency.getAll();
    const newCurrenciess: CategoryRequest[] = [];
    requiredCurrency.forEach((rc) => {
      const result = currencies.find((c) => c.name === rc);
      if (!result) newCurrenciess.push({ name: rc, description: null });
    });

    await getConnection().createQueryBuilder().insert().into(Category).values(newCategories).execute();
    await getConnection().createQueryBuilder().insert().into(Currency).values(newCurrenciess).execute();
  }
}
// export class DataBase {
//   public client: Connection;
//   constructor() {}

//   public async connect() {
//     try {
//       this.client = await createConnection({
//         type: 'postgres',
//         username: config.PGUSER,
//         host: config.PGHOST,
//         database: config.PGDATABASE,
//         password: config.PGPASSWORD,
//         port: config.PGPORT,
//         entities: [Category, Transaction, Currency],
//       });
//       const queryResult = await this.client.query('SELECT NOW()');
//       return queryResult[0];
//     } catch (error) {
//       return error;
//     }
//   }
// }
