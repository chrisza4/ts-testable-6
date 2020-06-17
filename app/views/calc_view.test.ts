import * as CalcView from './calc_view'

describe('CalcResultView', () => {
  it('given number, return correct json', () => {
    expect(CalcView.calcResultView(12)).toEqual({
      result: 12
    })
  })
})
