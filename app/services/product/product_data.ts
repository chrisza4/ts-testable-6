import * as MongoDb from 'mongodb'
import * as MongoConnection from '../connections/mongodb'
import { Product, ProductAny } from './product_type'

export async function getById (id: MongoDb.ObjectId | string): Promise<Product | null> {
  const client = await MongoConnection.getClient()
  return client.collection('products').findOne<Product>({ id })
}

export async function insert(product: Product): Promise<Product> {
  const client = await MongoConnection.getClient()
  await client.collection('products').insertOne(product)
  return product
}

export async function findAll (): Promise<Product[]> {
  const client = await MongoConnection.getClient()
  return client.collection('products').find<Product>({}).toArray()
}

export async function removeById (id: MongoDb.ObjectID | string): Promise<boolean> {
  const client = await MongoConnection.getClient()
  const deleteResult = await client.collection('products').deleteOne({ id })
  return (deleteResult.result.n || 0) > 0
}

export async function updateById (id: MongoDb.ObjectID | string, updateData: ProductAny): Promise<MongoDb.UpdateWriteOpResult> {
  const client = await MongoConnection.getClient()  
  const updateResult = await client.collection('products').updateOne({ id }, { $set: updateData })  
  return updateResult
}
