import * as Supertest from 'supertest'
import server from '../app/server'

test('Root endpoint return welcome message', () => {
  return Supertest(server).get('/').expect(200).then(res => {
    expect(res.text).toEqual('Hello world')
  })
})
