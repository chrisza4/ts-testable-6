import * as MongoDb from 'mongodb'
import { Product } from "../services/product/product_type"

export function generateMockProduct (props: Partial<Product>): Product {
  return {
    sku: '111',
    name: 'my product',
    description: 'mock product',
    id: new MongoDb.ObjectId(),
    unitPrice: 100,
    ...props
  }
}
