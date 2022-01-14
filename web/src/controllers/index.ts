import { errorsState } from '../states/errors';

type IrequestGet = {
  url: string;
};
type IrequestWithPost = {
  body: Record<string, unknown> | FormData;
} & IrequestGet;
type IrequestWithDelete = {
  body?: Record<string, unknown>;
} & IrequestGet;

const get = async <T>({ url }: IrequestGet) => {
  const result = await fetch(url, { credentials: 'same-origin' });
  try {
    const resultJson = await result.json();
    if (result.ok) {
      if (resultJson) return resultJson as T;
    } else {
      throw Error(resultJson.message);
    }
  } catch (error) {
    errorsState.add([result.statusText, (error as Error).message]);
  }
};
const post = async <T>({ url, body }: IrequestWithPost) => {
  const _body = body instanceof FormData ? body : JSON.stringify(body);
  const result = await fetch(url, { credentials: 'same-origin', body: _body, method: 'POST' });
  try {
    const resultJson = await result.json();
    if (result.ok) {
      if (resultJson) return resultJson as T;
    } else {
      throw Error(resultJson.message);
    }
  } catch (error) {
    errorsState.add([result.statusText, (error as Error).message]);
  }
};
const remove = async <T>({ url, body }: IrequestWithDelete) => {
  const _body = body ? JSON.stringify(body) : null;
  const result = await fetch(url, { credentials: 'same-origin', body: _body, method: 'DELETE' });
  try {
    const resultJson = await result.json();
    if (result.ok) {
      if (resultJson) return resultJson as T;
    } else {
      throw Error(resultJson.message);
    }
  } catch (error) {
    errorsState.add([result.statusText, (error as Error).message]);
  }
};

const request = {
  get,
  post,
  delete: remove,
};
export default request;
