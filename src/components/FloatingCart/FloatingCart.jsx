import { useCart } from "../../context/CartContext";
import { Basket } from "@phosphor-icons/react";
import "./FloatingCart.css";

export default function FloatingCart({ onOpen }) {
  const { itemCount, total } = useCart();

  return (
    <div className="floating-cart" onClick={onOpen}>
      <div className="fc-top">
        <Basket size={18} weight="bold" color="#fff" />
        <span>{itemCount} {itemCount === 1 ? "Item" : "Items"}</span>
      </div>
      <div className="fc-divider" />
      <div className="fc-price">${total.toFixed(2)}</div>
    </div>
  );
}