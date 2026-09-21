import React, { useEffect } from 'react';
import { useCheckout } from '../../../context/CheckoutContext';
import { useCart } from '../../../context/CartContext';
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';
import { CheckoutProgressBar } from './CheckoutProgressBar';
import { CheckoutStep1Delivery } from './CheckoutStep1Delivery';
import { CheckoutStep2Review } from './CheckoutStep2Review';
import { CheckoutStep3Confirmation } from './CheckoutStep3Confirmation';
import { CustomerOrdersModal } from './CustomerOrdersModal';
import '../../../styles/checkout.css';

export const CheckoutPage: React.FC = () => {
  const { step, goToStep } = useCheckout();
  const { totalCount, openDrawer } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step]);

  return (
    <div className="checkout-page-root">
      {/* ==================================================================
          TOP NAVIGATION HEADER (Exact reference styling)
          ================================================================== */}
      <header className="checkout-header">
        <a href="/" className="checkout-brand" aria-label="Rizheena Home">
          <img src="/images/crown_logo.png" alt="Crown Logo" className="checkout-brand-crown" />
          <div className="checkout-brand-text">
            <span className="checkout-brand-name">RIZHEENA</span>
            <span className="checkout-brand-sub">PROFESSIONAL MEN'S PARLOUR</span>
          </div>
        </a>

        <nav aria-label="Primary Navigation">
          <ul className="checkout-nav-links">
            <li><a href="/" className="checkout-nav-link">Home</a></li>
            <li><a href="/services" className="checkout-nav-link">Services</a></li>
            <li><a href="/shop" className="checkout-nav-link active">Shop</a></li>
            <li><a href="/vip" className="checkout-nav-link">VIP</a></li>
            <li><a href="/gallery" className="checkout-nav-link">Gallery</a></li>
            <li><a href="/contact" className="checkout-nav-link">Contact</a></li>
          </ul>
        </nav>

        <div className="checkout-header-actions">
          <button type="button" className="checkout-icon-btn" aria-label="Search">
            <Search size={18} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            className="checkout-icon-btn"
            onClick={openDrawer}
            aria-label={`Shopping cart with ${totalCount} items`}
          >
            <ShoppingBag size={18} strokeWidth={1.8} />
            <span className="checkout-cart-badge">{totalCount}</span>
          </button>

          <a href="/booking" className="checkout-book-btn">
            <span>Book Now</span>
            <ArrowRight size={14} strokeWidth={2.2} />
          </a>
        </div>
      </header>

      {/* ==================================================================
          SUBHEADER: BREADCRUMBS & TAGLINE
          ================================================================== */}
      <div className="checkout-subheader">
        <nav className="checkout-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span aria-hidden="true">&gt;</span>
          <a href="/shop">Checkout</a>
          <span aria-hidden="true">&gt;</span>
          <span className="current">
            {step === 1 && 'Delivery Details'}
            {step === 2 && 'Review'}
            {step === 3 && 'Order Submitted'}
          </span>
        </nav>

        <div className="checkout-tagline">Same Confidence at Home</div>
      </div>

      {/* ==================================================================
          PROGRESS INDICATOR (Steps 1 & 2)
          ================================================================== */}
      {step < 3 && <CheckoutProgressBar />}

      {/* ==================================================================
          MAIN STEP CONTENT
          ================================================================== */}
      <main className="checkout-main-content">
        {step === 1 && <CheckoutStep1Delivery />}
        {step === 2 && <CheckoutStep2Review />}
        {step === 3 && <CheckoutStep3Confirmation />}
      </main>

      {/* Customer Orders History Modal */}
      <CustomerOrdersModal />

      {/* ==================================================================
          FOOTER (Exact reproduction of reference footer)
          ================================================================== */}
      <footer
        style={{
          borderTop: '1px solid #EBE4DA',
          background: '#FAF7F2',
          color: '#1A1A1A',
          padding: '48px 36px 28px 36px',
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1.2fr',
            gap: '36px',
            marginBottom: '36px',
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <img src="/images/crown_logo.png" alt="Crown" style={{ width: '34px' }} />
              <div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: '16px' }}>
                  RIZHEENA
                </div>
                <div style={{ fontSize: '8.5px', letterSpacing: '0.14em', color: '#7D756A' }}>
                  PROFESSIONAL MEN'S PARLOUR
                </div>
              </div>
            </div>
            <p style={{ fontSize: '12.5px', color: '#6A6359', lineHeight: 1.55 }}>
              Kotebagilu, Moodbidri Road, Moodbidri S.O., Moodbidri Taluk, Dakshina Kannada District, Karnataka - 574227.
              <br />Phone: +91 97315 42050
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '14px', color: '#2B241D' }}>
              Quick Links
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px' }}>
              <li><a href="/" style={{ color: '#554E45', textDecoration: 'none' }}>Home</a></li>
              <li><a href="/services" style={{ color: '#554E45', textDecoration: 'none' }}>Services</a></li>
              <li><a href="/shop" style={{ color: '#554E45', textDecoration: 'none' }}>Shop</a></li>
              <li><a href="/vip" style={{ color: '#554E45', textDecoration: 'none' }}>VIP</a></li>
              <li><a href="/gallery" style={{ color: '#554E45', textDecoration: 'none' }}>Gallery</a></li>
              <li><a href="/contact" style={{ color: '#554E45', textDecoration: 'none' }}>Contact</a></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <div style={{ fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '14px', color: '#2B241D' }}>
              Our Services
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '13px' }}>
              <li><a href="/services/haircut-styling" style={{ color: '#554E45', textDecoration: 'none' }}>Haircut &amp; Styling</a></li>
              <li><a href="/services/beard-grooming" style={{ color: '#554E45', textDecoration: 'none' }}>Beard Grooming</a></li>
              <li><a href="/services/facial-skin-care" style={{ color: '#554E45', textDecoration: 'none' }}>Facial &amp; Skin Care</a></li>
              <li><a href="/services/hair-colour-treatment" style={{ color: '#554E45', textDecoration: 'none' }}>Hair Colour &amp; Treatment</a></li>
              <li><a href="/services" style={{ color: '#554E45', textDecoration: 'none' }}>Home Service</a></li>
              <li><a href="/shop/gift-sets" style={{ color: '#554E45', textDecoration: 'none' }}>Gift Sets</a></li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <div style={{ fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '14px', color: '#2B241D' }}>
              Stay Connected
            </div>
            <div style={{ display: 'flex', gap: '14px', color: '#26221D' }}>
              <span style={{ cursor: 'pointer' }} aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </span>
              <span style={{ cursor: 'pointer' }} aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </span>
              <span style={{ cursor: 'pointer' }} aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </span>
              <span style={{ cursor: 'pointer' }} aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </span>
            </div>
          </div>

          {/* Script Graphic Tagline */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div
              style={{
                fontFamily: "var(--font-script, 'Alex Brush', cursive)",
                fontSize: '38px',
                color: '#8E6F45',
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
            maxWidth: '1280px',
            margin: '0 auto',
            paddingTop: '20px',
            borderTop: '1px solid #ECE4D8',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: '#7D756A',
          }}
        >
          <div>&copy; 2024 Rizheena Professional. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>|</span>
            <span>Terms &amp; Conditions</span>
            <span>|</span>
            <span>Refund Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
