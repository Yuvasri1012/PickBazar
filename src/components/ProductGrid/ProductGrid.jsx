import { useState, useEffect } from "react";
import { categories } from "../Data/Data";
import { FiChevronDown } from "react-icons/fi";
import { Basket } from "@phosphor-icons/react";
import { useCart } from "../../context/CartContext";
import "./ProductGrid.css";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const { items, dispatch } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://6a414a251ff1d27becc16d86.mockapi.io/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const cart = items.reduce((acc, item) => {
    acc[String(item.id)] = item.qty;
    return acc;
  }, {});

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeFromCart = (id) => {
    const currentQty = cart[String(id)] || 0;
    if (currentQty <= 1) {
      dispatch({ type: "REMOVE_ITEM", payload: String(id) });
    } else {
      dispatch({ type: "DECREMENT", payload: String(id) });
    }
  };

  return (
    <div className="pg-layout">
      <aside className="pg-sidebar">
        {categories.slice(1).map((cat) => (
          <button
            key={cat.id}
            className={`pg-cat-btn${activeCategory === cat.id ? " active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="pg-cat-icon">{cat.icon}</span>
            <span className="pg-cat-name">{cat.name}</span>
            <span className="pg-cat-arrow">
              <FiChevronDown size={16} />
            </span>
          </button>
        ))}
      </aside>

      <main className="pg-main">
        <div className="pg-topbar">
          <h2 className="pg-section-title">
            {categories.find((c) => c.id === activeCategory)?.name ?? "All Products"}
          </h2>
        </div>

        <div className="pg-grid">
          {filtered.map((product) => (
            <div className="pg-card" key={product.id}>
              {product.discount > 0 && (
                <span className="pg-discount-badge">{product.discount}%</span>
              )}

              <div className="pg-img-wrap">
                <img src={product.image} alt={product.name} className="pg-img" />
              </div>

              <div className="pg-card-body">
                <p className="pg-product-name">{product.name}</p>
                <p className="pg-product-weight">{product.weight}</p>

                <div className="pg-price-row">
                  <div className="pg-prices">
                    {product.discount > 0 ? (
                      <>
                        <span className="pg-original">
                          ${Number(product.price).toFixed(2)}
                        </span>
                        <span className="pg-sale">
                          ${Number(product.discountPrice).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="pg-sale">
                        ${Number(product.price).toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  {cart[String(product.id)] ? (
                    <div className="pg-qty-ctrl">
                      <button
                        className="pg-qty-btn"
                        onClick={() => removeFromCart(product.id)}
                      >
                        −
                      </button>
                      <span className="pg-qty-num">{cart[String(product.id)]}</span>
                      <button
                        className="pg-qty-btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="pg-add-btn"
                      onClick={() => addToCart(product)}
                    >
                      <Basket size={15} weight="bold" />
                      Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}