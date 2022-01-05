import { errorsState } from '../states/errors';

type IrequestGet = {
  url: string;
};
type IrequestWithPost = {
  body: Record<string, unknown>;
} & IrequestGet;
type IrequestWithDelete = {
  body?: Record<string, unknown>;
} & IrequestGet;

const get = async <T>({ url }: IrequestGet) => {
  const result = await fetch(url, { credentials: 'same-origin' });
  if (result.ok) {
    const resultJson = await result.json();
    if (resultJson) return resultJson as T;
  }
  errorsState.add(result.statusText);
};
const post = async <T>({ url, body }: IrequestWithPost) => {
  const _body = JSON.stringify(body);
  const result = await fetch(url, { credentials: 'same-origin', body: _body, method: 'POST' });
  if (result.ok) {
    const resultJson = await result.json();
    if (resultJson) return resultJson as T;
  }
  errorsState.add(result.statusText);
};
const remove = async <T>({ url, body }: IrequestWithDelete) => {
  const _body = body ? JSON.stringify(body) : null;
  const result = await fetch(url, { credentials: 'same-origin', body: _body, method: 'DELETE' });
  if (result.ok) {
    const resultJson = await result.json();
    if (resultJson) return resultJson as T;
  }
  errorsState.add(result.statusText);
};

const request = {
  get,
  post,
  delete: remove,
};
export default request;
