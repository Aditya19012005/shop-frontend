// Yeh data-access layer hai jo application ke liye product retrieval ko abstract karti hai.
import { mockProducts } from "./mockProducts";
import type { Product } from "./products.types";

/**
 * Yeh backend response ko short delay ke saath simulate karta hai
 * aur app ke baaki parts ko raw data access se alag rakhta hai.
 */
const NETWORK_DELAY_MS = 400;

/**
 * Waits briefly before resolving a value to mimic network latency.
 */
function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS));
}

/**
 * Yeh local data source se full product list return karta hai.
 */
export async function ListProductsApi(): Promise<Product[]> {
  return delay(mockProducts);
}

/**
 * Yeh local data source se product id ke through single product return karta hai.
 */
export async function GetProductByIdApi(id: string): Promise<Product | undefined> {
  return delay(mockProducts.find((p) => p.id === id));
}
