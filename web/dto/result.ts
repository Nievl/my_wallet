export interface Iresult {
  result: 'ok';
}
export interface IresultWithData<T> {
  result: 'ok';
  data: T;
}
