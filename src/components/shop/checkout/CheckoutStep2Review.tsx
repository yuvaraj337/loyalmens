import React from 'react';
import { useCheckout } from '../../../context/CheckoutContext';
import { useCart, parsePrice } from '../../../context/CartContext';
import { User, Phone, Mail, MapPin, Pencil, Info, Loader2, AlertCircle } from 'lucide-react';
import { CheckoutOrderSummarySidebar } from './CheckoutOrderSummarySidebar';

export const CheckoutStep2Review: React.FC = () => {
  const {
    customer,
    goToStep,
    getFormattedAddress,
    placeOrder,
    isSubmitting,
    submitError,
  } = useCheckout();

  const { items } = useCart();
  const formattedAddress = getFormattedAddress();

  const handlePlaceOrder = async () => {
    await placeOrder();
  };

  return (
    <div className="checkout-grid-layout">
      {/* Left Column */}
      <section className="checkout-main-review" aria-label="Review Order Information">
        <h1 className="checkout-page-title">Review Your Order</h1>
        <p className="checkout-page-subtitle">
          Please check your details before submitting the order.
        </p>

        {submitError && (
          <div className="checkout-location-error" role="alert">
            <AlertCircle size={18} />
            <span>{submitError}</span>
          </div>
        )}

        {/* Product Summary Card(s) */}
        {items.map((item) => {
          const unitPrice = parsePrice(item.price);
          const lineTotal = unitPrice * item.quantity;
          return (
            <div key={item.id} className="checkout-review-product-card">
              <div className="checkout-review-img">
                <img src={item.image} alt={item.name} loading="lazy" />
              </div>
              <div className="checkout-review-details">
                <div className="checkout-review-product-name">{item.name}</div>
                <div className="checkout-review-product-desc">
                  {item.description || (item.size ? `Size: ${item.size}` : 'RIZHEENA Premium Care')}
                </div>
                <div className="checkout-review-product-qty">
                  Qty: <span>{item.quantity}</span>
                </div>
              </div>
              <div className="checkout-review-product-price">
                ₹{lineTotal.toLocaleString('en-IN')}
              </div>
            </div>
          );
        })}

        {/* Customer Details & Delivery Address Cards */}
        <div className="checkout-review-cards-row">
          {/* Customer Details Card */}
          <div className="checkout-review-info-card">
            <div className="checkout-review-card-header">
              <h2 className="checkout-review-card-title">Customer Details</h2>
              <button
                type="button"
                className="checkout-review-edit-btn"
                onClick={() => goToStep(1)}
                aria-label="Edit Customer Details"
              >
                <Pencil size={15} />
              </button>
            </div>
            <div className="checkout-review-lines">
              <div className="checkout-review-line">
                <User size={15} />
                <span>{customer.fullName || 'Not provided'}</span>
              </div>
              <div className="checkout-review-line">
                <Phone size={15} />
                <span>{customer.phone || 'Not provided'}</span>
              </div>
              {customer.email && (
                <div className="checkout-review-line">
                  <Mail size={15} />
                  <span>{customer.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Address Card */}
          <div className="checkout-review-info-card">
            <div className="checkout-review-card-header">
              <h2 className="checkout-review-card-title">Delivery Address</h2>
              <button
                type="button"
                className="checkout-review-edit-btn"
                onClick={() => goToStep(1)}
                aria-label="Edit Delivery Address"
              >
                <Pencil size={15} />
              </button>
            </div>
            <div className="checkout-review-lines">
              <div className="checkout-review-line address-line">
                <MapPin size={16} />
                <span>{formattedAddress}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="checkout-notice-banner">
          <Info className="checkout-notice-icon" size={18} />
          <span>No online payment required at this stage.</span>
        </div>

        {/* Place Order Button */}
        <button
          type="button"
          className="checkout-btn-gold"
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
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
              <span aria-hidden="true">&rarr;</span>
            </>
          )}
        </button>
      </section>

      {/* Right Column: Order Summary */}
      <CheckoutOrderSummarySidebar variant="review" />
    </div>
  );
};
