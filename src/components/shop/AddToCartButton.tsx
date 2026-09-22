import React, { useState, useRef, useCallback } from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/add-to-cart-button.css';

type ButtonState = 'default' | 'pressed' | 'processing' | 'success' | 'reverting';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    size: string;
    price: string;
    image: string;
    category: string;
    description?: string;
  };
  quantity: number;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product, quantity }) => {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [btnState, setBtnState] = useState<ButtonState>('default');
  const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const isAnimating = useRef(false);

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      // Ripple position
      const rect = btnRef.current?.getBoundingClientRect();
      if (rect) {
        setRipple({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          key: Date.now(),
        });
      }

      // STATE 2: PRESSED (150ms)
      setBtnState('pressed');
      await new Promise((r) => setTimeout(r, 150));

      // STATE 3: PROCESSING
      setBtnState('processing');

      try {
        // Add to cart (includes the simulated async delay)
        await addItem(product, quantity);

        // STATE 4: SUCCESS (hold for 1500ms)
        setBtnState('success');
        await new Promise((r) => setTimeout(r, 1500));

        // STATE 5: REVERT (smooth 300ms transition)
        setBtnState('reverting');
        await new Promise((r) => setTimeout(r, 300));

        setBtnState('default');
      } catch {
        // Error — revert immediately
        setBtnState('default');
      }

      setRipple(null);
      isAnimating.current = false;
    },
    [addItem, product, quantity]
  );

  const getStateClass = () => {
    switch (btnState) {
      case 'pressed':
        return 'atc-btn--pressed';
      case 'processing':
        return 'atc-btn--processing';
      case 'success':
        return 'atc-btn--success';
      case 'reverting':
        return 'atc-btn--reverting';
      default:
        return 'atc-btn--default';
    }
  };

  const ariaLabel =
    btnState === 'processing'
      ? `Adding ${product.name} to cart...`
      : btnState === 'success'
        ? `${product.name} added to cart`
        : `Add ${product.name} to cart`;

  return (
    <div className="atc-btn-container">
      <button
        ref={btnRef}
        type="button"
        className={`atc-btn ${getStateClass()}`}
        onClick={handleClick}
        disabled={btnState !== 'default'}
        aria-label={ariaLabel}
        aria-live="polite"
      >
        {/* Ripple */}
        {ripple && (
          <span
            key={ripple.key}
            className="atc-ripple"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        )}

        {/* Success particles */}
        {btnState === 'success' && (
          <span className="atc-particles" aria-hidden="true">
            <span className="atc-particle" />
            <span className="atc-particle" />
            <span className="atc-particle" />
            <span className="atc-particle" />
            <span className="atc-particle" />
            <span className="atc-particle" />
          </span>
        )}

        {/* Icon */}
        {btnState === 'processing' ? (
          <span className="atc-spinner" aria-hidden="true" />
        ) : btnState === 'success' ? (
          <svg
            className="atc-check-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            className="atc-cart-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        )}

        {/* Text */}
        <span className="atc-text">
          {btnState === 'processing'
            ? t('adding', 'Adding...')
            : btnState === 'success'
              ? t('added_to_cart', 'Added to Cart')
              : t('add_to_cart', 'Add to Cart')}
        </span>
      </button>
    </div>
  );
};
