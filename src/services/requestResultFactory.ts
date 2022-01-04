import { Service } from 'typedi';
import { ExceptionTypes } from '../models/enums/exceptionTypes';
import IRequestResult from '../models/interfaces/IRequestResult';

@Service()
export default class RequestResultFactory {
  private templates: Partial<{ [key in ExceptionTypes]: IRequestResult }> = {
    [ExceptionTypes.NotFound]: { code: 404, message: 'Not Found' },
    [ExceptionTypes.BadRequest]: { code: 400, message: 'Bad Request' },
    [ExceptionTypes.InternalServerError]: { code: 500, message: 'Internal Server Error' },
    [ExceptionTypes.ForbiddenError]: { code: 403, message: 'Forbidden' },
    [ExceptionTypes.MethodNotAllowedError]: { code: 405, message: 'Method Not Allowed' },
    [ExceptionTypes.UnauthorizedError]: { code: 403, message: 'Unauthorized' },
    [ExceptionTypes.NotAcceptableError]: { code: 406, message: 'Not Acceptable Error' },
    [ExceptionTypes.ValidationError]: { code: 422, message: 'Request entity too large' },
    [ExceptionTypes.Warnings]: {
      code: 400,
      message: 'Warnings',
      isWarning: true,
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public createResult(type: ExceptionTypes, message?: string, payload?: object): IRequestResult {
    const template = this.templates[type] || this.templates[ExceptionTypes.InternalServerError];
    const result = {
      ...template!,
    };
    result.message = message || result.message;
    if (payload != null) {
      result.payload = payload;
    }
    return result;
  }
}
