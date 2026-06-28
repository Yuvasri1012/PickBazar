import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { X } from "@phosphor-icons/react";
import "./CartDrawer.css";

export default function CartDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const { items, total, dispatch } = useCart();

  const addOne = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeOne = (id) => dispatch({ type: "DECREMENT", payload: id });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      <div
        className={`cd-overlay${open ? " cd-overlay--visible" : ""}`}
        onClick={onClose}
      />
      <div className={`cd-drawer${open ? " cd-drawer--open" : ""}`}>
        <div className="cd-header">
          <div className="cd-header-left">
            <span className="cd-basket-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="50 100 20 15"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M65.7,111.043l-.714-9A1.125,1.125,0,0,0,63.871,101H62.459V103.1a.469.469,0,1,1-.937,0V101H57.211V103.1a.469.469,0,1,1-.937,0V101H54.862a1.125,1.125,0,0,0-1.117,1.033l-.715,9.006a2.605,2.605,0,0,0,2.6,2.8H63.1a2.605,2.605,0,0,0,2.6-2.806Zm-4.224-4.585-2.424,2.424a.468.468,0,0,1-.663,0l-1.136-1.136a.469.469,0,0,1,.663-.663l.8.8,2.092-2.092a.469.469,0,1,1,.663.663Z" />
              </svg>
            </span>
            <span className="cd-item-count">{itemCount} Items</span>
          </div>
          <button className="cd-close-btn" onClick={onClose}>
            <X size={20} weight="bold" />
          </button>
        </div>
        <div className="cd-items">
          {items.length === 0 ? (
            <div className="cd-empty">
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice = item.discount > 0 ? item.discountPrice : item.price;
              return (
                <div className="cd-item" key={item.id}>
                  <div className="cd-qty">
                    <button className="cd-qty-btn" onClick={() => addOne(item)}>+</button>
                    <span className="cd-qty-num">{item.qty}</span>
                    <button className="cd-qty-btn" onClick={() => removeOne(item.id)}>−</button>
                  </div>
                  <img src={item.image} alt={item.name} className="cd-img" />
                  <div className="cd-info">
                    <p className="cd-name">{item.name}</p>
                    <p className="cd-unit-price">${unitPrice}</p>
                    <p className="cd-weight">{item.qty} X {item.weight}</p>
                  </div>
                  <span className="cd-line-total">${unitPrice * item.qty}</span>
                  <button className="cd-remove-btn" onClick={() => removeItem(item.id)}>
                    <X size={14} />
                  </button>
                </div>
              );
            })
          )}
        </div>
        <div className="cd-footer">
          <button className="cd-checkout-btn" onClick={handleCheckout}>
            <span>Checkout</span>
            <span className="cd-checkout-total">${total.toFixed(0)}</span>
          </button>
        </div>
      </div>
    </>
  );
}