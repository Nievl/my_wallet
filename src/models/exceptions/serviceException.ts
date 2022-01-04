import BaseException from './baseException';

export default class ServiceException extends BaseException {
  public toString(): string {
    return `Service exception: ${this.type}, ${this.message}`;
  }
}
