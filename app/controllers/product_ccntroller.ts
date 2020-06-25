import * as ControllerHelper from './controller_helper'
import * as ProductView from '../views/product_view'
import * as ProductService from '../services/product/product_service'

export const getById: ControllerHelper.Controller<ProductView.ProductResponse> = async (body, queryString, params) => {
  const id = params.id
  if (!id) {
    throw new ControllerHelper.NotFoundError()
  }
  const product = await ProductService.getById(String(id))
  if (!product) {
    throw new ControllerHelper.NotFoundError()
  }
  return ProductView.view(product)
}
