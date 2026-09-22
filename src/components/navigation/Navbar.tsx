import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, ArrowRight, Menu, X, Calendar, MapPin, Phone } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { useCart } from '../../context/CartContext';
import '../../styles/navbar.css';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalCount, openDrawer, badgeAnimating } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  return (
    <>
      <header className={`navbar-container ${scrolled ? 'navbar-scrolled' : ''}`}>
        <BrandLogo />

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="desktop-nav">
          <ul className="nav-links">
            <li>
              <a href="/" className={`nav-link ${currentPath === '/' ? 'active' : ''}`}>
                Home
              </a>
            </li>
            <li>
              <a href="/services" className={`nav-link ${currentPath.startsWith('/services') ? 'active' : ''}`}>
                Services
              </a>
            </li>
            <li>
              <a href="/shop" className={`nav-link ${currentPath.startsWith('/shop') ? 'active' : ''}`}>
                Shop
              </a>
            </li>
            <li>
              <a href="/vip" className={`nav-link ${currentPath === '/vip' ? 'active' : ''}`}>
                VIP
              </a>
            </li>
            <li>
              <a href="/gallery" className={`nav-link ${currentPath === '/gallery' ? 'active' : ''}`}>
                Gallery
              </a>
            </li>
            <li>
              <a href="/contact" className={`nav-link ${currentPath === '/contact' ? 'active' : ''}`}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Right Action Icons & Buttons */}
        <div className="nav-actions">
          <button
            className="nav-icon-btn nav-search-btn"
            aria-label="Search services or products"
            onClick={() => {
              window.location.href = '/services';
            }}
          >
            <Search size={18} strokeWidth={1.8} />
          </button>

          <div className="nav-divider" />

          <button
            className="nav-icon-btn cart-btn-wrapper"
            aria-label={`Shopping Cart — ${totalCount} items`}
            onClick={openDrawer}
          >
            <ShoppingBag size={18} strokeWidth={1.8} />
            <span
              className={`cart-badge${badgeAnimating ? ' cart-badge--bounce' : ''}${
                totalCount === 0 ? ' cart-badge--empty' : ''
              }`}
            >
              {totalCount}
            </span>
          </button>

          <a href="/booking" className="book-now-btn">
            <span>BOOK NOW</span>
            <ArrowRight size={14} strokeWidth={2.2} />
          </a>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            className="mobile-menu-toggle-btn"
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer & Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      <div
        className={`mobile-nav-panel ${isMobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-nav-header">
          <BrandLogo />
          <button
            type="button"
            className="mobile-nav-close-btn"
            onClick={closeMobileMenu}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-nav-body" aria-label="Mobile Menu Links">
          <ul className="mobile-nav-links">
            <li>
              <a href="/" className={`mobile-nav-link ${currentPath === '/' ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span>Home</span>
                <ArrowRight size={14} className="mobile-nav-arrow" />
              </a>
            </li>
            <li>
              <a href="/services" className={`mobile-nav-link ${currentPath.startsWith('/services') ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span>Services</span>
                <ArrowRight size={14} className="mobile-nav-arrow" />
              </a>
            </li>
            <li>
              <a href="/shop" className={`mobile-nav-link ${currentPath.startsWith('/shop') ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span>Shop</span>
                <ArrowRight size={14} className="mobile-nav-arrow" />
              </a>
            </li>
            <li>
              <a href="/vip" className={`mobile-nav-link ${currentPath === '/vip' ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span>VIP</span>
                <ArrowRight size={14} className="mobile-nav-arrow" />
              </a>
            </li>
            <li>
              <a href="/gallery" className={`mobile-nav-link ${currentPath === '/gallery' ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span>Gallery</span>
                <ArrowRight size={14} className="mobile-nav-arrow" />
              </a>
            </li>
            <li>
              <a href="/contact" className={`mobile-nav-link ${currentPath === '/contact' ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span>Contact</span>
                <ArrowRight size={14} className="mobile-nav-arrow" />
              </a>
            </li>
          </ul>

          <div className="mobile-nav-cta-wrap">
            <a href="/booking" className="mobile-nav-book-btn" onClick={closeMobileMenu}>
              <Calendar size={16} />
              <span>BOOK AN APPOINTMENT</span>
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="mobile-nav-footer">
            <div className="mobile-nav-info-item">
              <MapPin size={14} className="mobile-nav-info-icon" />
              <span>Moodbidri, Karnataka — Near Bus Stand</span>
            </div>
            <div className="mobile-nav-info-item">
              <Phone size={14} className="mobile-nav-info-icon" />
              <a href="tel:+919845012345" className="mobile-nav-tel-link">+91 98450 12345</a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
