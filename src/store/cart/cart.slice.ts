// Yeh Redux slice hai jo cart state aur cart interactions ko handle karti hai.
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../database/products.types";
import type { RootState } from '../index'
/**
 * Yeh shopping cart ka ek single line item represent karta hai.
 */
export interface CartLine {
  product: Product;
  quantity: number;
}

/**
 * Yeh cart slice state ki shape define karta hai.
 */
interface CartState {
  lines: CartLine[];
}

/**
 * Yeh cart ka initial state hai jab tak products add na ho jayein.
 */
const initialState: CartState = {
  lines: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /** Yeh product ko cart mein add karta hai ya phir existing 
     * quantity ko increment karta hai. */
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.lines.find((l) => l.product.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.lines.push({ product: action.payload, quantity: 1 });
      }
    },
    /** Yeh product line ko cart se uski id ke basis par remove karta hai. */
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.lines = state.lines.filter((l) => l.product.id !== action.payload);
    },
    /** Yeh existing cart line ki quantity update karta hai aur minimum 1 rakhta hai. */
    setQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const line = state.lines.find((l) => l.product.id === action.payload.productId);
      if (line) {
        line.quantity = Math.max(1, action.payload.quantity);
      }
    },
    /** Yeh saare cart items clear karta hai. */
    clearCart: (state) => {
      state.lines = [];
    },
  },
});

export const { addToCart, removeFromCart, setQuantity, clearCart } = cartSlice.actions;
export const selectCartItemCount = (state: RootState) =>
  state.cart.lines.reduce((sum, line) => sum + line.quantity, 0);

export default cartSlice.reducer;
