import React, { useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useCart } from '../../context/CartContext';
import { findServiceByNameOrId } from '../../data/services-catalog';
import { BookingStep1DateTime } from './BookingStep1DateTime';
import { BookingStep2Details } from './BookingStep2Details';
import { BookingStep3Review } from './BookingStep3Review';
import { BookingStep4Confirmed } from './BookingStep4Confirmed';
import '../../styles/booking.css';

export const BookingPage: React.FC = () => {
  const { step, setService } = useBooking();
  const { totalCount: cartCount, openDrawer } = useCart();

  // Detect service from URL search params (e.g. /booking?service=Beard%20Trimming)
  useEffect(() => {
    const syncService = () => {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get('service');
      if (serviceParam) {
        const resolved = findServiceByNameOrId(serviceParam);
        setService(resolved);
      }
    };
    syncService();
    window.addEventListener('popstate', syncService);
    return () => window.removeEventListener('popstate', syncService);
  }, [setService]);

  const isDarkStep = step === 4;

  return (
    <div className={`booking-page ${isDarkStep ? 'booking-page--dark' : ''}`}>
      {/* ==================================================================
          TOP NAVIGATION HEADER (Exact reference styling)
          ================================================================== */}
      <header className="booking-header">
        {/* Brand */}
        <a href="/" className="booking-brand" aria-label="Rizheena Home">
          <img src="/images/crown_logo.png" alt="Crown Logo" className="booking-brand-crown" />
          <div className="booking-brand-text">
            <span className="booking-brand-name">RIZHEENA</span>
            <span className="booking-brand-sub">PROFESSIONAL MEN'S PARLOUR</span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav aria-label="Primary Navigation">
          <ul className="booking-nav-links">
            <li><a href="/" className="booking-nav-link">Home</a></li>
            <li><a href="/services" className="booking-nav-link active">Services</a></li>
            <li><a href="/shop" className="booking-nav-link">Shop</a></li>
            <li><a href="/vip" className="booking-nav-link">VIP</a></li>
            <li><a href="/gallery" className="booking-nav-link">Gallery</a></li>
            <li><a href="/contact" className="booking-nav-link">Contact</a></li>
          </ul>
        </nav>

        {/* Actions: Search, Cart with badge, Book Now */}
        <div className="booking-header-actions">
          <button type="button" className="booking-icon-btn" aria-label="Search services">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          <button
            type="button"
            className="booking-icon-btn"
            onClick={openDrawer}
            aria-label={`Cart (${cartCount} items)`}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="booking-header-cart-badge">{cartCount}</span>
          </button>

          <a href="/booking" className="booking-header-book-btn">
            <span>Book Now</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </header>

      {/* ==================================================================
          STEP CONTENT
          ================================================================== */}
      <main style={{ flex: 1 }}>
        {step === 1 && <BookingStep1DateTime />}
        {step === 2 && <BookingStep2Details />}
        {step === 3 && <BookingStep3Review />}
        {step === 4 && <BookingStep4Confirmed />}
      </main>

      {/* ==================================================================
          SHARED FOOTER (Light or Dark themed depending on step)
          ================================================================== */}
      <footer
        style={{
          borderTop: isDarkStep ? '1px solid rgba(212, 175, 55, 0.15)' : '1px solid #EBE4DA',
          background: isDarkStep ? '#080706' : '#F8F4EC',
          color: isDarkStep ? '#FFFFFF' : '#1A1A1A',
          padding: '40px 32px 24px 32px',
        }}
      >
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1.2fr',
            gap: '32px',
            marginBottom: '32px',
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <img src="/images/crown_logo.png" alt="Crown" style={{ width: '32px' }} />
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '15px' }}>RIZHEENA</div>
                <div style={{ fontSize: '8px', letterSpacing: '0.14em', color: isDarkStep ? '#D4AF37' : '#888' }}>
                  PROFESSIONAL MEN'S PARLOUR
                </div>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: isDarkStep ? '#9C9588' : '#666', lineHeight: 1.5 }}>
              Precision haircutting, bespoke beard styling and luxury grooming for the modern gentleman.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '14px', color: isDarkStep ? '#D4AF37' : '#443224' }}>
              QUICK LINKS
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li><a href="/" style={{ color: isDarkStep ? '#C4BEB3' : '#555', textDecoration: 'none' }}>Home</a></li>
              <li><a href="/services" style={{ color: isDarkStep ? '#C4BEB3' : '#555', textDecoration: 'none' }}>Services</a></li>
              <li><a href="/shop" style={{ color: isDarkStep ? '#C4BEB3' : '#555', textDecoration: 'none' }}>Shop</a></li>
              <li><a href="/vip" style={{ color: isDarkStep ? '#C4BEB3' : '#555', textDecoration: 'none' }}>VIP</a></li>
              <li><a href="/gallery" style={{ color: isDarkStep ? '#C4BEB3' : '#555', textDecoration: 'none' }}>Gallery</a></li>
              <li><a href="/contact" style={{ color: isDarkStep ? '#C4BEB3' : '#555', textDecoration: 'none' }}>Contact</a></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '14px', color: isDarkStep ? '#D4AF37' : '#443224' }}>
              OUR SERVICES
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li><a href="/services/haircut-styling" style={{ color: isDarkStep ? '#C4BEB3' : '#555', textDecoration: 'none' }}>Haircut &amp; Styling</a></li>
              <li><a href="/services/beard-grooming" style={{ color: isDarkStep ? '#C4BEB3' : '#555', textDecoration: 'none' }}>Beard Grooming</a></li>
              <li><a href="/services/facial-skin-care" style={{ color: isDarkStep ? '#C4BEB3' : '#555', textDecoration: 'none' }}>Facial &amp; Skin Care</a></li>
              <li><a href="/services/hair-colour-treatment" style={{ color: isDarkStep ? '#C4BEB3' : '#555', textDecoration: 'none' }}>Hair Colour &amp; Treatment</a></li>
              <li><a href="/services" style={{ color: isDarkStep ? '#C4BEB3' : '#555', textDecoration: 'none' }}>Home Service</a></li>
              <li><a href="/shop/gift-sets" style={{ color: isDarkStep ? '#C4BEB3' : '#555', textDecoration: 'none' }}>Gift Sets</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '14px', color: isDarkStep ? '#D4AF37' : '#443224' }}>
              FOLLOW US
            </div>
            <div style={{ display: 'flex', gap: '12px', color: isDarkStep ? '#C4BEB3' : '#444' }}>
              <span>Instagram</span>
              <span>WhatsApp</span>
            </div>
          </div>

          {/* Script Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div
              style={{
                fontFamily: "var(--font-script, 'Alex Brush', cursive)",
                fontSize: '36px',
                color: isDarkStep ? '#E2B870' : '#8E6F45',
                transform: 'rotate(-6deg)',
                lineHeight: 1.1,
              }}
            >
              Good Hair<br />Better Mood
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            paddingTop: '20px',
            borderTop: isDarkStep ? '1px solid rgba(212, 175, 55, 0.1)' : '1px solid #EAE3D8',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: isDarkStep ? '#7E7668' : '#888',
          }}
        >
          <div>&copy; 2026 Rizheena Professional. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
            <span>Refund Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
