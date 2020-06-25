import * as MongoDb from 'mongodb'
import * as TestHelper from '../../test/test_helper'
import * as ProductData from './product_data'
import { Product } from './product_type'

describe('ProductData', () => {
  beforeEach(() => {
    return TestHelper.cleanDb()
  })

  afterAll(() => TestHelper.close())

  it('can insert and get', async () => {
    const sampleProduct: Product = {
      id: new MongoDb.ObjectID(),
      sku: 'aaa',
      description: 'my product',
      name: 'product',
      unitPrice: 100
    }
    await ProductData.insert(sampleProduct)
    const savedProduct = await ProductData.getById(sampleProduct.id)
    expect(savedProduct?.id).toEqual(sampleProduct.id)
    expect(savedProduct?.sku).toEqual('aaa')
  })
})
