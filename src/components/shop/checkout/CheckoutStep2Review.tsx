import React from 'react';
import { useCheckout } from '../../../context/CheckoutContext';
import { useCart, parsePrice } from '../../../context/CartContext';
import { User, MapPin, ShoppingBag, Pencil, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

export const CheckoutStep2Review: React.FC = () => {
  const {
    customer,
    goToStep,
    getFormattedAddress,
    placeOrder,
    isSubmitting,
    submitError,
  } = useCheckout();

  const { items, totalCount, subtotal, gst, deliveryCharge, finalTotal } = useCart();
  const formattedAddress = getFormattedAddress();

  const handlePlaceOrder = async () => {
    await placeOrder();
  };

  // Format Indian phone number nicely for display (e.g. +91 90148 27882)
  const formatPhoneDisplay = (rawPhone: string) => {
    const digits = rawPhone.replace(/\D/g, '');
    if (digits.length === 10) {
      return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
    }
    if (rawPhone.startsWith('+')) return rawPhone;
    return digits ? `+91 ${digits}` : 'Not provided';
  };

  return (
    <div className="review-container">
      {/* Title & Subtitle */}
      <h1 className="review-main-title">Review Your Order</h1>
      <p className="review-main-subtitle">Please check your details before placing the order.</p>

      {submitError && (
        <div className="checkout-location-error" role="alert" style={{ marginBottom: '20px' }}>
          <AlertCircle size={18} />
          <span>{submitError}</span>
        </div>
      )}

      {/* Single Combined Ivory Card (Exact Reference Image 1) */}
      <div className="review-single-card">
        {/* Section 1: Customer Details */}
        <div className="review-section">
          <div className="review-section-header">
            <div className="review-section-title-wrap">
              <div className="review-icon-circle">
                <User size={16} strokeWidth={1.8} />
              </div>
              <h2 className="review-section-title">Customer Details</h2>
            </div>
            <button
              type="button"
              className="review-edit-btn"
              onClick={() => goToStep(1)}
              aria-label="Edit Customer Details"
            >
              <Pencil size={13} strokeWidth={2} />
              <span>Edit</span>
            </button>
          </div>
          <div className="review-section-body">
            <div className="review-customer-name">{customer.fullName || 'Valued Customer'}</div>
            <div className="review-customer-phone">{formatPhoneDisplay(customer.phone)}</div>
            {customer.email && <div className="review-customer-email">{customer.email}</div>}
          </div>
        </div>

        <div className="review-card-divider" />

        {/* Section 2: Delivery Address */}
        <div className="review-section">
          <div className="review-section-header">
            <div className="review-section-title-wrap">
              <div className="review-icon-circle">
                <MapPin size={16} strokeWidth={1.8} />
              </div>
              <h2 className="review-section-title">Delivery Address</h2>
            </div>
            <button
              type="button"
              className="review-edit-btn"
              onClick={() => goToStep(1)}
              aria-label="Edit Delivery Address"
            >
              <Pencil size={13} strokeWidth={2} />
              <span>Edit</span>
            </button>
          </div>
          <div className="review-section-body">
            <div className="review-address-text">{formattedAddress}</div>
          </div>
        </div>

        <div className="review-card-divider" />

        {/* Section 3: Order Summary */}
        <div className="review-section">
          <div className="review-section-header">
            <div className="review-section-title-wrap">
              <div className="review-icon-circle">
                <ShoppingBag size={16} strokeWidth={1.8} />
              </div>
              <h2 className="review-section-title">Order Summary</h2>
            </div>
            <span className="review-items-count">
              {totalCount} {totalCount === 1 ? 'Item' : 'Items'}
            </span>
          </div>

          {/* Dynamic Items List */}
          <div className="review-items-list">
            {items.map((item) => {
              const unitPrice = parsePrice(item.price);
              const lineTotal = unitPrice * item.quantity;
              return (
                <div key={item.id} className="review-item-row">
                  <div className="review-item-thumb">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>
                  <div className="review-item-info">
                    <div className="review-item-name">{item.name}</div>
                    {item.size && <div className="review-item-size">{item.size}</div>}
                    <div className="review-item-qty">Qty: {item.quantity}</div>
                  </div>
                  <div className="review-item-price">
                    ₹{lineTotal.toLocaleString('en-IN')}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="review-inner-divider" />

          {/* Pricing Breakdown */}
          <div className="review-breakdown">
            <div className="review-breakdown-row">
              <span className="review-breakdown-label">Subtotal</span>
              <span className="review-breakdown-val">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="review-breakdown-row">
              <span className="review-breakdown-label">GST (12%)</span>
              <span className="review-breakdown-val">₹{gst.toLocaleString('en-IN')}</span>
            </div>
            <div className="review-breakdown-row">
              <span className="review-breakdown-label">Delivery Charges</span>
              <span className="review-breakdown-val">₹{deliveryCharge.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="review-inner-divider" />

          {/* Total Row */}
          <div className="review-total-row">
            <span className="review-total-label">Total</span>
            <span className="review-total-val">₹{finalTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Section 4: Safety Badge */}
        <div className="review-safety-box">
          <div className="review-safety-icon-wrap">
            <ShieldCheck size={22} strokeWidth={1.8} className="review-safety-icon" />
          </div>
          <div className="review-safety-content">
            <div className="review-safety-title">Your information is safe with us</div>
            <div className="review-safety-sub">
              We'll only use your details to process your order.
            </div>
          </div>
        </div>

        {/* Section 5: Place Order Button */}
        <button
          type="button"
          className="review-place-order-btn"
          onClick={handlePlaceOrder}
          disabled={isSubmitting || items.length === 0}
          id="checkout-place-order-btn"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              <span>Placing Order...</span>
            </>
          ) : (
            <>
              <span>Place Order</span>
              <span className="review-btn-arrow" aria-hidden="true">&rarr;</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
