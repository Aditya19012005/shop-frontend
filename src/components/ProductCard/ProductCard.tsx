// Yeh reusable card component hai jo catalogue mein product display karta hai.
import { Link } from "react-router-dom";
import type { Product } from "../../database/products.types";
import { useAppDispatch, useAppSelector } from "../../store";
import { addToCart,removeFromCart,setQuantity } from "../../store/cart/cart.slice";
import { Vinyl } from "../Vinyl/Vinyl";
import "./ProductCard.css";

/**
 * Yeh compact product summary display karta hai aur item ko cart mein add karne ka option deta hai.
 */
export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const cartLine = useAppSelector((state)=> 
  state.cart.lines.find((line)=> line.product.id === product.id)
);

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
          {product.stock === 0 ? (
  <button className="add-to-cart-btn" disabled>
    Sold out
  </button>
) : cartLine ? (
  <div className="quantity-stepper">
    <button
      onClick={() => {
        if (cartLine.quantity === 1) {
          dispatch(removeFromCart(product.id));
        } else {
          dispatch(
            setQuantity({
              productId: product.id,
              quantity: cartLine.quantity - 1,
            })
          );
        }
      }}
    >
      −
    </button>

    <span>{cartLine.quantity}</span>

    <button
      onClick={() =>
        dispatch(
          setQuantity({
            productId: product.id,
            quantity: cartLine.quantity + 1,
          })
        )
      }
    >
      +
    </button>
  </div>
) : (
  <button
    className="add-to-cart-btn"
    onClick={() => dispatch(addToCart(product))}
  >
    Add to cart
  </button>
)}
        </div>
      </div>
    </article>
  );
}
