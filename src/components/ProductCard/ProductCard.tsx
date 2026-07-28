// Yeh reusable card component hai jo catalogue mein product display karta hai.
import { Link } from "react-router-dom";
import type { Product } from "../../database/products.types";
import { useAppDispatch } from "../../store";
import { addToCart } from "../../store/cart/cart.slice";
import { Vinyl } from "../Vinyl/Vinyl";
import "./ProductCard.css";

/**
 * Yeh compact product summary display karta hai aur item ko cart mein add karne ka option deta hai.
 */
export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <article className="product-card vinyl-card">
      <Link to={`/product/${product.id}`} className="product-card-art">
        <Vinyl labelColor={product.labelColor} ringColor={product.ringColor} />
      </Link>
      <div className="product-card-body">
        <p className="product-genre">{product.genre}</p>
        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="product-artist">{product.artist}</p>
        <div className="product-card-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="add-to-cart-btn"
            onClick={() => dispatch(addToCart(product))}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Sold out" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
