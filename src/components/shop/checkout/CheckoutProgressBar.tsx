import React from 'react';
import { useCheckout } from '../../../context/CheckoutContext';

export const CheckoutProgressBar: React.FC = () => {
  const { step } = useCheckout();

  // Screen mapping:
  // Step 1: step 1 is active (Delivery Details)
  // Step 2: step 3 is active (Review)
  // Step 3: step 4 is active (Confirmation)
  const isStep1Active = step === 1;
  const isStep3Active = step === 2;
  const isStep4Active = step === 3;

  return (
    <div className="checkout-progress-wrapper" aria-label="Checkout Progress">
      <div className="checkout-progress-track">
        <div className="checkout-progress-connector" />

        {/* 1 Delivery Details */}
        <div className={`checkout-progress-step ${isStep1Active ? 'active' : step > 1 ? 'completed' : ''}`}>
          <div className="checkout-progress-circle">1</div>
          <span className="checkout-progress-label">Delivery Details</span>
        </div>

        {/* 2 Payment */}
        <div className="checkout-progress-step">
          <div className="checkout-progress-circle">2</div>
          <span className="checkout-progress-label">Payment</span>
        </div>

        {/* 3 Order Review */}
        <div className={`checkout-progress-step ${isStep3Active ? 'active' : step > 2 ? 'completed' : ''}`}>
          <div className="checkout-progress-circle">3</div>
          <span className="checkout-progress-label">{step === 2 ? 'Review' : 'Order Review'}</span>
        </div>

        {/* 4 Confirmation */}
        <div className={`checkout-progress-step ${isStep4Active ? 'active' : ''}`}>
          <div className="checkout-progress-circle">4</div>
          <span className="checkout-progress-label">Confirmation</span>
        </div>
      </div>
    </div>
  );
};
