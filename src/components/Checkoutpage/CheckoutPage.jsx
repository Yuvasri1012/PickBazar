import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { ArrowLeft, Lock, ShoppingCart } from "@phosphor-icons/react";
import "./CheckoutPage.css";

const DELIVERY_CHARGE = 49;
const FREE_DELIVERY_THRESHOLD = 549;

const handlePlaceOrder = () => {
  if (!form.fullName || !form.phone || !form.address || !form.city || !form.pincode) {
    alert("Please fill all required fields.");
    return;
  }
  alert(`Order Placed Successfully!\nThank you, ${form.fullName}! Your order worth $${grandTotal} is confirmed.`);
  setOrderPlaced(true);
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, dispatch } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => {
    const price = i.discount > 0 ? i.discountPrice : i.price;
    return sum + price * i.qty;
  }, 0);
  const discount = total - subtotal;
  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const grandTotal = subtotal + deliveryCharge;
  const amountForFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = () => {
    if (!form.fullName || !form.phone || !form.address || !form.city || !form.pincode) {
      alert("Please fill all required fields.");
      return;
    }
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="co-success">
        <div className="co-success-card">
          <div className="co-success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you, {form.fullName}. Your order of {itemCount} item(s) worth ${grandTotal} is confirmed.</p>
          <button className="co-back-btn" onClick={() => navigate("/")}>← Back to Shop</button>
        </div>
      </div>
    );
  }

  return (
    <div className="co-page">
      <div className="co-breadcrumb">
        <button className="co-back-link" onClick={() => navigate("/")}>
          <ArrowLeft size={14} weight="bold" /> Back to Shop
        </button>
        <span className="co-breadcrumb-trail">Home &rsaquo; Cart &rsaquo; Checkout</span>
      </div>

      <h1 className="co-title">Checkout</h1>

      <div className="co-layout">
        <div className="co-left">
          <div className="co-card">
            <h2 className="co-card-title">Order Items ({itemCount})</h2>
            <table className="co-table">
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>UNIT PRICE</th>
                  <th>QTY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const unitPrice = item.discount > 0 ? item.discountPrice : item.price;
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="co-product-cell">
                          <img src={item.image} alt={item.name} className="co-product-img" />
                          <div>
                            <p className="co-product-name">{item.name}</p>
                            <p className="co-product-weight">{item.weight}</p>
                          </div>
                        </div>
                      </td>
                      <td className="co-price">${unitPrice}</td>
                      <td className="co-qty">{item.qty}</td>
                      <td className="co-total-cell">${unitPrice * item.qty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="co-card">
            <h2 className="co-card-title">Delivery Address</h2>
            <div className="co-form">
              <div className="co-form-row">
                <div className="co-form-group">
                  <label>FULL NAME</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full name"
                  />
                </div>
                <div className="co-form-group">
                  <label>PHONE NUMBER</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
              </div>

              <div className="co-form-group co-full">
                <label>ADDRESS</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House no., Street name"
                />
              </div>

              <div className="co-form-row">
                <div className="co-form-group">
                  <label>CITY</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>
                <div className="co-form-group">
                  <label>PINCODE</label>
                  <input
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    maxLength={6}
                  />
                </div>
              </div>

              <div className="co-form-group co-full">
                <label>STATE</label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="co-right">
          <div className="co-summary-card">
            <h2 className="co-summary-title">Order Summary</h2>

            <div className="co-summary-rows">
              <div className="co-summary-row">
                <span>Subtotal ({itemCount} items)</span>
                <span>${subtotal}</span>
              </div>
              <div className="co-summary-row">
                <span>Delivery Charge</span>
                <span>${deliveryCharge}</span>
              </div>
              {discount < 0 && (
                <div className="co-summary-row co-discount-row">
                  <span>Discount</span>
                  <span>-${Math.abs(discount)}</span>
                </div>
              )}
            </div>

            <div className="co-summary-divider" />

            <div className="co-grand-total">
              <span>Grand Total</span>
              <span>${grandTotal}</span>
            </div>

            {amountForFreeDelivery > 0 && (
              <div className="co-free-delivery-nudge">
                🛒 Add ${amountForFreeDelivery} more for free delivery!
              </div>
            )}

            <div className="co-payment-section">
              <p className="co-payment-label">PAYMENT METHOD</p>

              <label className={`co-payment-option${paymentMethod === "cod" ? " co-payment-option--active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span className="co-payment-icon">💵</span>
                Cash on Delivery
              </label>

              <label className={`co-payment-option${paymentMethod === "card" ? " co-payment-option--active" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <span className="co-payment-icon">💳</span>
                Card / UPI
              </label>
            </div>
            
            <button className="co-place-order-btn" onClick={handlePlaceOrder}>
              <ShoppingCart size={18} weight="bold" />
              Place Order
            </button>

            <p className="co-secure-note">
              <Lock size={12} /> Safe &amp; Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}