import { Request, Response } from 'express';
import {
  BadRequestError,
  ExpressErrorMiddlewareInterface,
  ForbiddenError,
  MethodNotAllowedError,
  Middleware,
  NotAcceptableError,
  NotFoundError,
  UnauthorizedError,
} from 'routing-controllers';
import Container, { Service } from 'typedi';
import { ExceptionTypes } from '../../models/enums/exceptionTypes';
import BaseException from '../../models/exceptions/baseException';
import RequestResultFactory from '../requestResultFactory';
import { UserContext } from '../../userContext';
import IRequestResult from '../../models/interfaces/IRequestResult';
import { getRequestIdFromRequest } from '../../common/common';

interface ValidationErrorInternal {
  property: string;
  children: ValidationErrorInternal[];
  constraints: { [constraint: string]: string };
}

function processValidationError(err: ValidationErrorInternal): string[] {
  function _iterate(e: ValidationErrorInternal, path: string[]): string[] {
    let res: string[] = [];
    if (e.children) {
      for (const child of e.children) {
        res = res.concat(_iterate(child, [...path, e.property]));
      }
    }
    if (e.constraints) {
      const constraintsKeys = Object.keys(e.constraints);
      if (constraintsKeys.length) {
        res.push(`${[...path, e.property].join('.')}: ${constraintsKeys.map((key) => e.constraints[key]).join(', ')}`);
      }
    }
    return res;
  }
  return _iterate(err, ['$']);
}

@Service()
@Middleware({ type: 'after', priority: 1 })
export default class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  constructor(private requestResultFactory: RequestResultFactory) {}

  public error(err: BaseException | Error, request: Request, response: Response, next?: (err?: Error) => void) {
    const requestId = getRequestIdFromRequest(request);
    const container = Container.of(requestId);
    const userContext = container.get(UserContext);
    userContext.requestId = requestId;
    userContext.originalUrl = request.originalUrl;
    userContext.method = request.method;
    // const loggerWrapper = new LoggerWrapper(userContext, 'ErrorHandlerMiddleware');

    let result: IRequestResult = {
      code: 500,
      message: 'Empty error.',
    };
    if (Array.isArray(err)) {
      if (err.length) {
        const tempErrInfo = err.map((item) => this.handleError(item));
        const topIndex = err.length <= 5 ? err.length : 5;
        const firstFewErrors = tempErrInfo.slice(0, topIndex);
        const messages = firstFewErrors.map((item) => item.message);
        result = {
          code: tempErrInfo[0].code,
          message: messages.join(' '),
        };
        if (tempErrInfo[0].payload) {
          result.payload = tempErrInfo[0].payload;
        }
      }
    } else {
      result = this.handleError(err);
    }

    response.status(result.code).json(result);
    next!();
  }

  private handleError(err: BaseException | Error): IRequestResult {
    let result: IRequestResult;
    if (err instanceof Error) {
      let type = ExceptionTypes.InternalServerError;
      if (err instanceof NotFoundError) {
        type = ExceptionTypes.NotFound;
      } else if (err instanceof BadRequestError) {
        type = ExceptionTypes.BadRequest;
      } else if (err instanceof ForbiddenError) {
        type = ExceptionTypes.ForbiddenError;
      } else if (err instanceof MethodNotAllowedError) {
        type = ExceptionTypes.MethodNotAllowedError;
      } else if (err instanceof UnauthorizedError) {
        type = ExceptionTypes.UnauthorizedError;
      } else if (err instanceof NotAcceptableError) {
        type = ExceptionTypes.NotAcceptableError;
      } else if (err.name === ExceptionTypes.PayloadTooLargeError) {
        type = ExceptionTypes.ValidationError;
      }

      let message = err.message;
      // @ts-ignore
      const { errors } = err;
      if (errors && errors.length) {
        message = errors.map((error) => processValidationError(error).join('; ')).join('; ');
      }
      result = this.requestResultFactory.createResult(type, message);
      // loggerWrapper.error(err);
    } else if (err.type === ExceptionTypes.Warnings) {
      result = this.requestResultFactory.createResult(err.type, err.message, err.payload);
      // loggerWrapper.error(err);
    } else {
      result = this.requestResultFactory.createResult(err.getHttpType(), err.getBaseMessage(), err.getPayload());
      // loggerWrapper.error(`Manual error: ${result.message}`, { trace: err.getTrace() });
    }
    return result;
  }
}
