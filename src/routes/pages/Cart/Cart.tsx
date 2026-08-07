// Yeh shopping cart page hai jo selected items ko review aur update karne ke liye use hoti hai.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { removeFromCart, setQuantity, clearCart } from "../../../store/cart/cart.slice";
import "./Cart.css";
import { Vinyl } from "../../../components/Vinyl/Vinyl";
/**
 * Yeh cart contents render karta hai, quantity changes support karta hai aur checkout state handle karta hai.
 */
export function Cart() {
  const dispatch = useAppDispatch();
  const lines = useAppSelector((state) => state.cart.lines);
  const [placed, setPlaced] = useState(false);

  const total = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);

  if (placed) {
    return (
      <div className="cart-page cart-empty">
        <h1>Order placed.</h1>
        <p>This is a demo checkout, so nothing actually shipped -- but the cart is now empty.</p>
        <Link to="/" className="back-link">
          Keep browsing
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="cart-page cart-empty">
        <h1>Your cart is empty.</h1>
        <p>Nothing here yet. Go find something worth playing twice.</p>
        <Link to="/" className="back-link">
          Back to the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your cart</h1>
      <div className="cart-lines">
        {lines.map((line) => (
          <div className="cart-line" key={line.product.id}>
            <div className="cart-line-info">
              <Vinyl
                labelColor={line.product.labelColor}
                ringColor={line.product.ringColor}
                size={60}
              />

              <div className="cart-line-details">
                <p className="cart-line-title">{line.product.title}</p>
                <p className="cart-line-artist">{line.product.artist}</p>
              </div>
            </div>
            <div className="cart-line-qty">
              <button
                onClick={() => {
                  if (line.quantity === 1) {
                    dispatch(removeFromCart(line.product.id));
                  } else {
                    dispatch(
                      setQuantity({
                        productId: line.product.id,
                        quantity: line.quantity - 1,
                      })
                    );
                  }
                }}
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <span>{line.quantity}</span>
              <button
                onClick={() =>
                  dispatch(
                    setQuantity({ productId: line.product.id, quantity: line.quantity + 1 })
                  )
                }
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="cart-line-price">
              ${(line.product.price * line.quantity).toFixed(2)}
            </span>
            <button
              className="cart-line-remove"
              onClick={() => dispatch(removeFromCart(line.product.id))}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <span>Total</span>
        <span className="cart-total">${total.toFixed(2)}</span>
      </div>

      <div className="cart-actions">
        <button className="cart-clear-btn" onClick={() => dispatch(clearCart())}>
          Clear cart
        </button>
        <button
          className="cart-checkout-btn"
          onClick={() => {
            dispatch(clearCart());
            setPlaced(true);
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
