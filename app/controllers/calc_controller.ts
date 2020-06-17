import * as Express from 'express'
import * as CalcView from '../views/calc_view'
import * as CalcModel from '../models/calc_model'

export type CalcRequest = {
  operator: CalcModel.Operator;
  firstNumber: number;
  secondNumber: number;
}

export function Calc(req: Express.Request, res: Express.Response<CalcView.CalcResult>): Express.Response<CalcView.CalcResult> {
  const { operator, secondNumber, firstNumber } = req.body
  if (!Object.values(CalcModel.Operator).includes(operator)) {
    return res.status(422).send({ error: "Invalid operator" })
  }

  const result = CalcModel.calculate({ firstNumber, secondNumber, operator })
  return res.json(CalcView.calcResultView(result))
}
