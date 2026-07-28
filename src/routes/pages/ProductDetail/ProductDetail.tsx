// Yeh product detail page hai jo ek individual vinyl record ki information dikhati hai.
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchProductById } from "../../../store/products/products.action";
import { addToCart } from "../../../store/cart/cart.slice";
import { Vinyl } from "../../../components/Vinyl/Vinyl";
import { Loader } from "../../../components/Loader/Loader";
import "./ProductDetail.css";

/**
 * Yeh selected product ki details load karta hai aur stock aur purchase options ke saath display karta hai.
 */
export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedProduct, selectedProductLoading } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [id, dispatch]);

  if (selectedProductLoading) {
    return <Loader label="Pulling the sleeve" />;
  }

  if (!selectedProduct) {
    return (
      <div className="detail-page">
        <p>We couldn't find that record.</p>
        <Link to="/" className="back-link">
          Back to the shop
        </Link>
      </div>
    );
  }

  const product = selectedProduct;

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">
        &larr; Back to the shop
      </Link>
      <div className="detail-layout">
        <div className="detail-art">
          <Vinyl labelColor={product.labelColor} ringColor={product.ringColor} />
        </div>
        <div className="detail-info">
          <p className="detail-genre">
            {product.genre} &middot; {product.format} &middot; {product.year}
          </p>
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-artist">{product.artist}</p>
          <p className="detail-description">{product.description}</p>
          <div className="detail-buy-row">
            <span className="detail-price">${product.price.toFixed(2)}</span>
            <button
              className="detail-add-btn"
              onClick={() => dispatch(addToCart(product))}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? "Sold out" : "Add to cart"}
            </button>
          </div>
          <p className="detail-stock">
            {product.stock > 0 ? `${product.stock} in stock` : "Currently unavailable"}
          </p>
        </div>
      </div>
    </div>
  );
}
