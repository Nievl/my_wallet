export enum ExceptionTypes {
  // controller exceptions
  NotFound = 'notFound',
  BadRequest = 'badRequest',
  InternalServerError = 'internalServerError',
  ForbiddenError = 'forbiddenError',
  NotAcceptableError = 'notAcceptableError',
  MethodNotAllowedError = 'methodNotAllowedError',
  UnauthorizedError = 'unauthorizedError',

  // service exceptions
  FindError = 'findError',
  CreateError = 'createError',
  UpdateError = 'updateError',
  DeleteError = 'deleteError',

  // repository exceptions
  NotExistsError = 'notExistsError',
  AlreadyExistsError = 'alreadyExistsError',

  ValidationError = 'validationError',
  PayloadTooLargeError = 'PayloadTooLargeError',

  CanceledTransactionError = 'CanceledTransactionError',

  SpecimenError = 'SpecimenError',
  Warnings = 'Warnings',
}
