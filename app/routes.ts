import * as Express from 'express'
import * as CalcController from './controllers/calc_controller'

export function setupRoutes(app: Express.Express): void {
  app.post('/calc', CalcController.Calc)
}
