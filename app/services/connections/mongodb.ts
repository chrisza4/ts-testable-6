import Config from '../../config'
import * as MongoDb from 'mongodb'

let client: Promise<MongoDb.Db> | null = null

export function getClient(): Promise<MongoDb.Db> {
  if (!client) {
    client = MongoDb.connect(Config.mongoUrl).then(c => c.db())
  }
  return client
}

async function run () {
  const c = await getClient()
  await c.collection('aaa').insert({ a: 1 })
  const m = await c.collection('aaa').find({}).toArray()
  console.log('Result:', m)
}
run()
