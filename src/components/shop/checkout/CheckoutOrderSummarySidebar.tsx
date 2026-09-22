import React from 'react';
import { useCart, parsePrice } from '../../../context/CartContext';
import { useCheckout } from '../../../context/CheckoutContext';
import { ShieldCheck } from 'lucide-react';

interface Props {
  variant?: 'delivery' | 'review';
}

export const CheckoutOrderSummarySidebar: React.FC<Props> = ({ variant = 'delivery' }) => {
  const { items, openDrawer } = useCart();
  const { subtotal, deliveryCharge, tax, finalTotal } = useCheckout();

  return (
    <aside className="checkout-summary-sidebar" aria-label="Order Summary">
      <div className="checkout-summary-header">
        <h2 className="checkout-summary-title">Order Summary</h2>
        <button
          type="button"
          className="checkout-summary-edit-btn"
          onClick={openDrawer}
          aria-label="Edit Cart Items"
        >
          Edit
        </button>
      </div>

      <div className="checkout-summary-items">
        {items.length === 0 ? (
          <p style={{ fontSize: '13.5px', color: '#7D756A' }}>No items in your cart.</p>
        ) : (
          items.map((item) => {
            const unitPrice = parsePrice(item.price);
            const lineTotal = unitPrice * item.quantity;
            return (
              <div key={item.id} className="checkout-summary-item">
                <div className="checkout-summary-img">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
                <div className="checkout-summary-details">
                  <div className="checkout-summary-name">{item.name}</div>
                  <div className="checkout-summary-sub">
                    {item.size || (item.quantity > 1 ? `Qty: ${item.quantity}` : 'Standard')}
                  </div>
                </div>
                <div className="checkout-summary-price">
                  ₹{lineTotal.toLocaleString('en-IN')}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="checkout-summary-divider" />

      <div className="checkout-summary-row">
        <span>Subtotal</span>
        <span>₹{subtotal.toLocaleString('en-IN')}</span>
      </div>

      <div className="checkout-summary-row">
        <span>GST (12%)</span>
        <span>₹{tax.toLocaleString('en-IN')}</span>
      </div>

      <div className="checkout-summary-row">
        <span>Delivery Charges</span>
        <span>₹{deliveryCharge.toLocaleString('en-IN')}</span>
      </div>

      <div className="checkout-summary-total-row">
        <span>Total</span>
        <span className="checkout-summary-total-val">
          ₹{finalTotal.toLocaleString('en-IN')}
        </span>
      </div>

      {/* Security info card */}
      <div className="checkout-security-box">
        <ShieldCheck className="checkout-security-icon" size={26} strokeWidth={1.8} />
        <div>
          <div className="checkout-security-title">Your information is safe with us</div>
          <p className="checkout-security-desc">
            {variant === 'review'
              ? "We'll only use your details to process your order."
              : "We'll only use your details to process and deliver your order."}
          </p>
        </div>
      </div>
    </aside>
  );
};
