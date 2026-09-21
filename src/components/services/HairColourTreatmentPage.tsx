import React from 'react';
import '../../styles/haircut-styling.css';

interface ServiceItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  thumb: string;
}

const COLOUR_SERVICES: ServiceItem[] = [
  {
    id: 'c1',
    name: 'Hair Dye',
    desc: 'Rich colour, bold look.',
    price: '₹350 – ₹700',
    thumb: '/images/colour/thumb_01.jpg',
  },
  {
    id: 'c2',
    name: 'Hair Highlighting',
    desc: 'Add dimension to your style.',
    price: '₹1,000 – ₹1,800',
    thumb: '/images/colour/thumb_04.jpg',
  },
  {
    id: 'c3',
    name: 'Hair Straightening',
    desc: 'Sleek and smooth for a fresh look.',
    price: '₹1,500 – ₹3,000',
    thumb: '/images/colour/thumb_02.jpg',
  },
  {
    id: 'c4',
    name: 'Hair Spa',
    desc: 'Nourish and revive your hair.',
    price: '₹799 – ₹1,200',
    thumb: '/images/colour/thumb_05.jpg',
  },
  {
    id: 'c5',
    name: 'Hair Smoothening',
    desc: 'Frizz-free, effortless style.',
    price: '₹1,500 – ₹3,000',
    thumb: '/images/colour/thumb_03.jpg',
  },
  {
    id: 'c6',
    name: 'Hair Keratin Treatment',
    desc: 'Long-lasting smoothness.',
    price: '₹2,000 – ₹4,000',
    thumb: '/images/colour/thumb_06.jpg',
  },
];

export const HairColourTreatmentPage: React.FC = () => {
  return (
    <div className="haircut-page" id="hair-colour-treatment-page">
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

          <a href="/booking?service=Hair%20Colour%20%26%20Treatment" className="haircut-header-book-btn">
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
          <span className="category-breadcrumb-current">Hair Colour &amp; Treatment</span>
        </nav>

        {/* ==================================================================
            3. HERO SECTION
            ================================================================== */}
        <section className="haircut-hero-section" aria-label="Hair Colour & Treatment Introduction">
          <div className="haircut-hero-grid">
            {/* Left Hero Column */}
            <div className="haircut-hero-left">
              <span className="haircut-hero-eyebrow">HAIR COLOUR &amp; TREATMENT</span>
              <h1 className="haircut-hero-heading">
                <span className="haircut-heading-line">Hair Colour &amp;</span>
                <span className="haircut-heading-line haircut-heading-accent">Treatment</span>
              </h1>
              <p className="haircut-hero-desc">
                Express your style.<br />
                Your hair, our care.
              </p>

              <div className="haircut-hero-editorial-line">
                COLOUR | CARE | CONFIDENCE
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
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.5 1.5 8.5C19.5 16 16 20 11 20z" />
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
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
                  src="/images/colour/hero_colour_photo.jpg"
                  alt="A Bolder You In Every Shade - Hair Colour & Treatment"
                  className="haircut-hero-photo"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. OUR COLOUR & TREATMENT SERVICES SECTION
            ================================================================== */}
        <section className="haircut-services-section" aria-label="Our Colour & Treatment Services Menu">
          <div className="haircut-services-header">
            <div className="haircut-services-title-col">
              <span className="haircut-services-eyebrow">OUR COLOUR &amp; TREATMENT SERVICES</span>
              <div className="haircut-services-heading-row">
                <h2 className="haircut-services-heading">Our Colour &amp; Treatment Services</h2>
                <span className="haircut-services-heading-line" />
              </div>
              <p className="haircut-services-subtitle">
                Premium hair colouring and treatment solutions for the modern man.
              </p>
            </div>
          </div>

          <div className="haircut-services-grid">
            {COLOUR_SERVICES.map((svc) => (
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



      </main>

      {/* ==================================================================
          6. LUXURY LIGHT FOOTER (COLOUR VARIANT)
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

            {/* Col 3: Our Services */}
            <div className="haircut-footer-col">
              <h4 className="haircut-footer-col-title">OUR SERVICES</h4>
              <ul className="haircut-footer-links-list">
                <li><a href="/services/haircut-styling" className="haircut-footer-link">Haircut &amp; Styling</a></li>
                <li><a href="/services/beard-grooming" className="haircut-footer-link">Beard Grooming</a></li>
                <li><a href="/services/facial-skin-care" className="haircut-footer-link">Facial &amp; Skin Care</a></li>
                <li><a href="/services/hair-colour-treatment" className="haircut-footer-link">Hair Colour &amp; Treatment</a></li>
                <li><a href="/services" className="haircut-footer-link">Home Service</a></li>
                <li><a href="/shop" className="haircut-footer-link">Gift Sets</a></li>
              </ul>
            </div>

            {/* Col 4: Stay Connected */}
            <div className="haircut-footer-col">
              <h4 className="haircut-footer-col-title">STAY CONNECTED</h4>
              <div className="haircut-footer-socials">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="haircut-social-icon-link" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="haircut-social-icon-link" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="haircut-social-icon-link" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="haircut-social-icon-link" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 5: Script note "Good Hair Better Mood" */}
            <div className="haircut-footer-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/images/facial/good_hair_script.png"
                alt="Good Hair Better Mood"
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

export default HairColourTreatmentPage;
