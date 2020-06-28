import * as ProductType from "../services/product/product_type"

export type ProductResponse = ProductType.Product

export function single (product: ProductType.Product): ProductResponse {
  return product
}
