import * as Supertest from 'supertest'
import * as MongoDb from 'mongodb'
import Server from '../server'
import * as TestHelper from './test_helper'
import * as ProductData from '../services/product/product_data'
import { Product } from '../services/product/product_type'

describe('Product', () => {
  beforeEach(() => {
    return TestHelper.cleanDb()
  })

  afterAll(() => TestHelper.close())

  it('Can update', async () => {
    const id = new MongoDb.ObjectID()
    const sampleProduct: Product = {
      id,
      sku: 'pong',
      description: 'my product',
      name: 'product',
      unitPrice: 100
    }
    await ProductData.insert(sampleProduct)
    const response = await Supertest(Server).put(`/product/${id}`).send({
      unitPrice: 200,
    }).expect(200)
    
    expect(response.body.unitPrice).toEqual(200)
  })

  it('Return not found', async () => {
    const response = await Supertest(Server).put('/product/not_found').send({
      unitPrice: 200,
    })
    expect(response.body.statusCode).toEqual(404)
    expect(response.body.errorMessage).toEqual('Resource not found')
  })
})
