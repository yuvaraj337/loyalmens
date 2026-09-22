import React from 'react';
import { useCheckout } from '../../../context/CheckoutContext';
import { useCart, parsePrice } from '../../../context/CartContext';
import { Home, Phone, Box } from 'lucide-react';

export const CheckoutStep3Confirmation: React.FC = () => {
  const { latestOrder, customer, orders } = useCheckout();
  const { items: cartItems, subtotal: cartSubtotal, gst: cartGst, deliveryCharge: cartDeliveryCharge, finalTotal: cartFinalTotal } = useCart();

  // Find latest order or fallback
  const order = latestOrder || orders[0];

  const orderNumber = order?.order_number || 'RZ-ORD-9498';
  const customerPhone = order?.phone || customer.phone || '9014827882';

  // Format Indian phone number nicely (e.g. +91 90148 27882)
  const formatPhoneDisplay = (rawPhone: string) => {
    const digits = rawPhone.replace(/\D/g, '');
    if (digits.length === 10) {
      return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
    }
    if (rawPhone.startsWith('+')) return rawPhone;
    return digits ? `+91 ${digits}` : '+91 90148 27882';
  };

  // Use order items if available, or snapshot from cart
  const displayItems = (order && order.items && order.items.length > 0) ? order.items : cartItems;
  const itemCount = displayItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = order ? order.subtotal : cartSubtotal;
  const tax = order ? order.tax : cartGst;
  const deliveryCharge = order ? order.delivery_charge : cartDeliveryCharge;
  const total = order ? order.total : cartFinalTotal;

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="conf-page-container">
      {/* Celebration Gold Seal & Confetti Burst */}
      <div className="conf-celebration-wrap">
        <div className="conf-confetti-burst" aria-hidden="true">
          <span className="conf-dot dot-1" />
          <span className="conf-dot dot-2" />
          <span className="conf-dot dot-3" />
          <span className="conf-dot dot-4" />
          <span className="conf-dot dot-5" />
          <span className="conf-dot dot-6" />
          <span className="conf-spark spark-1" />
          <span className="conf-spark spark-2" />
          <span className="conf-spark spark-3" />
          <span className="conf-spark spark-4" />
        </div>
        <div className="conf-seal-circle">
          <svg
            className="conf-check-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      {/* Main Heading & Message */}
      <h1 className="conf-title">Order Placed Successfully!</h1>
      <div className="conf-message">
        <p>Thank you for your order.</p>
        <p>We've received your order and will begin processing it shortly.</p>
        <p>You'll receive a confirmation call on your phone number.</p>
      </div>

      {/* Order Reference Box (Exact Reference Image 2) */}
      <div className="conf-reference-card">
        <div className="conf-reference-top-row">
          <div className="conf-ref-box-icon-wrap">
            <Box size={38} strokeWidth={1.4} className="conf-ref-box-icon" />
          </div>
          <div className="conf-ref-divider" />
          <div className="conf-ref-details">
            <span className="conf-ref-label">ORDER REFERENCE</span>
            <span className="conf-ref-number">{orderNumber}</span>
          </div>
        </div>

        <div className="conf-reference-bottom-row">
          <Phone size={15} strokeWidth={1.8} className="conf-phone-icon" />
          <span className="conf-phone-text">
            A confirmation has been sent to{' '}
            <strong className="conf-phone-strong">{formatPhoneDisplay(customerPhone)}</strong>
          </span>
        </div>
      </div>

      {/* Order Summary Card (Exact Reference Image 2) */}
      <div className="conf-summary-card">
        <div className="conf-summary-header">
          <h2 className="conf-summary-title">Order Summary</h2>
          <span className="conf-summary-count">
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        {/* Dynamic Items */}
        <div className="conf-items-list">
          {displayItems.map((item) => {
            const unitPrice = parsePrice(item.price);
            const lineTotal = unitPrice * item.quantity;
            return (
              <div key={item.id} className="conf-item-row">
                <div className="conf-item-thumb">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
                <div className="conf-item-info">
                  <div className="conf-item-name">{item.name}</div>
                  {item.size && <div className="conf-item-size">{item.size}</div>}
                  <div className="conf-item-qty">Qty: {item.quantity}</div>
                </div>
                <div className="conf-item-price">
                  ₹{lineTotal.toLocaleString('en-IN')}
                </div>
              </div>
            );
          })}
        </div>

        <div className="conf-card-divider" />

        {/* Breakdown */}
        <div className="conf-breakdown">
          <div className="conf-breakdown-row">
            <span className="conf-breakdown-label">Subtotal</span>
            <span className="conf-breakdown-val">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="conf-breakdown-row">
            <span className="conf-breakdown-label">GST (12%)</span>
            <span className="conf-breakdown-val">₹{tax.toLocaleString('en-IN')}</span>
          </div>
          <div className="conf-breakdown-row">
            <span className="conf-breakdown-label">Delivery Charges</span>
            <span className="conf-breakdown-val">₹{deliveryCharge.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="conf-card-divider" />

        {/* Total Row */}
        <div className="conf-total-row">
          <span className="conf-total-label">Total</span>
          <span className="conf-total-val">₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Single Black Pill "Back to Home" Button */}
      <button
        type="button"
        className="conf-back-home-btn"
        onClick={handleBackToHome}
        id="conf-back-home-btn"
      >
        <Home size={18} strokeWidth={1.8} />
        <span>Back to Home</span>
      </button>
    </div>
  );
};
