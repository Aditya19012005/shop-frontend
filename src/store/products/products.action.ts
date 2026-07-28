// Yeh file thunk actions contain karti hai jo product data load karti hain aur products slice ko update karti hain.
import type { AppDispatch } from "../index";
import { ListProductsApi, GetProductByIdApi } from "../../database/products.api";
import {
  setProductsLoading,
  setProductsList,
  setProductsError,
  setSelectedProductLoading,
  setSelectedProduct,
} from "./products.slice";

/**
 * Yeh full product catalogue load karta hai aur loading, 
 * success ya error actions dispatch karta hai.
 * concept of thunk pehle loading then result/error
 */
export const fetchProducts = () => async (dispatch: AppDispatch) => {
  dispatch(setProductsLoading());
  try {
    const products = await ListProductsApi();
    dispatch(setProductsList(products));
  } catch (err) {
    dispatch(setProductsError("Could not load the catalogue. Try again."));
  }
};

/**
 * Yeh product id ke basis par single product load karta hai
 *  aur selected product state ko dispatch karta hai.
 */
export const fetchProductById = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(setSelectedProductLoading());
  try {
    const product = await GetProductByIdApi(id);
    dispatch(setSelectedProduct(product ?? null));
  } catch (err) {
    dispatch(setSelectedProduct(null));
  }
};
