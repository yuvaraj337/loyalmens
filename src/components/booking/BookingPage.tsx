import React, { useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useCart } from '../../context/CartContext';
import { findServiceByNameOrId } from '../../data/services-catalog';
import { BookingStep1Date } from './BookingStep1Date';
import { BookingStep2Time } from './BookingStep2Time';
import { BookingStep3Details } from './BookingStep3Details';
import { BookingStep4Review } from './BookingStep4Review';
import { BookingStep5Confirmed } from './BookingStep5Confirmed';
import '../../styles/booking.css';

export const BookingPage: React.FC = () => {
  const { step, setService } = useBooking();
  const { totalCount: cartCount, openDrawer } = useCart();

  // Detect service from URL search params (e.g. /booking?service=haircut-styling)
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

  return (
    <div className="booking-page">
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
          STEP CONTENT (Sequential 5-step booking flow)
          ================================================================== */}
      <main className="booking-main-content">
        {step === 1 && <BookingStep1Date />}
        {step === 2 && <BookingStep2Time />}
        {step === 3 && <BookingStep3Details />}
        {step === 4 && <BookingStep4Review />}
        {step === 5 && <BookingStep5Confirmed />}
      </main>

      {/* ==================================================================
          SHARED FOOTER (Clean Ivory / Cream palette across all steps)
          ================================================================== */}
      <footer className="booking-footer">
        <div className="booking-footer-inner">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-brand-row">
              <img src="/images/crown_logo.png" alt="Crown" className="footer-crown" />
              <div>
                <div className="footer-brand-name">RIZHEENA</div>
                <div className="footer-brand-sub">PROFESSIONAL MEN'S PARLOUR</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links-list">
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/vip">VIP</a></li>
              <li><a href="/gallery">Gallery</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="footer-links-col">
            <div className="footer-col-title">Our Services</div>
            <ul className="footer-links-list">
              <li><a href="/services/haircut-styling">Haircut &amp; Styling</a></li>
              <li><a href="/services/beard-grooming">Beard Grooming</a></li>
              <li><a href="/services/facial-skin-care">Facial &amp; Skin Care</a></li>
              <li><a href="/services/hair-colour-treatment">Hair Colour &amp; Treatment</a></li>
              <li><a href="/services">Home Service</a></li>
              <li><a href="/shop/gift-sets">Gift Sets</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="footer-social-col">
            <div className="footer-col-title">Follow Us</div>
            <div className="footer-social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Script Tagline */}
          <div className="footer-script-col">
            <div className="footer-script-text">
              Good Hair<br />Better Mood
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="footer-bottom-row">
          <div>&copy; 2026 Rizheena Professional. All rights reserved.</div>
          <div className="footer-legal-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <span>|</span>
            <a href="/terms">Terms &amp; Conditions</a>
            <span>|</span>
            <a href="/refund-policy">Refund Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
