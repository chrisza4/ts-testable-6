import * as Express from 'express'
import * as Supertest from 'supertest'
import * as ControllerHelper from './controller_helper'

type TestRequest = {
  greetUser: string;
}

type TestRequestQueryString = {

}

type TestOutput = {

}

type TestResponse = {
  message: string;
}

describe('createExpressHandler', () => {
  it('return response from controller', async () => {
    const controller = async (body: TestRequest): Promise<TestResponse> => {
      return {
        message: `Hello ${body.greetUser}`
      }
    }

    const handler = ControllerHelper.createExpressHandler(controller)
    const app = Express()
    app.use(Express.json())
    app.post('/', handler)
    const response = await Supertest(app).post('/').send({ greetUser: 'Chris' })
    expect(response.body).toEqual({ message: 'Hello Chris' })
  })

  it('can inject querystring', async () => {
    const controller = async (body: TestRequest, querystring: ControllerHelper.QueryString): Promise<TestResponse> => {
      return {
        message: `Hello ${querystring.greetUser}`
      }
    }

    const handler = ControllerHelper.createExpressHandler(controller)
    const app = Express()
    app.use(Express.json())
    app.get('/', handler)
    const response = await Supertest(app).get('/?greetUser=Chris')
    expect(response.body).toEqual({ message: 'Hello Chris' })
  })

  it('can inject params', async () => {
    const controller = async (
      body: TestRequest,
      querystring: ControllerHelper.QueryString,
      params: ControllerHelper.Params
    ): Promise<TestResponse> => {
      return {
        message: `Hello ${params.user}`
      }
    }

    const handler = ControllerHelper.createExpressHandler(controller)
    const app = Express()
    app.use(Express.json())
    app.get('/:user', handler)
    const response = await Supertest(app).get('/Chris')
    expect(response.body).toEqual({ message: 'Hello Chris' })
  })

  it('Change validation error to 422', async () => {
    const controller = async (body: TestRequest): Promise<TestResponse> => {
      throw new ControllerHelper.ValidationError('Invalid input')
    }

    const handler = ControllerHelper.createExpressHandler(controller)
    const app = Express()
    app.use(Express.json())
    app.post('/', handler)
    const response = await Supertest(app).post('/').send({ greetUser: 'Chris' })
    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      statusCode: 422,
      errorMessage: 'Invalid input'
    })
  })

  it('Change internal error to 500', async () => {
    const controller = async (body: TestRequest): Promise<TestResponse> => {
      throw new Error('Some random error')
    }

    const handler = ControllerHelper.createExpressHandler(controller)
    const app = Express()
    app.use(Express.json())
    app.post('/', handler)
    const response = await Supertest(app).post('/').send({ greetUser: 'Chris' })
    expect(response.status).toEqual(500)
    expect(response.body).toEqual({
      statusCode: 500,
      errorMessage: 'Some random error'
    })
  })
})
