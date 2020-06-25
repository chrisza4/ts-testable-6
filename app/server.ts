import * as Express from 'express'
import Config from './config'
import * as BodyParser from 'body-parser'
import * as Routes from './routes'

const app = Express()
app.use(BodyParser.json())
const port = Config.port

Routes.setupRoutes(app)

if (Config.NODE_ENV !== 'TEST')  {
  app.listen(port, () => console.log(`App listen to port ${Config.port}`))
}

export default app
