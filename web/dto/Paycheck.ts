import { Paycheck } from '../../src/models/entity/Paycheck';
import { PaycheckType } from '../../src/models/entity/PaycheckType';

export type IPaycheck = Paycheck;
export type PaycheckRequest = Omit<Paycheck, 'id'>;

export type IPaycheckType = PaycheckType;
export type PaycheckTypeRequest = Omit<PaycheckType, 'id'>;
