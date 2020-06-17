import * as Express from 'express'
import * as CalcView from '../views/calc_view'
import * as CalcModel from '../models/calc_model'
import * as ControllerUtils from './controller_utils'

export type CalcRequest = {
  operator: CalcModel.Operator;
  firstNumber: number;
  secondNumber: number;
}

function CalcValidator(body: any): ControllerUtils.ValidationResult<CalcRequest> {
  const { operator, secondNumber, firstNumber } = body
  if (!Object.values(CalcModel.Operator).includes(operator)) {
    return {
      error: true,
      errorMessage: 'Invalid operator'
    }
  }
  return {
    error: false,
    validatedInput: {
      firstNumber, secondNumber, operator
    }
  }
}
export async function CalcHandler(input: CalcRequest): Promise<number> {
  return CalcModel.calculate(input)
}

export const Calc = ControllerUtils.createExpressHandler<CalcRequest, number>({
  validator: CalcValidator,
  handler: CalcHandler,
  view: CalcView.calcResultView
})
