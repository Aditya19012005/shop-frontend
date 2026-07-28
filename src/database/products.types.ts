// Shared product contract used across the app's data and UI layers.
/**
 * Describes the shape of a vinyl product displayed in the storefront.
 */
export interface Product {
  id: string;
  title: string;
  artist: string;
  genre: "Jazz" | "Funk" | "Indie" | "Electronic" | "Soul";
  price: number;
  year: number;
  stock: number;
  format: "LP" | "7\" Single" | "Box Set";
  labelColor: string;
  ringColor: string;
  description: string;
}
