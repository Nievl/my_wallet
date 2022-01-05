import request from './index';

const optionUrl = {
  currency: '/currency',
  category: '/category',
};
export type IOptions = keyof typeof optionUrl;

export const getOption = async <T>(type: IOptions) => {
  const url = optionUrl[type];
  return await request.get<T[]>({ url });
};

export const addOption = async <T>(name: string, description: string, type: IOptions) => {
  const url = optionUrl[type];
  return await request.post<T[]>({ url, body: { name, description } });
};

export const deleteOption = async <T>(id: number, type: IOptions) => {
  const url = `${optionUrl[type]}/${id}`;
  return await request.delete<T[]>({ url });
};
