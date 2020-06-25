import * as MongoConnection from '../services/connections/mongodb'

export async function cleanDb (): Promise<void> {
  const db = await MongoConnection.getClient()
  const collections = await db.listCollections().toArray()
  await Promise.all(collections.map(
    collection => db.collection(collection.name).deleteMany({})
  ))
}

export async function close (): Promise<void> {
  return MongoConnection.close()
}

