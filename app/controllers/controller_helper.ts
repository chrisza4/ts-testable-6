import * as Express from 'express'
import * as ErrorView from '../views/error_view'

export type Body = {[key: string]: string | number | undefined}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryString = any
export type Params = {[key: string]: string | number | undefined}
export type ExpressHandler = (req: Express.Request, res: Express.Response) => Promise<unknown>
export type Controller<TOut> = (body: Body, queryString: QueryString, params: Params) => Promise<TOut>


export function createExpressHandler<TOut> (controller: Controller<TOut>): ExpressHandler {
  return async (req, res): Promise<unknown> => {
    try {
      const body = req.body
      const queryString = req.query
      const params = req.params
      const result = await controller(body, queryString, params)
      return res.json(result)
    } catch (err) {
      const response = ErrorView.errorView(err)
      return res.status(response.statusCode).send(response)
    }
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'NotFoundError'
    this.message = message || 'Resource not found'
  }
}
