import React from 'react';
import { useCheckout } from '../../../context/CheckoutContext';
import { Check, PhoneCall, PackageCheck, Truck } from 'lucide-react';

export const CheckoutStep3Confirmation: React.FC = () => {
  const { latestOrder, openOrdersModal } = useCheckout();

  const handleBackToShop = () => {
    window.history.pushState({}, '', '/shop');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="checkout-confirmed-container">
      {/* Gold Seal with Animated Confetti */}
      <div className="checkout-confirmed-seal-wrapper">
        <span className="checkout-confetti" />
        <span className="checkout-confetti" />
        <span className="checkout-confetti" />
        <span className="checkout-confetti" />
        <span className="checkout-confetti" />
        <span className="checkout-confetti" />

        <div className="checkout-confirmed-seal">
          <Check size={44} strokeWidth={2.8} />
        </div>
      </div>

      {/* Main Title & Subtitle */}
      <h1 className="checkout-confirmed-title">Order Submitted</h1>
      <div className="checkout-confirmed-subtitle">Our team will confirm you shortly.</div>
      <p className="checkout-confirmed-desc">
        We'll contact you on your phone number
        <br />
        to confirm the order and delivery details.
      </p>

      {latestOrder && (
        <div style={{ marginBottom: '24px', fontSize: '13.5px', color: '#666' }}>
          Order Reference: <strong style={{ color: '#1A1816' }}>{latestOrder.order_number}</strong>
        </div>
      )}

      {/* 3-Column Verification Card */}
      <div className="checkout-verification-card">
        {/* Col 1 */}
        <div className="checkout-verification-col">
          <PhoneCall className="checkout-verification-icon" size={28} strokeWidth={1.8} />
          <div className="checkout-verification-text">
            You'll get
            <br />a call from our team
          </div>
        </div>

        {/* Col 2 */}
        <div className="checkout-verification-col">
          <PackageCheck className="checkout-verification-icon" size={28} strokeWidth={1.8} />
          <div className="checkout-verification-text">
            We'll verify
            <br />
            your order details
          </div>
        </div>

        {/* Col 3 */}
        <div className="checkout-verification-col">
          <Truck className="checkout-verification-icon" size={28} strokeWidth={1.8} />
          <div className="checkout-verification-text">
            Sit back and relax
            <br />
            We'll handle the rest
          </div>
        </div>
      </div>

      {/* Stacked Action Buttons */}
      <div className="checkout-confirmed-actions">
        <button
          type="button"
          className="checkout-btn-dark-pill"
          onClick={openOrdersModal}
          id="checkout-view-orders-btn"
        >
          <span>View My Orders</span>
          <span aria-hidden="true">&rarr;</span>
        </button>

        <button
          type="button"
          className="checkout-btn-light-pill"
          onClick={handleBackToShop}
          id="checkout-back-to-shop-btn"
        >
          Back to Shop
        </button>
      </div>
    </div>
  );
};
