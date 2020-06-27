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

  it('can list all product', async () => {
    const generateProduct = (): Product => {
      return {
        id: new MongoDb.ObjectID(),
        sku: 'aaa',
        description: 'my product',
        name: 'product',
        unitPrice: 100
      }
    }
    const products = [
      generateProduct(),
      generateProduct()
    ]
    await Promise.all(products.map(
      p => ProductData.insert(p)
    ))
    const savedProducts = await ProductData.findAll()
    expect(savedProducts.some(p => p.id.equals(products[0].id)))
    expect(savedProducts.some(p => p.id.equals(products[1].id)))
  })

  it('Can remove product', async () => {
    const sampleProduct: Product = {
      id: new MongoDb.ObjectID(),
      sku: 'aaa',
      description: 'my product',
      name: 'product',
      unitPrice: 100
    }
    await ProductData.insert(sampleProduct)
    const deleteSuccess = await ProductData.removeById(sampleProduct.id)
    expect(deleteSuccess).toBeTruthy()
    const savedProduct = await ProductData.getById(sampleProduct.id)
    expect(savedProduct).toBeNull()
    const products = await ProductData.findAll()
    expect(products.length).toEqual(0)
  })

  it('return false if removed product that does not exists', async () => {
    const deleteFailed = await ProductData.removeById('random_id')
    expect(deleteFailed).toBeFalsy()
  })
})
