import * as Express from 'express'
import * as ControllerUtils from './controller_utils'

function createMockedExpressRequest(body: any): Express.Request {
  return {
    body
  } as Express.Request
}

function createMockedExpressResponse<T>(): Express.Response<T> {
  let statusCode = 200
  let sentPayload: any = { }
  return {
    send(body: any): void {
      sentPayload = body
    },

    status(code: number): any  {
      statusCode = code
      return this
    },

    json(body: any): void {
      sentPayload = body
    },

    getCode () {
      return statusCode
    },

    getSentPayload () {
      return sentPayload
    }
  } as unknown as Express.Response<T>
}

type MockedResponse = {
  getCode: () => number;
  getSentPayload: () => any;
}

describe('CreateExpressHandler', () => {
  it('Return 422 if validator return error', async () => {
    const request = createMockedExpressRequest({ a: 1 })
    const response = createMockedExpressResponse()
    const validator: (body: unknown) => ControllerUtils.ValidationResult<unknown> = (body) => {
      return {
        errorMessage: 'Invalid input A',
        error: true
      }
    }
    const handler = () => Promise.resolve(null)
    const expressHandler = ControllerUtils.createExpressHandler({
      validator,
      handler,
      view: () => null
    })
    await expressHandler(request, response)
    const mockedResponseAsserter: MockedResponse = response as unknown as MockedResponse
    expect(mockedResponseAsserter.getCode()).toEqual(422)
    expect(mockedResponseAsserter.getSentPayload()).toEqual({ error: 'Invalid input A' })
  })

  type TestInput = {
    b: number;
  }

  type TestOutput = {
    myResult: string;
  }
  it('Return result from view', async () => {
    const request = createMockedExpressRequest({ a: 1, b: 2 })
    const response = createMockedExpressResponse()
    const validator: (body: unknown) => ControllerUtils.ValidationResult<TestInput> = (body) => {
      return {
        error: false,
        validatedInput: { b: 2 }
      }
    }
    const handler = (input: TestInput): Promise<TestOutput> => Promise.resolve({ myResult: 'you are right' })
    const view = (output: TestOutput) => {
      if (output.myResult !== 'you are right') {
        throw new Error('Pipeline incorrect: view does not get response from handler')
      }
      return { view: 'MyView' }
    }
    const expressHandler = ControllerUtils.createExpressHandler<TestInput, TestOutput>({
      validator,
      handler,
      view
    })
    await expressHandler(request, response)
    const mockedResponseAsserter: MockedResponse = response as unknown as MockedResponse
    expect(mockedResponseAsserter.getCode()).toEqual(200)
    expect(mockedResponseAsserter.getSentPayload()).toEqual({ view: 'MyView' })
  })
})
