import { Month } from '../../src/models/entity/Month';
import { MonthType } from '../../src/models/entity/MonthType';

export type IMonthType = MonthType;
export type MonthTypeRequest = Omit<MonthType, 'id'>;

export type IMonth = Month;
export type MonthRequest = Omit<Month, 'id'>;
