import React, { useState } from 'react';
import '../../styles/rizheena-shop.css';

interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  size: string;
}

interface CategoryCard {
  id: string;
  title: string;
  image: string;
  products: ProductItem[];
}

const CATEGORIES_DATA: CategoryCard[] = [
  {
    id: 'hair-care',
    title: 'Hair Care',
    image: '/images/shop/category_01_hair_care.jpg',
    products: [
      {
        id: 'p1',
        name: 'Rizheena Strength & Nourish Shampoo',
        category: 'Hair Care',
        description: 'Botanical keratin formula infused with argan oil to strengthen follicles, reduce breakage & revive natural shine.',
        price: '₹899',
        size: '300 ml',
      },
      {
        id: 'p2',
        name: 'Revitalizing Scalp Tonic',
        category: 'Hair Care',
        description: 'Cooling menthol & caffeine elixir that stimulates microcirculation and promotes healthy root growth.',
        price: '₹1,099',
        size: '150 ml',
      },
      {
        id: 'p3',
        name: 'Deep Conditioning Hair Masque',
        category: 'Hair Care',
        description: 'Intense hydration treatment for damaged or chemically-treated hair. Restores silky smooth texture.',
        price: '₹1,249',
        size: '200 g',
      },
    ],
  },
  {
    id: 'face-care',
    title: 'Face Care',
    image: '/images/shop/category_02_face_care.jpg',
    products: [
      {
        id: 'p4',
        name: 'Rizheena Deep Cleanse Face Wash',
        category: 'Face Care',
        description: 'Activated charcoal and tea tree cleansing gel to remove excess sebum, unclog pores & energize tired skin.',
        price: '₹649',
        size: '100 ml',
      },
      {
        id: 'p5',
        name: 'Hydra-Defense Daily Face Cream',
        category: 'Face Care',
        description: 'Ultra-lightweight moisturizer with hyaluronic acid and niacinamide for all-day hydration without shine.',
        price: '₹849',
        size: '50 g',
      },
      {
        id: 'p6',
        name: 'Exfoliating Walnut Face Scrub',
        category: 'Face Care',
        description: 'Gentle micro-granule exfoliator that sweeps away dead cells and prepares skin for a closer shave.',
        price: '₹699',
        size: '100 g',
      },
    ],
  },
  {
    id: 'beard-care',
    title: 'Beard Care',
    image: '/images/shop/category_03_beard_care.jpg',
    products: [
      {
        id: 'p7',
        name: 'Rizheena Royal Beard Oil',
        category: 'Beard Care',
        description: 'Nourishing blend of jojoba, sweet almond and cedarwood oils to soften coarse whiskers and tame flyaways.',
        price: '₹799',
        size: '30 ml',
      },
      {
        id: 'p8',
        name: 'Sculpting Beard Butter & Balm',
        category: 'Beard Care',
        description: 'Shea butter and beeswax formula providing flexible hold, deep conditioning, and a subtle sandalwood scent.',
        price: '₹749',
        size: '60 g',
      },
      {
        id: 'p9',
        name: 'Beard Conditioning Wash',
        category: 'Beard Care',
        description: 'Sulfate-free cleanser formulated specifically for facial hair. Prevents beard itch and skin dryness.',
        price: '₹599',
        size: '120 ml',
      },
    ],
  },
  {
    id: 'professional-kits',
    title: 'Professional Kits',
    image: '/images/shop/category_04_professional_kits.jpg',
    products: [
      {
        id: 'p10',
        name: 'The Master Barber Shave Kit',
        category: 'Professional Kits',
        description: 'Includes traditional straight razor, badger hair brush, botanical shave cream, and calming aftershave balm.',
        price: '₹2,799',
        size: '4-Piece Set',
      },
      {
        id: 'p11',
        name: 'Executive Daily Grooming Collection',
        category: 'Professional Kits',
        description: 'Full regimen kit: Hair Shampoo, Face Wash, Beard Oil, Matte Pomade & signature comb in leather toiletry bag.',
        price: '₹3,499',
        size: '5-Piece Kit',
      },
    ],
  },
  {
    id: 'special-care',
    title: 'Special Care',
    image: '/images/shop/category_05_special_care.jpg',
    products: [
      {
        id: 'p12',
        name: 'Rizheena Matte Finish Hair Wax',
        category: 'Special Care',
        description: 'Strong reworkable hold with zero grease and an effortless natural matte texture that lasts all day.',
        price: '₹699',
        size: '100 g',
      },
      {
        id: 'p13',
        name: 'Anti-Dandruff Active Serum',
        category: 'Special Care',
        description: 'Targeted scalp clarifying serum with zinc pyrithione and salicylic acid to eliminate flakes permanently.',
        price: '₹899',
        size: '50 ml',
      },
      {
        id: 'p14',
        name: 'Thermal Protection Styling Spray',
        category: 'Special Care',
        description: 'Shields hair against blow-dryer heat up to 230°C while adding subtle volume and natural movement.',
        price: '₹799',
        size: '150 ml',
      },
    ],
  },
  {
    id: 'gift-sets',
    title: 'Gift Sets',
    image: '/images/shop/category_06_gift_sets.jpg',
    products: [
      {
        id: 'p15',
        name: 'The Crown Luxury Gift Box',
        category: 'Gift Sets',
        description: 'Signature luxury black gift box with gold foil crown emblem, containing our 4 bestselling grooming essentials.',
        price: '₹3,999',
        size: 'Luxury Set',
      },
      {
        id: 'p16',
        name: 'Gentleman’s Travel Hamper',
        category: 'Gift Sets',
        description: 'TSA-compliant travel-sized grooming essentials packaged in an embossed vegan leather wash bag.',
        price: '₹2,299',
        size: 'Travel Set',
      },
    ],
  },
];

export const RizheenaShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryCard | null>(null);

  const handleOpenCategory = (cat: CategoryCard) => {
    if (
      cat.id === 'hair-care' ||
      cat.id === 'face-care' ||
      cat.id === 'beard-care' ||
      cat.id === 'professional-kits' ||
      cat.id === 'special-care' ||
      cat.id === 'gift-sets'
    ) {
      window.history.pushState({}, '', `/shop/${cat.id}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSelectedCategory(cat);
  };

  const handleOpenAllProducts = () => {
    window.history.pushState({}, '', '/shop/all-products');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="rizheena-shop-page" id="rizheena-shop-page">
      <div className="shop-page-container">
        {/* ==================================================================
            1. TOP HERO SECTION
            ================================================================== */}
        <section className="shop-hero-section" aria-label="Rizheena Shop Hero">
          {/* Left Column: Eyebrow, 3-Line Heading, Description, CTA, Benefit Row */}
          <div className="shop-hero-left">
            <div className="shop-eyebrow-row">
              <span className="shop-eyebrow-text">RIZHEENA SHOP</span>
              <span className="shop-eyebrow-line" />
            </div>

            <h1 className="shop-main-heading">
              <span className="shop-heading-line">Premium Care</span>
              <span className="shop-heading-line">For Your Everyday</span>
              <span className="shop-heading-line shop-heading-accent">Rituals</span>
            </h1>

            <p className="shop-hero-description">
              Professional-grade grooming products,
              <br />
              now at your fingertips.
            </p>

            <button
              type="button"
              className="shop-now-btn"
              onClick={handleOpenAllProducts}
              aria-label="Shop now - View all products"
            >
              <span>SHOP NOW</span>
              <span aria-hidden="true">→</span>
            </button>

            {/* Benefit Row: 4 Items with Icons & Separators */}
            <div className="shop-benefits-row">
              <div className="shop-benefit-item">
                <div className="shop-benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div className="shop-benefit-text">
                  <span>Premium</span>
                  <span>Quality</span>
                </div>
              </div>

              <div className="shop-benefit-separator" />

              <div className="shop-benefit-item">
                <div className="shop-benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div className="shop-benefit-text">
                  <span>Trusted by</span>
                  <span>Professionals</span>
                </div>
              </div>

              <div className="shop-benefit-separator" />

              <div className="shop-benefit-item">
                <div className="shop-benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div className="shop-benefit-text">
                  <span>Pan India</span>
                  <span>Delivery</span>
                </div>
              </div>

              <div className="shop-benefit-separator" />

              <div className="shop-benefit-item">
                <div className="shop-benefit-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="21 8 21 21 3 21 3 8" />
                    <rect x="1" y="3" width="22" height="5" />
                    <line x1="10" y1="12" x2="14" y2="12" />
                  </svg>
                </div>
                <div className="shop-benefit-text">
                  <span>Secure</span>
                  <span>Packaging</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image (Image 3) */}
          <div className="shop-hero-right">
            <div className="shop-hero-image-wrapper">
              <img
                src="/images/shop/hero_products.jpg"
                alt="Rizheena Professional Grooming Products Collection"
                className="shop-hero-img"
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* ==================================================================
            2. SHOP BY CATEGORY SECTION
            ================================================================== */}
        <section className="shop-category-section" aria-label="Shop by Category">
          <div className="shop-category-header-row">
            <div className="shop-category-title-wrap">
              <h2 className="shop-category-heading">SHOP BY CATEGORY</h2>
              <span className="shop-category-line" />
            </div>

            <button
              type="button"
              className="shop-view-all-btn"
              onClick={handleOpenAllProducts}
            >
              <span>VIEW ALL PRODUCTS</span>
              <div className="shop-arrow-circle" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </button>
          </div>

          {/* 6 Category Cards in one horizontal row */}
          <div className="shop-category-grid">
            {CATEGORIES_DATA.map((cat) => (
              <article
                key={cat.id}
                className="shop-category-card"
                onClick={() => handleOpenCategory(cat)}
                tabIndex={0}
                role="button"
                aria-label={`View ${cat.title} category`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleOpenCategory(cat);
                  }
                }}
              >
                <div className="shop-category-img-wrap">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="shop-category-img"
                    loading="lazy"
                  />
                </div>
                <div className="shop-category-content">
                  <span className="shop-category-title">{cat.title}</span>
                  <div className="shop-category-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ==================================================================
            3. BOTTOM EDITORIAL STRIP
            ================================================================== */}
        <div className="shop-bottom-strip" role="complementary" aria-label="Customer Trust and Philosophy">
          <span className="shop-bottom-motto">REAL CARE. REAL RESULTS.</span>

          <div className="shop-bottom-separator" />

          <div className="shop-bottom-customers">
            <img
              src="/images/shop/customer_avatars.png"
              alt="Happy Customers Avatars"
              className="shop-avatars-img"
            />
            <div className="shop-customers-label">
              <span className="shop-customers-count">10K+</span>
              <span className="shop-customers-sub">Happy Customers</span>
            </div>
          </div>

          <div className="shop-bottom-separator" />

          <div className="shop-bottom-quote-wrap">
            <blockquote className="shop-bottom-quote-text">
              “The same professional care you trust, now at home.”
            </blockquote>
            <span className="shop-bottom-quote-line" />
          </div>
        </div>
      </div>

      {/* ==================================================================
          4. INTERACTIVE PRODUCT CATALOG MODAL
          ================================================================== */}
      {selectedCategory && (
        <div
          className="shop-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCategory.title}
        >
          <div className="shop-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="shop-modal-close-btn"
              onClick={closeModal}
              aria-label="Close product modal"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="shop-modal-header">
              <span className="shop-modal-eyebrow">RIZHEENA SHOP • {selectedCategory.title}</span>
              <h3 className="shop-modal-title">{selectedCategory.title}</h3>
            </div>

            <div className="shop-modal-products-grid">
              {selectedCategory.products.map((p) => (
                <div key={p.id} className="shop-product-card">
                  <div>
                    <h4 className="shop-product-name">{p.name}</h4>
                    <p className="shop-product-desc">{p.description}</p>
                  </div>
                  <div className="shop-product-bottom-row">
                    <div>
                      <span className="shop-product-price">{p.price}</span>
                      <span style={{ fontSize: '11px', color: '#888', marginLeft: '6px' }}>({p.size})</span>
                    </div>
                    <button
                      type="button"
                      className="shop-product-buy-btn"
                      onClick={() => alert(`Added "${p.name}" to cart!`)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                className="shop-now-btn"
                onClick={closeModal}
                style={{ fontSize: '11px', padding: '10px 26px', margin: 0 }}
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
