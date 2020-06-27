import * as ProductType from "../services/product/product_type"

export type ProductResponse = ProductType.Product
export type ProductsResponse = ProductType.Product[]

export function singleView(product: ProductType.Product): ProductResponse {
  return product
}

export function listView(products: ProductType.Product[]): ProductsResponse {
  return products
}
