import { ExceptionTypes } from '../enums/exceptionTypes';

const getPayloadFromError = (error: { payload?: object; innerException?: object }): object | undefined => {
  if (!error) {
    return;
  }

  if (error.payload) {
    return error.payload;
  }

  if (error.innerException) {
    return getPayloadFromError(error.innerException);
  }
};

export default class BaseException {
  public readonly message: string;
  public readonly type: ExceptionTypes;
  public readonly payload: object | undefined;
  public readonly innerException: BaseException | Error;
  private exceptionMap: Partial<{ [key in ExceptionTypes]: ExceptionTypes }> = {
    [ExceptionTypes.UnauthorizedError]: ExceptionTypes.UnauthorizedError,
    [ExceptionTypes.FindError]: ExceptionTypes.NotFound,
    [ExceptionTypes.CreateError]: ExceptionTypes.InternalServerError,
    [ExceptionTypes.UpdateError]: ExceptionTypes.InternalServerError,
    [ExceptionTypes.DeleteError]: ExceptionTypes.InternalServerError,
    [ExceptionTypes.NotExistsError]: ExceptionTypes.NotFound,
    [ExceptionTypes.AlreadyExistsError]: ExceptionTypes.BadRequest,
    [ExceptionTypes.ValidationError]: ExceptionTypes.BadRequest,
  };
  constructor(type?: ExceptionTypes, message?: string, innerException?: BaseException | Error, payload?: object) {
    this.type = type || ExceptionTypes.InternalServerError;
    this.message = message || 'Internal Server Error';
    this.innerException = innerException!;
    this.payload = payload;
  }

  public toString(): string {
    return `${this.type}, ${this.message}`;
  }

  public getBaseMessage(): string {
    if (this.innerException instanceof BaseException) {
      return this.innerException.getBaseMessage();
    }
    return this.message;
  }

  public getBaseType(): ExceptionTypes {
    if (this.innerException instanceof BaseException) {
      return this.innerException.getBaseType();
    }
    return this.type;
  }

  public getHttpType(): ExceptionTypes {
    const baseType = this.getBaseType();
    return this.exceptionMap[baseType] || ExceptionTypes.InternalServerError;
  }

  public getTrace() {
    let message = this.toString();
    if (this.innerException) {
      if (this.innerException instanceof BaseException) {
        message += `\n>${this.innerException.getTrace()}`;
      } else {
        message += `\n>${this.innerException.stack}`;
      }
    }
    return message;
  }

  public getPayload(): object | undefined {
    return getPayloadFromError(this);
  }
}
