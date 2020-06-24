/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as dotenv from 'dotenv'
dotenv.config()

const isTestEnvironment = process.env.NODE_ENV === 'TEST'

function getConfig () {
  const testConfig = {
    mongoUrl: 'mongodb://localhost:27017/ecommerce_ts_test'
  }
  return {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT || '3000',
    mongoUrl: process.env.MONGO_URL || '',
    ...(isTestEnvironment ? testConfig : {})
  }
}

export default getConfig()
