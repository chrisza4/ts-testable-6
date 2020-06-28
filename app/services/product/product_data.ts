import * as MongoDb from 'mongodb'
import * as MongoConnection from '../connections/mongodb'
import { Product } from './product_type'

export async function getById (id: MongoDb.ObjectId | string): Promise<Product | null> {
  const client = await MongoConnection.getClient()
  return client.collection('products').findOne<Product>({ id })
}
export async function insert (product: Product): Promise<Product> {
  const client = await MongoConnection.getClient()
  await client.collection('products').insertOne(product)
  return product
}

