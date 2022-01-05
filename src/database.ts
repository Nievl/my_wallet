import path from 'path';
import Container from 'typedi';
import { Connection, createConnection, getConnection } from 'typeorm';
import { CategoryRequest } from '../web/dto/Category';
import config from './config';
import { Category } from './models/entity/Category';
import { Currency } from './models/entity/Currency';
import CategoryService from './services/category.service';
import CurrencyService from './services/currency.service';

const requiredCategories = [
  'Food',
  'House',
  'Electronics',
  'Eating out',
  'Salary',
  'Health',
  'Entertainment',
  'Clothes',
  'Transport',
  'Selling',
  'Communications',
  'Vacation',
  'Sport',
  'Pets',
];
const requiredCurrency = ['RUB', 'USD', 'EUR'];

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
      await this.initialOptions();
      return queryResult[0];
    } catch (error) {
      return error;
    }
  }
  private async initialOptions() {
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
