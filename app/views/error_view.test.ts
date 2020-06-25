import * as ErrorView from './error_view'
import * as ControllerHelper from '../controllers/controller_helper'

describe('mapHttpError', () => {
  it('Given ValidationError, return 422', () => {
    const err = new ControllerHelper.ValidationError('Invalid input for some reason')
    const actual = ErrorView.errorView(err)
    expect(actual.statusCode).toEqual(422)
    expect(actual.errorMessage).toEqual('Invalid input for some reason')
  })

  it('Given other error, return 500', () => {
    const err = new Error('Super Error')
    const actual = ErrorView.errorView(err)
    expect(actual.statusCode).toEqual(500)
    expect(actual.errorMessage).toEqual('Super Error')
  })
})
