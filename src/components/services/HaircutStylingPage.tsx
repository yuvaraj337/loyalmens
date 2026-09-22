import React from 'react';
import '../../styles/haircut-styling.css';

interface ServiceItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  thumb: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 's1',
    name: 'Haircut & Styling',
    desc: 'Trendy cuts tailored to your style.',
    price: '₹299 – ₹499',
    thumb: '/images/haircut/thumb_01.jpg',
  },
  {
    id: 's2',
    name: 'Beard Grooming',
    desc: 'Shape, trim and style your beard.',
    price: '₹199 – ₹399',
    thumb: '/images/haircut/thumb_02.jpg',
  },
  {
    id: 's3',
    name: 'Facial & Skin Care',
    desc: 'Rejuvenate your skin.',
    price: '₹599',
    thumb: '/images/haircut/thumb_03.jpg',
  },
  {
    id: 's4',
    name: 'Head Massage',
    desc: 'Relax and recharge.',
    price: '₹399',
    thumb: '/images/haircut/thumb_04.jpg',
  },
  {
    id: 's5',
    name: 'Hair Colouring',
    desc: 'Premium colours for a bold new you.',
    price: '₹999',
    thumb: '/images/haircut/thumb_05.jpg',
  },
  {
    id: 's6',
    name: 'Hair Smoothening',
    desc: 'Get smoother, manageable hair.',
    price: '₹1,999',
    thumb: '/images/haircut/thumb_06.jpg',
  },
  {
    id: 's7',
    name: 'Hair Spa Treatment',
    desc: 'Deep nourishment for healthier hair.',
    price: '₹799',
    thumb: '/images/haircut/thumb_07.jpg',
  },
  {
    id: 's8',
    name: 'Kids Haircut & Styling',
    desc: 'Stylish cuts for the little gentlemen.',
    price: '₹199',
    thumb: '/images/haircut/thumb_08.jpg',
  },
];

export const HaircutStylingPage: React.FC = () => {
  const isHome = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('type') === 'home';
  const typeParam = isHome ? '&type=home' : '';

  return (
    <div className="haircut-page" id="haircut-styling-page">
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

          <a href={`/booking?service=Haircut%20%26%20Styling${typeParam}`} className="haircut-header-book-btn">
            <span>Book Now</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </header>

      {/* ==================================================================
          2. HERO SECTION
          ================================================================== */}
      <main className="haircut-container">
        <section className="haircut-hero-section" aria-label="Haircut & Styling Introduction">
          <div className="haircut-hero-grid">
            {/* Left Hero Column */}
            <div className="haircut-hero-left">
              <span className="haircut-hero-eyebrow">MODERN GROOMING</span>
              <h1 className="haircut-hero-heading">
                <span className="haircut-heading-line">Haircut &amp;</span>
                <span className="haircut-heading-line haircut-heading-accent">Styling</span>
              </h1>
              <p className="haircut-hero-desc">
                Precision cuts. Modern styles.<br />
                A sharper you, every time.
              </p>
              <a href={`/booking?service=Haircut%20%26%20Styling${typeParam}`} className="haircut-book-cta-btn">
                <span>Book Your Appointment</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Right Hero Column */}
            <div className="haircut-hero-right">
              <div className="haircut-hero-img-wrap">
                <img
                  src="/images/haircut/hero_haircut_photo.jpg"
                  alt="Modern Haircut and Styling Experience at Rizheena"
                  className="haircut-hero-photo"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. BENEFIT STRIP
            ================================================================== */}
        <section className="haircut-benefit-strip" aria-label="Brand Benefits">
          <div className="haircut-tagline-motto">
            STYLE GROOM CONFIDENCE
          </div>

          <div className="haircut-benefit-items-row">
            {/* 1. Crown - Expert Stylists */}
            <div className="haircut-benefit-item">
              <span className="haircut-benefit-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19h16v2H4zM4 16l3-9 5 5 5-5 3 9H4z" />
                </svg>
              </span>
              <span className="haircut-benefit-text">
                <span>Expert</span>
                <span>Stylists</span>
              </span>
            </div>

            {/* 2. Shield - Premium Products */}
            <div className="haircut-benefit-item">
              <span className="haircut-benefit-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </span>
              <span className="haircut-benefit-text">
                <span>Premium</span>
                <span>Products</span>
              </span>
            </div>

            {/* 3. Diamond - Hygienic Environment */}
            <div className="haircut-benefit-item">
              <span className="haircut-benefit-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12l4 7-10 11L2 10l4-7z" />
                  <path d="M2 10h20" />
                  <path d="M12 21L8 10l4-7 4 7-4 11z" />
                </svg>
              </span>
              <span className="haircut-benefit-text">
                <span>Hygienic</span>
                <span>Environment</span>
              </span>
            </div>

            {/* 4. Armchair - Relaxing Ambience */}
            <div className="haircut-benefit-item">
              <span className="haircut-benefit-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 19v2M17 19v2M4 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6H4v-6z" />
                  <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
                  <path d="M3 14h2M19 14h2" />
                </svg>
              </span>
              <span className="haircut-benefit-text">
                <span>Relaxing</span>
                <span>Ambience</span>
              </span>
            </div>

            {/* 5. Personalised Care */}
            <div className="haircut-benefit-item">
              <span className="haircut-benefit-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              <span className="haircut-benefit-text">
                <span>Personalised</span>
                <span>Care</span>
              </span>
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. OUR HAIR SERVICES SECTION
            ================================================================== */}
        <section className="haircut-services-section" aria-label="Our Hair Services Menu">
          <div className="haircut-services-header">
            <div className="haircut-services-title-col">
              <span className="haircut-services-eyebrow">OUR SERVICES</span>
              <div className="haircut-services-heading-row">
                <h2 className="haircut-services-heading">
                  <span className="haircut-heading-line-1">Our Hair </span>
                  <span className="haircut-heading-line-2">
                    <span>Services</span>
                    <span className="haircut-services-heading-line" />
                  </span>
                </h2>
              </div>
              <p className="haircut-services-subtitle haircut-desktop-subtitle">
                Premium grooming solutions for the modern man.
              </p>
            </div>

            <div className="haircut-services-meta-row">
              <p className="haircut-services-subtitle haircut-mobile-subtitle">
                Premium grooming solutions for the<br />modern man.
              </p>

              <a href="/services" className="haircut-view-all-link">
                <span className="haircut-view-all-text">
                  <span>View All</span>
                  <span>Services</span>
                </span>
                <span className="haircut-view-all-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="haircut-services-grid">
            {SERVICES_DATA.map((svc) => (
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

                <div className="haircut-service-divider-line" />

                <div className="haircut-service-right-group">
                  <span className="haircut-service-price">{svc.price}</span>
                  <a
                    href={`/booking?service=${encodeURIComponent(svc.name)}${typeParam}`}
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

export default HaircutStylingPage;
