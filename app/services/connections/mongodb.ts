import Config from '../../config'
import * as MongoDb from 'mongodb'

let client: Promise<MongoDb.Db> | null = null
let connection: Promise<MongoDb.MongoClient> | null = null

export function getClient(): Promise<MongoDb.Db> {
  if (!client) {
    connection = MongoDb.connect(Config.mongoUrl)
    client = connection.then(c => c.db())
  }
  return client
}

export async function close (): Promise<void> {
  if (!connection) {
    return
  }
  await (await connection).close()
  client = null
}
