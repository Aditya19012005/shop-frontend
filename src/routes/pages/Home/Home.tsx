// Yeh landing page hai jo storefront catalogue display karti hai.
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchProducts, searchProducts, fetchSuggestions } from "../../../store/products/products.action";
import { ProductCard } from "../../../components/ProductCard/ProductCard";
import { Loader } from "../../../components/Loader/Loader";
import "./Home.css";
import { useState } from "react";

/**
 * for the search bar storage
 */

const loadSearch = () => {
  return localStorage.getItem("search") || "";
};

const saveSearch = (keyword: string) => {
  localStorage.setItem("search", keyword);
};

/**
 * Yeh home page ka hero section display karta hai aur mount hone
 *  par available product list fetch karta hai.
 */
export function Home() {
  const dispatch = useAppDispatch();
  const {
    list,
    page,
    totalPages,
    isLoading,
    suggestions,
    error,
  } = useAppSelector((state) => state.products);
  const [search, setSearch] = useState(loadSearch());
  const [pageSize, setPageSize] = useState(10);

  /* for debouncing */
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const loadPage = (newPage: number) => {
    if (debouncedSearch.trim() === "") {
      dispatch(fetchProducts(newPage, pageSize));
    } else {
      dispatch(searchProducts(debouncedSearch, newPage, pageSize));
    }
  };


  useEffect(() => {
    saveSearch(debouncedSearch);

    if (debouncedSearch.trim() === "") {
      dispatch(fetchProducts(page, pageSize));
    } else {
      dispatch(searchProducts(debouncedSearch, page, pageSize));
    }
  }, [dispatch, page, pageSize, debouncedSearch]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);


  return (
    <div className="home-page">
      <section className="hero">
        <h1 className="hero-title">Records worth the shelf space.</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => {
              const value = e.target.value;

              setSearch(value);

              dispatch(fetchSuggestions(value));
            }}
          />

          {suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="suggestion-item"
                  onClick={() => {
                    setSearch(suggestion);
                    saveSearch(suggestion);
                    dispatch(searchProducts(suggestion, 1, pageSize));
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {isLoading && <Loader label="Loading the menu" />}
      {error && <p className="error-banner">{error}</p>}

      {!isLoading && !error && (
        <>
          <div className="product-grid">
            {list.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="page-size-selector">
            <label>Show:</label>

            <select
              value={pageSize}
              onChange={(e) => {
                const size = Number(e.target.value);
                setPageSize(size);

                if (search.trim() === "") {
                  dispatch(fetchProducts(1, size));
                } else {
                  dispatch(searchProducts(search, 1, size));
                }
              }}
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={10}>10</option>
            </select>
          </div>

          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => loadPage(page - 1)}            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={page === index + 1 ? "active-page" : ""}
                onClick={() => loadPage(index + 1)}              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => loadPage(page + 1)}            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
