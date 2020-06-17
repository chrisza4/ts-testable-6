jest.mock('../models/calc_model.ts')

import { mocked } from 'ts-jest/utils'
import * as CalcModel from '../models/calc_model'
import * as CalcController from './calc_controller'

const MockedCalcModel = mocked(CalcModel)

describe('CalcHandler', () => {
  it('Return what model said', async () => {
    MockedCalcModel.calculate.mockReturnValue(6)
    const result = await CalcController.CalcHandler({ firstNumber: 1, secondNumber: 2, operator: CalcModel.Operator.Minus })
    expect(result).toEqual(6)
  })
})
