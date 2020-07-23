import * as ProductData from './product_data'
import * as MongoDb from 'mongodb'
import { Product, ProductAny } from './product_type'

export const getById = ProductData.getById
export const insert = ProductData.insert
export const findAll = ProductData.findAll
export const removeById = ProductData.removeById
export async function updateById (id: MongoDb.ObjectID | string, updateData: ProductAny): Promise<Product | null> {
  await ProductData.updateById(id, updateData)
  const productResult = await ProductData.getById(id)
  return productResult
}
