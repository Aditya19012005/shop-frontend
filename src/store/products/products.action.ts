// Yeh file thunk actions contain karti hai jo product data load karti hain aur products slice ko update karti hain.
import type { AppDispatch, RootState } from "../index";
import { ListProductsApi, GetProductByIdApi, SearchProductsApi } from "../../database/products.api";
import {
  setProductsLoading,
  setProductsList,
  setProductsError,
  setSelectedProductLoading,
  setSelectedProduct,
  cacheProduct
} from "./products.slice";

/**
 * Yeh full product catalogue load karta hai aur loading, 
 * success ya error actions dispatch karta hai.
 * concept of thunk pehle loading then result/error
 */
export const fetchProducts =
  (page: number = 1, pageSize: number = 10) =>
    async (dispatch: AppDispatch) => {
      dispatch(setProductsLoading());

      try {
        // await makes the api call
        const response = await ListProductsApi(page, pageSize);
        dispatch(setProductsList(response));
      } catch (err) {
        dispatch(setProductsError("Could not load the catalogue. Try again."));
      }
    };

export const searchProducts =
  (
    keyword: string,
    page: number = 1,
    pageSize: number = 10
  ) =>
    async (dispatch: AppDispatch) => {
      dispatch(setProductsLoading());

      try {
        const response = await SearchProductsApi(
          keyword,
          page,
          pageSize
        );

        dispatch(setProductsList(response));
      } catch (err) {
        dispatch(setProductsError("Search failed."));
      }
    };
/**
 * Yeh product id ke basis par single product load karta hai
 *  aur selected product state ko dispatch karta hai.
 */
export const fetchProductById =
  (id: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
      dispatch(setSelectedProductLoading());

      const state = getState();
      const cachedProduct = state.products.cachedProducts[id];

      if (cachedProduct) {
        dispatch(setSelectedProduct(cachedProduct));
        return;
      }


      try {
        const product = await GetProductByIdApi(id);

        if (product) {
          dispatch(cacheProduct(product));
        }

        dispatch(setSelectedProduct(product ?? null));
      } catch (err) {
        dispatch(setSelectedProduct(null));
      }
    };
