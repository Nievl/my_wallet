import { MonthType } from '../../src/models/entity/MonthType';

// export interface IMonthType {
//   id: number;
//   name: string;
//   days: number;
// }

export type IMonthType = MonthType;
export type MonthTypeRequest = Omit<MonthType, 'id'>;
