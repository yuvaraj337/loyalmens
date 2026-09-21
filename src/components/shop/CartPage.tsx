import React from 'react';
import { useCart } from '../../context/CartContext';
import '../../styles/cart-page.css';

export const CartPage: React.FC = () => {
  const { items, totalCount, totalPrice, updateQuantity, removeItem } = useCart();

  const parsePrice = (priceStr: string): number => {
    const match = priceStr.replace(/,/g, '').match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const handleContinueShopping = () => {
    window.history.pushState({}, '', '/shop');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckout = () => {
    window.history.pushState({}, '', '/shop/checkout');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="cart-page" id="cart-page">
      <div className="cart-page-container">
        {/* Navigation */}
        <div className="cart-page-nav">
          <a href="/shop" className="cart-page-back" aria-label="Back to Shop">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Shop</span>
          </a>
        </div>

        <h1 className="cart-page-heading">Your Cart</h1>
        <p className="cart-page-subtitle">
          {totalCount === 0
            ? 'Your cart is empty.'
            : `${totalCount} item${totalCount !== 1 ? 's' : ''} in your cart`}
        </p>

        {items.length === 0 ? (
          <div className="cart-page-empty">
            <svg className="cart-page-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p className="cart-page-empty-text">
              You haven't added any products yet.<br />
              Explore our collection and find something you love.
            </p>
            <button type="button" className="cart-page-shop-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Items list */}
            <div className="cart-page-items">
              {items.map((item) => {
                const unitPrice = parsePrice(item.price);
                const subtotal = unitPrice * item.quantity;
                return (
                  <div key={item.id} className="cart-page-item">
                    <div className="cart-page-item-img">
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>

                    <div className="cart-page-item-details">
                      <div className="cart-page-item-name">{item.name}</div>
                      {item.size && <div className="cart-page-item-size">{item.size}</div>}
                      <div className="cart-page-item-price">{item.price}</div>

                      <div className="cart-page-item-actions">
                        <div className="cart-page-qty-control">
                          <button
                            type="button"
                            className="cart-page-qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            −
                          </button>
                          <span className="cart-page-qty-num">{item.quantity}</span>
                          <button
                            type="button"
                            className="cart-page-qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="cart-page-remove"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="cart-page-item-subtotal">
                      <span className="cart-page-item-subtotal-value">
                        ₹{subtotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="cart-page-summary">
              <div className="cart-page-summary-row">
                <span className="cart-page-summary-label">Subtotal ({totalCount} items)</span>
                <span className="cart-page-summary-value">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="cart-page-summary-row">
                <span className="cart-page-summary-label">Delivery</span>
                <span className="cart-page-summary-value" style={{ color: '#22A55B' }}>Free</span>
              </div>
              <div className="cart-page-summary-row cart-page-summary-row--total">
                <span className="cart-page-summary-label cart-page-summary-label--total">Total</span>
                <span className="cart-page-summary-value cart-page-summary-value--total">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="cart-page-actions">
                <button
                  type="button"
                  className="cart-page-continue-btn"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>
                <button
                  type="button"
                  className="cart-page-checkout-btn"
                  onClick={handleCheckout}
                >
                  <span>Checkout</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
