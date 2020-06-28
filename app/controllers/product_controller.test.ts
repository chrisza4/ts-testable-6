jest.mock('../services/product/product_service')
import { mocked } from 'ts-jest/utils'
import * as ProductService from '../services/product/product_service'
import * as ProductController from './product_controller'
import * as ProductFixtures from './product_fixtures'
import { ObjectId } from 'mongodb'

const mockProduct = ProductFixtures.generateMockProduct({
  sku: '111',
  name: 'my product',
  description: 'mock product',
  id: new ObjectId(),
  unitPrice: 100
})

describe('getById', () => {
  it('return not found if not provide id', async () => {
    try {
      await ProductController.getById({ }, { }, { })
      throw Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('NotFoundError')
    }
  })

  it('return product value provided id', async () => {
    mocked(ProductService).getById.mockResolvedValue(mockProduct)
    const product = await ProductController.getById({ }, { }, { id: 3 })
    expect(product).toEqual(mockProduct)
  })

  it('return not found given product not exists', async () => {
    mocked(ProductService).getById.mockResolvedValue(null)
    try {
      await ProductController.getById({ }, { }, { id: 3 })
      throw Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('NotFoundError')
    }

  })
})

describe('post', () => {
  it('return validation error for invalid input', async () => {
    try {
      await ProductController.post({ something: 'not right' }, {}, {})
      throw Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('ValidationError')
    }
  })

  it('return validation error for invalid id', async () => {
    try {
      const mockProduct = {
        ...ProductFixtures.generateMockProduct({}),
        id: 'invalid'
      }
      await ProductController.post(mockProduct, { }, { })
      throw Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('ValidationError')
    }
  })

  it('return product value for invalid input', async () => {
    mocked(ProductService).insert.mockResolvedValue(mockProduct)
    const product = await ProductController.post({
      ...mockProduct,
      id: undefined
    }, { }, { })
    expect(product).toEqual(mockProduct)
  })
})
