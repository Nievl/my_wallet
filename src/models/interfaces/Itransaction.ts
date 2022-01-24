export interface IinOutCome {
  uid: string;
  UTIME: number;
  AMOUNT_ACCOUNT: number;
  DO_TYPE: string;
  ZCONTENT: string;
  currencyUid: string;
  NAME: string;
  WDATE: string;
}
export interface IinOutComeDB {
  uid: string;
  UTIME: number;
  AMOUNT_ACCOUNT: number;
  DO_TYPE: string;
  ZCONTENT: string;
  currencyUid: string;
  ctgUid: string;
  WDATE: string;
}
