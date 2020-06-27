import * as Joi from '@hapi/joi'
import * as ControllerHelper from './controller_helper'
import * as ProductView from '../views/product_view'
import * as DeleteView from '../views/delete_view'
import * as ProductService from '../services/product/product_service'

export async function getById(
  body: ControllerHelper.Body,
  queryString: ControllerHelper.QueryString,
  params: ControllerHelper.Params
): Promise<ProductView.ProductResponse> {
  const id = params.id
  if (!id) {
    throw new ControllerHelper.NotFoundError()
  }
  const product = await ProductService.getById(String(id))
  if (!product) {
    throw new ControllerHelper.NotFoundError()
  }
  return ProductView.singleView(product)
}

export async function post(
  body: ControllerHelper.Body,
  queryString: ControllerHelper.QueryString,
  params: ControllerHelper.Params
): Promise<ProductView.ProductResponse> {
  const schema = Joi.object().keys({
    id: Joi.string().optional(),
    sku: Joi.string().required(),
    description: Joi.string().optional().allow(null),
    name: Joi.string().required(),
    unitPrice: Joi.number().required()
  })
  const validationResult = schema.validate(body, { stripUnknown: true })
  if (validationResult.error) {
    throw new ControllerHelper.ValidationError(validationResult.error.message)
  }
  const result = await ProductService.insert(validationResult.value)
  return ProductView.singleView(result)
}

export async function getAll(
  body: ControllerHelper.Body,
  queryString: ControllerHelper.QueryString,
  params: ControllerHelper.Params
): Promise<ProductView.ProductResponse[]> {
  const result = await ProductService.findAll()
  return ProductView.listView(result)
}

export async function deleteById(
  body: ControllerHelper.Body,
  queryString: ControllerHelper.QueryString,
  params: ControllerHelper.Params
): Promise<DeleteView.DeleteResponse> {
  const result = await ProductService.removeById(String(params.id))
  return DeleteView.deleteView(result)
}

export const getByIdHandler = ControllerHelper.createExpressHandler(getById)
export const postHandler = ControllerHelper.createExpressHandler(post)
export const getAllHandler = ControllerHelper.createExpressHandler(getAll)
export const deleteHandler = ControllerHelper.createExpressHandler(deleteById)
