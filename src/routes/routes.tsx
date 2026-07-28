// Yeh file storefront pages ke liye route configuration ko define karti hai.
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { ProductDetail } from "./pages/ProductDetail/ProductDetail";
import { Cart } from "./pages/Cart/Cart";

/**
 * Yeh application ke client-side route mappings ko define karta hai
 * jo home, product detail aur cart pages ke liye hain.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}
