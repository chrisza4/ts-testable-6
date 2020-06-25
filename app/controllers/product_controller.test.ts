jest.mock('../services/product/product_service')
import { mocked } from 'ts-jest/utils'
import * as ProductService from '../services/product/product_service'
import * as ProductController from './product_ccntroller'
import * as ProductType from '../services/product/product_type'
import { ObjectId } from 'mongodb'

const mockProduct: ProductType.Product = {
  sku: '111',
  name: 'my product',
  description: 'mock product',
  id: new ObjectId(),
  unitPrice: 100
}

describe('ProductController', () => {
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
      const product = await ProductController.getById({ }, { }, { id: 3 })
      throw Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('NotFoundError')
    }

  })
})
