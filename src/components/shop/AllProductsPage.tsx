import React, { useState, useMemo } from 'react';
import { SHOP_CATEGORIES_DATA } from '../../data/shop-categories';
import { ShopProductItem } from '../../types/shop-category';
import { FeatureIcon } from './ShopCategoryIcons';
import { AddToCartButton } from './AddToCartButton';
import { useCart } from '../../context/CartContext';
import '../../styles/all-products.css';

type CategoryFilter =
  | 'all'
  | 'hair-care'
  | 'hair-dyes'
  | 'beard-care'
  | 'face-care'
  | 'professional-kits'
  | 'special-care'
  | 'gift-sets';

interface FilterButton {
  id: CategoryFilter;
  label: string;
}

const FILTER_BUTTONS: FilterButton[] = [
  { id: 'all', label: 'All' },
  { id: 'hair-care', label: 'Hair Care' },
  { id: 'hair-dyes', label: 'Hair Dyes' },
  { id: 'beard-care', label: 'Beard Care' },
  { id: 'face-care', label: 'Face Care' },
  { id: 'professional-kits', label: 'Professional Kits' },
  { id: 'special-care', label: 'Special Care' },
  { id: 'gift-sets', label: 'Gift Sets' },
];

const PRODUCTS_PER_PAGE = 12;

export const AllProductsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { totalCount: cartCount, openDrawer } = useCart();

  // Aggregate all products from every category
  const allProducts = useMemo(() => {
    const products: ShopProductItem[] = [];
    Object.values(SHOP_CATEGORIES_DATA).forEach((cat) => {
      cat.products.forEach((p) => {
        products.push(p);
      });
    });
    return products;
  }, []);

  // Parse price for sorting
  const parsePrice = (priceStr: string): number => {
    const match = priceStr.replace(/,/g, '').match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Filter, search, and sort
  const displayProducts = useMemo(() => {
    let list = [...allProducts];

    // Category filter
    if (activeCategory !== 'all') {
      if (activeCategory === 'hair-dyes') {
        // Hair dyes filter: products with 'hair-dyes' tag
        list = list.filter((p) => p.tags && p.tags.includes('hair-dyes'));
      } else {
        const catConfig = SHOP_CATEGORIES_DATA[activeCategory];
        if (catConfig) {
          const catProductIds = new Set(catConfig.products.map((p) => p.id));
          list = list.filter((p) => catProductIds.has(p.id));
        }
      }
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.size.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortOption === 'price-asc') {
      list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortOption === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [allProducts, activeCategory, searchQuery, sortOption]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(displayProducts.length / PRODUCTS_PER_PAGE));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return displayProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [displayProducts, currentPage]);

  // Reset page on filter/search change
  const handleCategoryChange = (cat: CategoryFilter) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  // Quantity helpers
  const getQty = (id: string) => quantities[id] || 1;

  const handleIncreaseQty = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const handleDecreaseQty = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) }));
  };



  // Page navigation
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="all-products-page" id="all-products-page">
      <div className="all-products-container">
        {/* ============================================================
            Navigation Bar
            ============================================================ */}
        <div className="ap-nav-bar">
          <a href="/shop" className="ap-back-link" aria-label="Back to Shop catalog">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Shop</span>
          </a>

          <button
            type="button"
            className="ap-cart-btn"
            onClick={openDrawer}
            aria-label={`View Cart (${cartCount} items)`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span>Cart</span>
            <span className="ap-cart-badge">{cartCount}</span>
          </button>
        </div>

        {/* ============================================================
            Hero Section
            ============================================================ */}
        <section className="ap-hero-section" aria-label="All Products Hero">
          <div className="ap-hero-left">
            <div className="ap-eyebrow-row">
              <span className="ap-eyebrow-text">SHOP OUR RANGE</span>
              <span className="ap-eyebrow-line" />
            </div>

            <h1 className="ap-main-heading">
              All <span className="ap-heading-accent">Products</span>
            </h1>

            <p className="ap-hero-subtitle">
              Professional grooming products, now at your fingertips.
              <br />
              Browse our complete catalog of salon-grade essentials.
            </p>

            {/* Feature pills */}
            <div className="ap-hero-features">
              <div className="ap-hero-feat-item">
                <div className="ap-hero-feat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className="ap-hero-feat-text">
                  <span>Premium</span>
                  <span>Quality</span>
                </div>
              </div>

              <div className="ap-hero-feat-sep" />

              <div className="ap-hero-feat-item">
                <div className="ap-hero-feat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div className="ap-hero-feat-text">
                  <span>Trusted by</span>
                  <span>Professionals</span>
                </div>
              </div>

              <div className="ap-hero-feat-sep" />

              <div className="ap-hero-feat-item">
                <div className="ap-hero-feat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div className="ap-hero-feat-text">
                  <span>Skin & Hair</span>
                  <span>Friendly</span>
                </div>
              </div>

              <div className="ap-hero-feat-sep" />

              <div className="ap-hero-feat-item">
                <div className="ap-hero-feat-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div className="ap-hero-feat-text">
                  <span>Pan India</span>
                  <span>Delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="ap-hero-right">
            <div className="ap-hero-img-wrapper">
              <img
                src="/images/catalogue/gift-sets/grooming-products-display.jpg"
                alt="Rizheena Professional Grooming Products Collection"
                className="ap-hero-img"
                loading="eager"
              />
              <span className="ap-hero-float-badge">SAME CONFIDENCE AT HOME</span>
            </div>
          </div>
        </section>

        {/* ============================================================
            Category Filter Row
            ============================================================ */}
        <div className="ap-category-filter-row" role="tablist" aria-label="Filter by category">
          {FILTER_BUTTONS.map((btn) => (
            <button
              key={btn.id}
              type="button"
              className={`ap-filter-btn${activeCategory === btn.id ? ' active' : ''}`}
              onClick={() => handleCategoryChange(btn.id)}
              role="tab"
              aria-selected={activeCategory === btn.id}
              aria-label={`Filter by ${btn.label}`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* ============================================================
            Controls Row: Search + Sort + Product Count
            ============================================================ */}
        <div className="ap-controls-row">
          <div className="ap-controls-left">
            <div className="ap-search-wrap">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ap-search-icon"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="ap-search-input"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                aria-label="Search products"
              />
            </div>

            <div className="ap-sort-wrap">
              <select
                className="ap-sort-select"
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                aria-label="Sort products"
              >
                <option value="default">Sort by: Recommended</option>
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
                className="ap-sort-arrow"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <span className="ap-product-count">
            {displayProducts.length} Product{displayProducts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* ============================================================
            Product Grid
            ============================================================ */}
        <section className="ap-product-grid" aria-label="All Products Grid">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => {
              const qty = getQty(product.id);
              return (
                <article key={product.id} className="ap-product-card">
                  <div className="ap-card-img-wrap">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="ap-card-img"
                      loading="lazy"
                    />
                    <span className="ap-card-category-tag">{product.category}</span>
                  </div>

                  <div className="ap-card-info">
                    <h2 className="ap-card-name">{product.name}</h2>
                    {product.description ? (
                      <p className="ap-card-desc">{product.description}</p>
                    ) : (
                      product.size && <span className="ap-card-size">{product.size}</span>
                    )}
                    <span className="ap-card-price">{product.price}</span>

                    {/* Quantity Stepper */}
                    <div className="ap-stepper" role="group" aria-label={`Quantity for ${product.name}`}>
                      <button
                        type="button"
                        className="ap-step-btn"
                        onClick={() => handleDecreaseQty(product.id)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="ap-step-num" aria-live="polite">
                        {qty}
                      </span>
                      <button
                        type="button"
                        className="ap-step-btn"
                        onClick={() => handleIncreaseQty(product.id)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart */}
                    <AddToCartButton product={product} quantity={qty} />
                  </div>
                </article>
              );
            })
          ) : (
            <div className="ap-empty-results">
              <p>No products found{searchQuery ? ` matching "${searchQuery}"` : ''}.</p>
            </div>
          )}
        </section>

        {/* ============================================================
            Pagination
            ============================================================ */}
        {totalPages > 1 && (
          <nav className="ap-pagination" aria-label="Product pagination">
            <button
              type="button"
              className={`ap-page-btn${currentPage === 1 ? ' disabled' : ''}`}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <svg viewBox="0 0 24 24" className="ap-page-arrow" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`ap-page-btn${currentPage === page ? ' active' : ''}`}
                onClick={() => goToPage(page)}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className={`ap-page-btn${currentPage === totalPages ? ' disabled' : ''}`}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <svg viewBox="0 0 24 24" className="ap-page-arrow" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </nav>
        )}

        {/* ============================================================
            Bottom Feature Strip
            ============================================================ */}
        <aside className="ap-feature-strip" aria-label="Product Quality & Guarantees">
          <div className="ap-feature-item">
            <div className="ap-feature-icon-wrap" aria-hidden="true">
              <FeatureIcon name="diamond" size={24} />
            </div>
            <div className="ap-feature-text">
              <span>Salon Grade</span>
              <span>Formulas</span>
            </div>
          </div>

          <div className="ap-feature-sep" aria-hidden="true" />

          <div className="ap-feature-item">
            <div className="ap-feature-icon-wrap" aria-hidden="true">
              <FeatureIcon name="leaf" size={24} />
            </div>
            <div className="ap-feature-text">
              <span>Gentle &</span>
              <span>Effective</span>
            </div>
          </div>

          <div className="ap-feature-sep" aria-hidden="true" />

          <div className="ap-feature-item">
            <div className="ap-feature-icon-wrap" aria-hidden="true">
              <FeatureIcon name="shield" size={24} />
            </div>
            <div className="ap-feature-text">
              <span>Dermatologically</span>
              <span>Safe</span>
            </div>
          </div>

          <div className="ap-feature-sep" aria-hidden="true" />

          <div className="ap-feature-item">
            <div className="ap-feature-icon-wrap" aria-hidden="true">
              <FeatureIcon name="people" size={24} />
            </div>
            <div className="ap-feature-text">
              <span>Trusted by</span>
              <span>Professionals</span>
            </div>
          </div>
        </aside>
      </div>


    </div>
  );
};
