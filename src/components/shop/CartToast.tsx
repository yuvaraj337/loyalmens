import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from '../../context/CartContext';
import '../../styles/cart-toast.css';

export const CartToast: React.FC = () => {
  const { notification, dismissNotification, openDrawer } = useCart();
  const [isExiting, setIsExiting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsExiting(false);
      setVisible(true);
    } else if (visible) {
      // Start exit animation
      setIsExiting(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setIsExiting(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleViewCart = useCallback(() => {
    dismissNotification();
    openDrawer();
  }, [dismissNotification, openDrawer]);

  if (!visible || !notification) return null;

  const { product } = notification;

  return (
    <div className="cart-toast-wrapper" aria-live="polite" role="status">
      <div className={`cart-toast${isExiting ? ' cart-toast--exiting' : ''}`}>
        {/* Product thumbnail */}
        <div className="cart-toast-thumb">
          <img src={product.image} alt={product.name} loading="eager" />
        </div>

        {/* Content */}
        <div className="cart-toast-content">
          <div className="cart-toast-header">
            <span className="cart-toast-check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="cart-toast-title">Added to Cart</span>
          </div>

          <div className="cart-toast-name">{product.name}</div>
          {product.size && <div className="cart-toast-size">{product.size}</div>}

          <button
            type="button"
            className="cart-toast-action"
            onClick={handleViewCart}
            aria-label="View your cart"
          >
            <span>View Cart</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
