import * as CalcModel from './calc_model'

describe('Calc model', () => {
  it('can plus', () => {
    const res = CalcModel.calculate({
      firstNumber: 200,
      secondNumber: 300,
      operator: CalcModel.Operator.Plus
    })
    expect(res).toEqual(500)
  })

  it('can minus', () => {
    const res = CalcModel.calculate({
      firstNumber: 500,
      secondNumber: 400,
      operator: CalcModel.Operator.Minus
    })
    expect(res).toEqual(100)
  })

  it('can multiply', () => {
    const res = CalcModel.calculate({
      firstNumber: 500,
      secondNumber: 400,
      operator: CalcModel.Operator.Multiply
    })
    expect(res).toEqual(200000)
  })

  it('can divide', () => {
    const res = CalcModel.calculate({
      firstNumber: 8,
      secondNumber: 4,
      operator: CalcModel.Operator.Divide
    })
    expect(res).toEqual(2)
  })
})
