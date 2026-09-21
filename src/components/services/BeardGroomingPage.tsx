import React from 'react';
import '../../styles/haircut-styling.css';

interface ServiceItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  thumb: string;
}

const BEARD_SERVICES: ServiceItem[] = [
  {
    id: 'b1',
    name: 'Beard Trimming',
    desc: 'Neat and defined, always on point.',
    price: '₹99',
    thumb: '/images/beard/thumb_01.jpg',
  },
  {
    id: 'b2',
    name: 'Beard Styling',
    desc: 'Shape your beard to match your look.',
    price: '₹199',
    thumb: '/images/beard/thumb_02.jpg',
  },
  {
    id: 'b3',
    name: 'Beard Spa',
    desc: 'Deep care for a healthier, stronger beard.',
    price: '₹299',
    thumb: '/images/beard/thumb_03.jpg',
  },
  {
    id: 'b4',
    name: 'Beard Lining',
    desc: 'Clean edges for a sharp, clean look.',
    price: '₹149',
    thumb: '/images/beard/thumb_04.jpg',
  },
];

export const BeardGroomingPage: React.FC = () => {
  return (
    <div className="haircut-page" id="beard-grooming-page">
      {/* ==================================================================
          1. LIGHT LUXURY HEADER
          ================================================================== */}
      <header className="haircut-header">
        <a href="/" className="haircut-header-brand" aria-label="Rizheena Home">
          <svg className="haircut-header-crown" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 22h28v2H4zM5 19l4-13 6 7 3-9 3 9 6-7 4 13H5z" />
          </svg>
          <div className="haircut-header-brand-text">
            <span className="haircut-header-brand-title">RIZHEENA</span>
            <span className="haircut-header-brand-sub">PROFESSIONAL MEN'S PARLOUR</span>
          </div>
        </a>

        <nav className="haircut-header-nav" aria-label="Main Navigation">
          <a href="/" className="haircut-header-nav-link">Home</a>
          <a href="/services" className="haircut-header-nav-link active">Services</a>
          <a href="/shop" className="haircut-header-nav-link">Shop</a>
          <a href="/#vip" className="haircut-header-nav-link">VIP</a>
          <a href="/#gallery" className="haircut-header-nav-link">Gallery</a>
          <a href="/#contact" className="haircut-header-nav-link">Contact</a>
        </nav>

        <div className="haircut-header-actions">
          <button type="button" className="haircut-header-icon-btn" aria-label="Search services">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <a href="/shop" className="haircut-header-icon-btn" aria-label="Cart (0 items)">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="haircut-cart-badge">0</span>
          </a>

          <a href="/booking?service=Beard%20Grooming" className="haircut-header-book-btn">
            <span>Book Now</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </header>

      <main className="haircut-container">
        {/* ==================================================================
            2. BREADCRUMB
            ================================================================== */}
        <nav className="category-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="category-breadcrumb-sep">&gt;</span>
          <a href="/services">Services</a>
          <span className="category-breadcrumb-sep">&gt;</span>
          <span className="category-breadcrumb-current">Beard Grooming</span>
        </nav>

        {/* ==================================================================
            3. HERO SECTION
            ================================================================== */}
        <section className="haircut-hero-section" aria-label="Beard Grooming Introduction">
          <div className="haircut-hero-grid">
            {/* Left Hero Column */}
            <div className="haircut-hero-left">
              <span className="haircut-hero-eyebrow">BEARD GROOMING</span>
              <h1 className="haircut-hero-heading">
                <span className="haircut-heading-line">
                  Beard <span className="haircut-heading-accent">Grooming</span>
                </span>
              </h1>
              <p className="haircut-hero-desc">
                Sharp Styles. Stronger You.<br />
                A beard that speaks confidence.
              </p>

              <div className="haircut-hero-editorial-line">
                PRECISION | STYLE | EXPERT CARE
              </div>

              {/* Inline Hero Benefits */}
              <div className="hero-inline-benefits">
                <div className="hero-inline-benefit-item">
                  <span className="hero-inline-benefit-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="6" cy="6" r="3" />
                      <circle cx="6" cy="18" r="3" />
                      <line x1="20" y1="4" x2="8.12" y2="15.88" />
                      <line x1="14.47" y1="14.48" x2="20" y2="20" />
                      <line x1="8.12" y1="8.12" x2="12" y2="12" />
                    </svg>
                  </span>
                  <span className="hero-inline-benefit-text">
                    <span>Expert</span>
                    <span>Stylists</span>
                  </span>
                </div>

                <div className="hero-inline-benefit-item">
                  <span className="hero-inline-benefit-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  </span>
                  <span className="hero-inline-benefit-text">
                    <span>Hygiene</span>
                    <span>First</span>
                  </span>
                </div>

                <div className="hero-inline-benefit-item">
                  <span className="hero-inline-benefit-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12l4 7-10 11L2 10l4-7z" />
                      <path d="M2 10h20" />
                      <path d="M12 21L8 10l4-7 4 7-4 11z" />
                    </svg>
                  </span>
                  <span className="hero-inline-benefit-text">
                    <span>Premium</span>
                    <span>Products</span>
                  </span>
                </div>

                <div className="hero-inline-benefit-item">
                  <span className="hero-inline-benefit-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <span className="hero-inline-benefit-text">
                    <span>Personalized</span>
                    <span>Care</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Column */}
            <div className="haircut-hero-right">
              <div className="haircut-hero-img-wrap">
                <img
                  src="/images/beard/hero_beard_photo.jpg"
                  alt="Precision Beard Grooming at Rizheena"
                  className="haircut-hero-photo"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. OUR BEARD SERVICES SECTION
            ================================================================== */}
        <section className="haircut-services-section" aria-label="Our Beard Services Menu">
          <div className="haircut-services-header">
            <div className="haircut-services-title-col">
              <span className="haircut-services-eyebrow">OUR BEARD SERVICES</span>
              <div className="haircut-services-heading-row">
                <h2 className="haircut-services-heading">Our Beard Services</h2>
                <span className="haircut-services-heading-line" />
              </div>
              <p className="haircut-services-subtitle">
                Crafted for modern men. Styled for every mood.
              </p>
            </div>
          </div>

          <div className="haircut-services-grid">
            {BEARD_SERVICES.map((svc) => (
              <div key={svc.id} className="haircut-service-row">
                <div className="haircut-service-left-group">
                  <img
                    src={svc.thumb}
                    alt={svc.name}
                    className="haircut-service-thumb"
                    loading="lazy"
                  />
                  <div className="haircut-service-details">
                    <span className="haircut-service-name">{svc.name}</span>
                    <span className="haircut-service-desc">{svc.desc}</span>
                  </div>
                </div>

                <div className="haircut-service-right-group">
                  <span className="haircut-service-price">{svc.price}</span>
                  <a
                    href={`/booking?service=${encodeURIComponent(svc.name)}`}
                    className="haircut-service-book-btn"
                    aria-label={`Book ${svc.name}`}
                  >
                    Book
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================
            5. LARGE BOTTOM BANNER
            ================================================================== */}
        <section className="haircut-banner-section" aria-label="Beard Care Products Banner">
          <a
            href="/shop"
            className="haircut-banner-link"
            aria-label="Explore Beard Care Products"
          >
            <img
              src="/images/beard/bottom_banner.jpg"
              alt="A Sharper You Everyday - Premium Beard Care Products"
              className="haircut-banner-img"
              loading="lazy"
            />
          </a>
        </section>
      </main>

      {/* ==================================================================
          6. LUXURY LIGHT FOOTER
          ================================================================== */}
      <footer className="haircut-footer">
        <div className="haircut-container">
          <div className="haircut-footer-top-grid">
            {/* Col 1: Brand */}
            <div className="haircut-footer-col">
              <a href="/" className="haircut-header-brand">
                <svg className="haircut-header-crown" viewBox="0 0 36 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h28v2H4zM5 19l4-13 6 7 3-9 3 9 6-7 4 13H5z" />
                </svg>
                <div className="haircut-header-brand-text">
                  <span className="haircut-header-brand-title">RIZHEENA</span>
                  <span className="haircut-header-brand-sub">PROFESSIONAL MEN'S PARLOUR</span>
                </div>
              </a>
            </div>

            {/* Col 2: Quick Links */}
            <div className="haircut-footer-col">
              <h4 className="haircut-footer-col-title">QUICK LINKS</h4>
              <ul className="haircut-footer-links-list">
                <li><a href="/" className="haircut-footer-link">Home</a></li>
                <li><a href="/services" className="haircut-footer-link">Services</a></li>
                <li><a href="/shop" className="haircut-footer-link">Shop</a></li>
                <li><a href="/#vip" className="haircut-footer-link">VIP</a></li>
                <li><a href="/#gallery" className="haircut-footer-link">Gallery</a></li>
                <li><a href="/#contact" className="haircut-footer-link">Contact</a></li>
              </ul>
            </div>

            {/* Col 3: Branches */}
            <div className="haircut-footer-col">
              <h4 className="haircut-footer-col-title">OUR BRANCHES</h4>
              <div className="haircut-footer-branches">
                <div className="haircut-branch-item">
                  <svg className="haircut-branch-pin" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <strong>Tirupati - Main Branch</strong><br />
                    <span>19-4-12, Air Bypass Road, Tirupati, AP</span>
                  </div>
                </div>

                <div className="haircut-branch-item">
                  <svg className="haircut-branch-pin" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <strong>Renigunta Branch</strong><br />
                    <span>Near Railway Station, Renigunta, AP</span>
                  </div>
                </div>

                <div className="haircut-branch-item">
                  <svg className="haircut-branch-pin" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <strong>Chittoor Branch</strong><br />
                    <span>Venkateswara Colony, Chittoor, AP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 4: Follow Us */}
            <div className="haircut-footer-col">
              <h4 className="haircut-footer-col-title">FOLLOW US</h4>
              <div className="haircut-footer-socials">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="haircut-social-icon-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="haircut-social-icon-link" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="haircut-social-icon-link" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
                <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="haircut-social-icon-link" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 5: Script note */}
            <div className="haircut-footer-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/images/haircut/stay_groomed_script.png"
                alt="Stay Groomed Stay Confident"
                className="haircut-footer-script-img"
              />
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="haircut-footer-bottom-bar">
            <span>© 2024 Rizheena Professional. All rights reserved.</span>
            <div className="haircut-footer-legal-links">
              <a href="/privacy" className="haircut-footer-legal-link">Privacy Policy</a>
              <span>|</span>
              <a href="/terms" className="haircut-footer-legal-link">Terms &amp; Conditions</a>
              <span>|</span>
              <a href="/refund" className="haircut-footer-legal-link">Refund Policy</a>
            </div>
            <div className="haircut-footer-bottom-motto">
              <span className="haircut-motto-line" />
              <span>SAME CONFIDENCE AT HOME</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BeardGroomingPage;
