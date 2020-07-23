jest.mock('../services/product/product_service')
import { mocked } from 'ts-jest/utils'
import * as ProductService from '../services/product/product_service'
import * as ProductController from './product_controller'
import * as ProductType from '../services/product/product_type'
import { ObjectId } from 'mongodb'

function generateMockProduct(): ProductType.Product {
  return {
    sku: '111',
    name: 'my product',
    description: 'mock product',
    id: new ObjectId(),
    unitPrice: 100
  }
}

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
    const mockProduct = generateMockProduct()
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

describe('post', () => {
  it('return validation error for invalid input', async () => {
    try {
      const product = await ProductController.post({ something: 'not right' }, {}, {})
      throw Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('ValidationError')
    }
  })

  it('return product value for invalid input', async () => {
    const mockProduct = generateMockProduct()
    mocked(ProductService).insert.mockResolvedValue(mockProduct)
    const product = await ProductController.post({
      ...mockProduct,
      id: undefined
    }, { }, { })
    expect(product).toEqual(mockProduct)
  })

  describe('list', () => {
    it('return list of products', async () => {
      const mockProducts = [
        generateMockProduct(),
        generateMockProduct(),
        generateMockProduct()
      ]
      mocked(ProductService).findAll.mockResolvedValue(mockProducts)
      const products = await ProductController.getAll({}, {}, {})
      expect(products).toEqual(mockProducts)
    })
  })

  describe('remove', () => {
    it('return success when delete success', async () => {
      mocked(ProductService).removeById.mockResolvedValue(true)
      const deleteResult = await ProductController.deleteById({ }, { }, { id: 'haha' })
      expect(deleteResult).toEqual({
        success: true
      })
    })

    it('return failed when delete failed', async () => {
      mocked(ProductService).removeById.mockResolvedValue(false)
      const deleteResult = await ProductController.deleteById({ }, { }, { id: 'haha' })
      expect(deleteResult).toEqual({
        success: false
      })
    })
  })
})

describe('update by id', () => {
  it('return updated price value when update success', async () => {
    const mockProduct = generateMockProduct()
    mockProduct.unitPrice = 200
    mocked(ProductService).updateById.mockResolvedValue(mockProduct)
    const updateResult = await ProductController.updateById({ unitPrice: mockProduct.unitPrice }, {}, { id: String(mockProduct.id) })
    expect(updateResult).toEqual(mockProduct)
  })

  it('send id to update service', async () => {
    const mockProduct = generateMockProduct()
    const MockedProductService = mocked(ProductService)
    MockedProductService.updateById.mockResolvedValue(mockProduct)
    const updateResult = await ProductController.updateById({ unitPrice: mockProduct.unitPrice }, {}, { id: String(mockProduct.id) })
    expect(MockedProductService.updateById.mock.calls[1]).toEqual([mockProduct.id, { unitPrice: mockProduct.unitPrice }])
  })

  it('return validate error', async () => {
    try {
      const mockProduct = generateMockProduct()
      const product = await ProductController.updateById({ unitPrice: 'not right' }, {}, { id: String(mockProduct.id) })
    } catch (err) {
      expect(err.name).toEqual('ValidationError')
    }
  })

  it('return not found error', async () => {
    try {
      expect.assertions(1)
      mocked(ProductService).updateById.mockResolvedValue(null)
      const mockProduct = generateMockProduct()
      const product = await ProductController.updateById({ unitPrice: mockProduct.unitPrice }, {}, { id: 'not_found' })
    } catch (err) {
      expect(err.name).toEqual('NotFoundError')
    }
  })

  it('return validate error when not send id', async () => {
    try {
      expect.assertions(1)
      const mockProduct = generateMockProduct()
      const product = await ProductController.updateById({ unitPrice: 200 }, {}, {})
    } catch (err) {
      expect(err.name).toEqual('ValidationError')
    }
  })
})


