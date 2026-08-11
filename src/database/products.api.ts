// Yeh data-access layer hai jo application ke liye product retrieval ko abstract karti hai.
import { RpcApi } from "./rpc.api";
import type { Product, ProductListResponse } from "./products.types";
/**
 * Yeh local data source se full product list return karta hai.
 */
export async function ListProductsApi(
  page: number,
  pageSize: number
): Promise<ProductListResponse> {
  return RpcApi<ProductListResponse>({
    method: "product.list",
    params: {
      page,
      pageSize,
    },
  });
}

/**
 * Yeh local data source se product id ke through single product return karta hai.
 */
export async function GetProductByIdApi(
  id: string
): Promise<Product | undefined> {
  return RpcApi<Product | undefined>({
    method: "product.byId",
    params: {
      id,
    },
  });
}


export async function SearchProductsApi(
  keyword: string,
  page: number,
  pageSize: number
): Promise<ProductListResponse> {
  return RpcApi<ProductListResponse>({
    method: "product.search",
    params: {
      keyword,
      page,
      pageSize,
      sort: "title",
    },
  });
}
export async function SuggestionsApi(
  keyword: string
): Promise<string[]> {
  return RpcApi<string[]>({
    method: "product.suggestions",
    params: {
      keyword,
    },
  });
}