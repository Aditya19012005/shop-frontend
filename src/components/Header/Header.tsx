// Yeh shared header component hai jo storefront ke across use hota hai.
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store";
import "./Header.css";
import { selectCartItemCount } from "../../store/cart/cart.slice";

/**
 * Yeh top navigation bar render karta hai aur cart mein
 *  current items ki count dikhata hai.
 */



export function Header() {
  
  const itemCount = useAppSelector(selectCartItemCount);

  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand-mark">W&W</span>
        <span className="brand-name"> TOI MUSIC</span>
      </Link>
      <nav className="header-nav">
        <Link to="/cart" className="cart-link">
          Cart
          <span className="cart-count" aria-label={`${itemCount} items in cart`}>
            {itemCount}
          </span>
        </Link>
      </nav>
    </header>
  );
}
