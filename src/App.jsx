import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Banner from "./components/Banner/Banner";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import FloatingCart from "./components/FloatingCart/FloatingCart";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import { CartProvider } from "./context/CartContext";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <Navbar />
              <Banner />
              <ProductGrid />
              <FloatingCart onOpen={() => setCartOpen(true)} />
              <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            </div>
          }
        />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </CartProvider>
  );
}

export default App;