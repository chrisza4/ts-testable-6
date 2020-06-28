import * as ProductData from './product_data'
import { Product } from './product_type'

export function getById (id: string): Promise<Product | null> {
  return ProductData.getById(id)
}

export function insert (product: Product): Promise<Product> {
  return ProductData.insert(product)
}
