import * as ProductType from "../services/product/product_type"

export type ProductResponse = ProductType.Product

export function view (product: ProductType.Product): ProductResponse {
  return product
}
