import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5434/test');

export class DataBase {
  constructor() {}

  public async connect() {
    try {
      const connection = await sequelize.authenticate();
      return connection;
    } catch (error) {
      return error;
    }
  }
}
