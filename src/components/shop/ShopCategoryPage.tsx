import React, { useState, useMemo } from 'react';
import { CategoryPageConfig, ShopProductItem } from '../../types/shop-category';
import { FeatureIcon } from './ShopCategoryIcons';
import '../../styles/shop-category.css';

interface ShopCategoryPageProps {
  config: CategoryPageConfig;
}

export const ShopCategoryPage: React.FC<ShopCategoryPageProps> = ({ config }) => {
  // Quantities state for each product card (defaults to 1)
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('default');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  // Helper to get quantity of a product
  const getQty = (id: string) => quantities[id] || 1;

  // Increment quantity
  const handleIncreaseQty = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  // Decrement quantity (minimum 1)
  const handleDecreaseQty = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  // Parse price for sorting
  const parsePrice = (priceStr: string): number => {
    const match = priceStr.replace(/,/g, '').match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Filtered and sorted products
  const displayProducts = useMemo(() => {
    let list = [...config.products];

    // Search filter
    if (config.hasSearch && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.size.toLowerCase().includes(q));
    }

    // Sort
    if (config.hasSort && sortOption !== 'default') {
      if (sortOption === 'price-asc') {
        list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      } else if (sortOption === 'price-desc') {
        list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      } else if (sortOption === 'name-asc') {
        list.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    return list;
  }, [config.products, config.hasSearch, config.hasSort, searchQuery, sortOption]);

  // Handle Add to Cart
  const handleAddToCart = (product: ShopProductItem) => {
    const qty = getQty(product.id);
    setCartCount((prev) => prev + qty);
    setToastMessage(`Added ${qty} × "${product.name}" to cart`);

    // Auto-dismiss toast after 2.5s
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);

    // Dispatch global event for navbar/cart badge updates
    window.dispatchEvent(
      new CustomEvent('cart-updated', {
        detail: { product, quantity: qty },
      })
    );
  };

  // Determine grid class (3 columns for Beard Care, 4 for others)
  const isThreeCol = config.id === 'beard-care';
  const gridClass = isThreeCol ? 'shop-cat-grid-3' : 'shop-cat-grid-4';

  return (
    <div className="shop-category-page" id={`shop-cat-${config.id}`}>
      <div className="shop-category-container">
        {/* Navigation Bar: Back link & Cart indicator */}
        <div className="shop-cat-nav-bar">
          <a href="/shop" className="shop-cat-back-link" aria-label="Back to Shop catalog">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Shop</span>
          </a>

          <a href="/shop" className="shop-cat-cart-btn" aria-label={`View Cart (${cartCount} items)`}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span>Cart</span>
            <span className="shop-cat-cart-badge">{cartCount}</span>
          </a>
        </div>

        {/* Header Row: Title, Subtitle, Count / Search / Sort */}
        <header className="shop-cat-header-row">
          <div className="shop-cat-title-wrap">
            <h1 className="shop-cat-heading">{config.title}</h1>
            <p className="shop-cat-subtitle">{config.subtitle}</p>
          </div>

          <div className="shop-cat-header-controls">
            {/* Search Input (Face Care & Special Care) */}
            {config.hasSearch && (
              <div className="shop-cat-search-wrap">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shop-cat-search-icon"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  className="shop-cat-search-input"
                  placeholder={config.searchPlaceholder || 'Search products...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label={config.searchPlaceholder || 'Search products'}
                />
              </div>
            )}

            {/* Sort Dropdown (Special Care) */}
            {config.hasSort && (
              <div className="shop-cat-sort-wrap">
                <select
                  className="shop-cat-sort-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  aria-label="Sort products"
                >
                  <option value="default">Sort by: Default</option>
                  <option value="price-asc">Sort by: Price (Low to High)</option>
                  <option value="price-desc">Sort by: Price (High to Low)</option>
                  <option value="name-asc">Sort by: Name (A to Z)</option>
                </select>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shop-cat-sort-arrow"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            )}

            {/* Product Count Text (Hair Care, Beard Care, Professional Kits, Special Care) */}
            {config.productCountText && !config.hasSearch && (
              <span className="shop-cat-product-count">{config.productCountText}</span>
            )}
            {config.productCountText && config.hasSearch && !searchQuery && (
              <span className="shop-cat-product-count">{config.productCountText}</span>
            )}
            {config.hasSearch && searchQuery && (
              <span className="shop-cat-product-count">{displayProducts.length} Products</span>
            )}
          </div>
        </header>

        {/* Product Cards Grid */}
        <section className={gridClass} aria-label={`${config.title} Grid`}>
          {displayProducts.length > 0 ? (
            displayProducts.map((product) => {
              const qty = getQty(product.id);
              return (
                <article key={product.id} className="shop-cat-card">
                  <div className="shop-cat-card-img-wrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="shop-cat-card-img"
                      loading="lazy"
                    />
                  </div>

                  <div className="shop-cat-card-info">
                    <h2 className="shop-cat-card-name">{product.name}</h2>
                    <span className="shop-cat-card-size">{product.size}</span>
                    <span className="shop-cat-card-price">{product.price}</span>

                    {/* Stepper: - 1 + */}
                    <div className="shop-cat-stepper" role="group" aria-label={`Quantity for ${product.name}`}>
                      <button
                        type="button"
                        className="shop-cat-step-btn"
                        onClick={() => handleDecreaseQty(product.id)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="shop-cat-step-num" aria-live="polite">
                        {qty}
                      </span>
                      <button
                        type="button"
                        className="shop-cat-step-btn"
                        onClick={() => handleIncreaseQty(product.id)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      type="button"
                      className="shop-cat-add-btn"
                      onClick={() => handleAddToCart(product)}
                      aria-label={`Add ${product.name} to Cart`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shop-cat-cart-icon"
                        aria-hidden="true"
                      >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="shop-cat-empty-results">
              <p>No products found matching "{searchQuery}".</p>
            </div>
          )}
        </section>

        {/* Bottom Feature Strip */}
        <aside className="shop-cat-feature-strip" aria-label="Product Quality & Guarantees">
          {/* Face Care side badge if configured */}
          {config.featureSideBadge && (
            <div className="shop-cat-side-badge">
              <span className="shop-cat-side-badge-title">{config.featureSideBadge.title}</span>
              <span className="shop-cat-side-badge-sub">{config.featureSideBadge.subtitle}</span>
            </div>
          )}

          {config.features.map((feat, idx) => (
            <React.Fragment key={idx}>
              <div className="shop-cat-feature-item">
                <div className="shop-cat-feature-icon-wrap" aria-hidden="true">
                  <FeatureIcon name={feat.icon} size={24} />
                </div>
                <div className="shop-cat-feature-text">
                  {feat.text.map((t, tIdx) => (
                    <span key={tIdx}>{t}</span>
                  ))}
                </div>
              </div>
              {idx < config.features.length - 1 && <div className="shop-cat-feature-sep" aria-hidden="true" />}
            </React.Fragment>
          ))}
        </aside>
      </div>

      {/* Cart Toast Notification */}
      {toastMessage && (
        <div className="shop-cat-toast" role="status" aria-live="polite">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#68D391" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
