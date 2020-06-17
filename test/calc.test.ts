import * as Supertest from 'supertest'
import server from '../app/server'

describe('calc', () => {
  it('can calculate', async () => {
    const res = await Supertest(server).post('/calc').send({
      firstNumber: 200,
      secondNumber: 300,
      operator: '+'
    }).expect(200)
    expect(res.body.result).toEqual(500)
  })

  it('Reject when operator is not valid', async () => {
    const res = await Supertest(server).post('/calc').send({
      firstNumber: 8,
      secondNumber: 4,
      operator: '#'
    }).expect(422)
    expect(res.body.error).toEqual('Invalid operator')
  })
})
