// Yeh file storefront app ke liye central Redux store setup karti hai.
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import productsReducer from "./products/products.slice";
import cartReducer from "./cart/cart.slice";

/**
 * Yeh application store create karta hai aur products aur
 *  cart reducers ko register karta hai.
 * combined two reducer to make single store
 */
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  // DevTools remain enabled in non-production
  // builds to simplify debugging.
  /**
   * enable dev tools only when were not in production
   */
  devTools: import.meta.env.MODE !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/**
 * Yeh typed dispatch hook hai jo Redux dispatch 
 * support ko application-specific types
 *  ke saath provide karta hai.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Yeh typed selector hook hai jo components mein store
 *  access ke liye strong typing preserve karta hai.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
