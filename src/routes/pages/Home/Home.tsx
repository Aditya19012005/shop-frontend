// Yeh landing page hai jo storefront catalogue display karti hai.
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchProducts } from "../../../store/products/products.action";
import { ProductCard } from "../../../components/ProductCard/ProductCard";
import { Loader } from "../../../components/Loader/Loader";
import "./Home.css";

/**
 * Yeh home page ka hero section display karta hai aur mount hone
 *  par available product list fetch karta hai.
 */
export function Home() {
  const dispatch = useAppDispatch();
  const { list, isLoading, error } = useAppSelector((state) => state.products);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="home-page">
      <section className="hero">
        <h1 className="hero-title">Records worth the shelf space.</h1>
      </section>

      {isLoading && <Loader label="Loading the menu" />}
      {error && <p className="error-banner">{error}</p>}

      {!isLoading && !error && (
        <div className="product-grid">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
