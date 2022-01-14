export type Iresult = IresultSuccess | IresultError;
export type IresultWithData<T> = { data: T } & Iresult;
export type IresultSuccess = { result: 'ok' };
export type IresultError = { result: 'error'; description: string };
