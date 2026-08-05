// Yeh Redux slice hai jo product catalogue state aur selected product status ko handle karti hai.
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product, ProductListResponse } from "../../database/products.types";

/**
 * Yeh products slice state ki shape define karta hai.
 */
interface ProductsState {
  list: Product[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;

  isLoading: boolean;
  error: string | null;

  selectedProduct: Product | null;
  selectedProductLoading: boolean;

  cachedProducts: Record<string, Product>;
}

/**
 * Yeh products slice ka initial state hai jab tak data load na ho jaye.
 */
const initialState: ProductsState = {
  list: [],
  cachedProducts: {},
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,

  isLoading: false,
  error: null,

  selectedProduct: null,
  selectedProductLoading: false,
};

/**
 * redux concept 3 create slice 
 */
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    /** Yeh catalogue ko loading state mein mark karta hai jab request chal rahi ho. */
    setProductsLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    /** Yeh fetched product list ko store karta hai aur loading state clear karta hai. */
    setProductsList: (
      state,
      action: PayloadAction<ProductListResponse>
    ) => {
      state.list = action.payload.products;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPages;
      state.isLoading = false;
    },
    /** Yeh product request fail hone par error message store karta hai. */
    setProductsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    /** Yeh single-product request ko loading state mein mark karta hai. */
    setSelectedProductLoading: (state) => {
      state.selectedProductLoading = true;
    },
    /** Yeh selected product ko store karta hai ya phir match na milne par clear karta hai. */
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
      state.selectedProductLoading = false;
    },
    cacheProduct: (state, action: PayloadAction<Product>) => {
      state.cachedProducts[action.payload.id] = action.payload;
    },
  },
});

export const {
  setProductsLoading,
  setProductsList,
  setProductsError,
  setSelectedProductLoading,
  setSelectedProduct,
  cacheProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
