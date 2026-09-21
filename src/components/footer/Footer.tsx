import React, { useState } from 'react';
import '../../styles/footer.css';

export interface FooterProps {
  email?: string;
}

export const Footer: React.FC<FooterProps> = ({ email: propEmail }) => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && agreed) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      id="site-footer"
      className="luxury-footer"
      aria-label="Loyal Professional Men's Parlour Site Footer"
    >
      <div className="footer-container">
        {/* Main 5-Column Grid */}
        <div className="footer-main-grid">
          {/* Column 1: Brand & Socials */}
          <div className="footer-col-brand">
            <a href="/" className="footer-logo-link" aria-label="Loyal Professional Men's Parlour Home">
              {/* Crown Emblem matching reference */}
              <svg className="footer-crown-icon" viewBox="0 0 48 38" fill="none">
                <path
                  d="M4 22L8 6L16 15L24 2L32 15L40 6L44 22H4Z"
                  stroke="#987138"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 28C12 26 18 30 24 28C30 26 36 30 42 28"
                  stroke="#987138"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 33C12 31 18 35 24 33C30 31 36 35 42 33"
                  stroke="#987138"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="footer-brand-title">LOYAL</span>
              <span className="footer-brand-sub">PROFESSIONAL MEN'S PARLOUR</span>
            </a>

            <span className="footer-tagline">GOOD HAIR &nbsp; BETTER MOOD</span>

            <p className="footer-description">
              More than a parlour — it's a place for confidence, care and a better you.
            </p>

            {/* Social Icons */}
            <div className="footer-social-row" aria-label="Social Media Links">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/919731542050" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>

              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col-nav">
            <h3 className="footer-col-title">Quick Links</h3>
            <div className="footer-col-title-line" />
            <ul className="footer-link-list">
              {[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Shop', href: '/shop' },
                { label: 'VIP', href: '/vip' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Contact', href: '#location-section' },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="footer-nav-link">
                    <span>{link.label}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="footer-col-services">
            <h3 className="footer-col-title">Our Services</h3>
            <div className="footer-col-title-line" />
            <ul className="footer-link-list">
              {[
                { label: 'Haircut & Styling', href: '/services#haircut' },
                { label: 'Beard Grooming', href: '/services#beard' },
                { label: 'Facial & Skin Care', href: '/services#facial' },
                { label: 'Hair Colour & Treatment', href: '/services#colour' },
                { label: 'Home Service', href: '/home-service' },
                { label: 'Gift Sets', href: '/shop#gifts' },
              ].map((service, idx) => (
                <li key={idx}>
                  <a href={service.href} className="footer-nav-link">
                    <span>{service.label}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-col-contact">
            <h3 className="footer-col-title">Contact Us</h3>
            <div className="footer-col-title-line" />
            <div className="footer-contact-list">
              {/* Address */}
              <div className="footer-contact-item">
                <div className="footer-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="footer-contact-info">
                  <span className="footer-contact-label">Address</span>
                  <span className="footer-contact-val">
                    Kotebagilu, Moodbidri Road,<br />
                    Moodbidri S.O., Mangalore Taluk,<br />
                    Karnataka – 574227
                  </span>
                </div>
              </div>

              {/* Call Us */}
              <div className="footer-contact-item">
                <div className="footer-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="footer-contact-info">
                  <span className="footer-contact-label">Call Us</span>
                  <a href="tel:9731542050" className="footer-contact-val">
                    +91 97315 42050
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="footer-contact-item">
                <div className="footer-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="footer-contact-info">
                  <span className="footer-contact-label">Working Hours</span>
                  <span className="footer-contact-val">Mon – Sun : 9:00 AM – 9:00 PM</span>
                </div>
              </div>

              {/* Email (only displayed if real email is configured) */}
              {propEmail && (
                <div className="footer-contact-item">
                  <div className="footer-contact-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="footer-contact-info">
                    <span className="footer-contact-label">Email</span>
                    <a href={`mailto:${propEmail}`} className="footer-contact-val">
                      {propEmail}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Column 5: Stay Connected */}
          <div className="footer-col-subscribe">
            <h3 className="footer-col-title">Stay Connected</h3>
            <div className="footer-col-title-line" />
            <p className="footer-newsletter-desc">
              Get the latest offers, new products and grooming tips.
            </p>

            <form onSubmit={handleSubmit} className="footer-input-wrapper">
              <input
                type="email"
                placeholder={subscribed ? 'Thank you!' : 'Enter your email address'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="footer-email-input"
                aria-label="Email address for grooming updates"
              />
              <button type="submit" className="footer-submit-btn" aria-label="Subscribe to newsletter">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>

            <label className="footer-consent-wrapper">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="footer-consent-checkbox"
                required
              />
              <span className="footer-consent-label">I agree to receive updates and offers.</span>
            </label>

            {/* Handwritten script signature */}
            <div className="footer-script-signature" aria-hidden="true">
              <span>Good Hair</span>
              <span>Better Mood</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="footer-bottom-bar">
          <span className="footer-copyright">
            © 2026 Loyal Professional Men's Parlour. All rights reserved.
          </span>

          <div className="footer-legal-links">
            <a href="/privacy" className="footer-legal-link">Privacy Policy</a>
            <span className="footer-legal-divider">|</span>
            <a href="/terms" className="footer-legal-link">Terms &amp; Conditions</a>
            <span className="footer-legal-divider">|</span>
            <a href="/refund" className="footer-legal-link">Refund Policy</a>
          </div>

          <span className="footer-brand-motto">
            DESIGNED FOR A BETTER YOU
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
