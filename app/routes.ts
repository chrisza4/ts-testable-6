import * as Express from 'express'
import * as ProductController from './controllers/product_controller'

export function setupRoutes (app: Express.Express): void {
  app.get('/product/:id', ProductController.getByIdHandler)
  app.post('/product', ProductController.postHandler)
}
