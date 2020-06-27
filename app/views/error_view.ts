export type HttpError = {
  statusCode: number;
  errorMessage: string;
}

export function errorView(err: Error): HttpError {
  const errorMapping = {
    'ValidationError': 422,
    'DivideByZeroError': 422,
    'NotFoundError': 404,
  }
  return {
    statusCode: errorMapping[err.name] || 500,
    errorMessage: err.message
  }
}
