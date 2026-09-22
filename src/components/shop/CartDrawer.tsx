import React, { useState, useCallback, useEffect } from 'react';
import { useCart, parsePrice } from '../../context/CartContext';
import '../../styles/cart-drawer.css';

export const CartDrawer: React.FC = () => {
  const {
    items,
    totalCount,
    totalPrice,
    subtotal,
    gst,
    deliveryCharge,
    finalTotal,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
  } = useCart();

  const [isExiting, setIsExiting] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      closeDrawer();
    }, 300);
  }, [closeDrawer]);

  const handleCheckout = useCallback(() => {
    handleClose();
    setTimeout(() => {
      window.history.pushState({}, '', '/shop/checkout');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 320);
  }, [handleClose]);

  const handleContinueShopping = useCallback(() => {
    handleClose();
    setTimeout(() => {
      window.history.pushState({}, '', '/shop');
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 320);
  }, [handleClose]);

  if (!isDrawerOpen && !isExiting) return null;

  return (
    <>
      {/* Dimmed Overlay */}
      <div
        className={`cart-drawer-overlay${isExiting ? ' cart-drawer-overlay--exiting' : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={`cart-drawer${isExiting ? ' cart-drawer--exiting' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        {/* Header: Title and Close button */}
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">
            Your Cart ({totalCount})
          </h2>
          <button
            type="button"
            className="cart-drawer-close"
            onClick={handleClose}
            aria-label="Close cart"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Product Items List */}
        <div className="cart-drawer-items">
          {items.length === 0 ? (
            <div className="cart-drawer-empty">
              <svg className="cart-drawer-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p className="cart-drawer-empty-text">Your cart is empty</p>
              <button
                type="button"
                className="cart-drawer-empty-btn"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice = parsePrice(item.price);
              return (
                <div key={item.id} className="cart-drawer-item">
                  {/* Product thumbnail */}
                  <div className="cart-drawer-item-img">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>

                  {/* Details column */}
                  <div className="cart-drawer-item-details">
                    <div className="cart-drawer-item-name">{item.name}</div>
                    {item.size && <div className="cart-drawer-item-size">{item.size}</div>}

                    {/* Bottom row: Price on left, Stepper & Trash on right */}
                    <div className="cart-drawer-item-bottom">
                      <div className="cart-drawer-item-price">₹{unitPrice}</div>

                      <div className="cart-drawer-actions-wrap">
                        {/* Quantity Stepper */}
                        <div className="cart-drawer-qty-control">
                          <button
                            type="button"
                            className="cart-drawer-qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            −
                          </button>
                          <span className="cart-drawer-qty-num">{item.quantity}</span>
                          <button
                            type="button"
                            className="cart-drawer-qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>

                        {/* Remove item button */}
                        <button
                          type="button"
                          className="cart-drawer-remove"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer: Total and Action buttons */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px', fontSize: '13px', color: '#666' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: '#1A1816' }}>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>GST (12%)</span>
                <span style={{ fontWeight: 600, color: '#1A1816' }}>₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery Charges</span>
                <span style={{ fontWeight: 600, color: '#1A1816' }}>₹{deliveryCharge.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="cart-drawer-total-row">
              <span className="cart-drawer-total-label">Total</span>
              <span className="cart-drawer-total-value">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="cart-drawer-footer-btns">
              <button
                type="button"
                className="cart-drawer-checkout-btn"
                onClick={handleCheckout}
              >
                <span>Checkout</span>
                <span className="cart-drawer-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
