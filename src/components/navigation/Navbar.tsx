import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  ArrowRight,
  Menu,
  X,
  Calendar,
  MapPin,
  Phone,
  Globe,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/navbar.css';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { totalCount, openDrawer, badgeAnimating } = useCart();
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  // Check URL query on mount for ?lang=open
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('lang') === 'open') {
        setIsLanguageOpen(true);
      }
      // Allow global helper for programmatic testing
      (window as unknown as { __toggleLanguage?: (open?: boolean) => void }).__toggleLanguage = (open?: boolean) => {
        setIsLanguageOpen((prev) => (open !== undefined ? open : !prev));
      };
    }
  }, []);

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

  // Handle ESC key and click outside to close language dropdown & mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLanguageOpen) setIsLanguageOpen(false);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isLanguageOpen, isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSelectLanguage = (lang: 'en' | 'hi' | 'kn') => {
    setLanguage(lang);
    setIsLanguageOpen(false);
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
                {t('nav_home')}
              </a>
            </li>
            <li>
              <a href="/services" className={`nav-link ${currentPath.startsWith('/services') ? 'active' : ''}`}>
                {t('nav_services')}
              </a>
            </li>
            <li>
              <a href="/shop" className={`nav-link ${currentPath.startsWith('/shop') ? 'active' : ''}`}>
                {t('nav_shop')}
              </a>
            </li>
            <li>
              <a href="/vip" className={`nav-link ${currentPath === '/vip' ? 'active' : ''}`}>
                {t('nav_membership')}
              </a>
            </li>
            <li>
              <a href="/gallery" className={`nav-link ${currentPath === '/gallery' ? 'active' : ''}`}>
                Gallery
              </a>
            </li>
            <li>
              <a href="/contact" className={`nav-link ${currentPath === '/contact' ? 'active' : ''}`}>
                {t('nav_contact')}
              </a>
            </li>
          </ul>
        </nav>

        {/* Right Action Icons & Buttons */}
        <div className="nav-actions">
          {/* Search Button */}
          <button
            type="button"
            className="nav-icon-btn nav-search-btn"
            aria-label="Search services or products"
            onClick={() => {
              window.location.href = '/services';
            }}
          >
            <Search size={18} strokeWidth={1.8} />
          </button>

          <div className="nav-divider" />

          {/* Language Selector Pill + Dropdown */}
          <div className="nav-lang-container" ref={langMenuRef}>
            <button
              type="button"
              className={`nav-lang-pill-btn ${isLanguageOpen ? 'active' : ''}`}
              aria-label="Language selector"
              aria-expanded={isLanguageOpen}
              onClick={() => setIsLanguageOpen((prev) => !prev)}
            >
              <Globe size={13} className="lang-globe-icon" />
              <span className="lang-code-text">{language.toUpperCase()}</span>
              {isLanguageOpen ? (
                <ChevronUp size={11} className="lang-chevron-icon" />
              ) : (
                <ChevronDown size={11} className="lang-chevron-icon" />
              )}
            </button>

            {isLanguageOpen && (
              <div className="lang-dropdown-menu" role="menu">
                <button
                  type="button"
                  className={`lang-option-row ${language === 'en' ? 'active' : ''}`}
                  onClick={() => handleSelectLanguage('en')}
                >
                  <span className="lang-name">English</span>
                  {language === 'en' && <Check size={15} className="lang-check" />}
                </button>
                <button
                  type="button"
                  className={`lang-option-row ${language === 'hi' ? 'active' : ''}`}
                  onClick={() => handleSelectLanguage('hi')}
                >
                  <span className="lang-name">हिन्दी</span>
                  {language === 'hi' && <Check size={15} className="lang-check" />}
                </button>
                <button
                  type="button"
                  className={`lang-option-row ${language === 'kn' ? 'active' : ''}`}
                  onClick={() => handleSelectLanguage('kn')}
                >
                  <span className="lang-name">ಕನ್ನಡ</span>
                  {language === 'kn' && <Check size={15} className="lang-check" />}
                </button>
              </div>
            )}
          </div>

          <div className="nav-divider" />

          {/* Cart Bag Icon with Quantity Badge */}
          <button
            type="button"
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

          {/* Desktop BOOK NOW button */}
          <a href="/booking" className="book-now-btn">
            <span>{t('nav_book_now')}</span>
            <ArrowRight size={13} strokeWidth={2.2} />
          </a>

          {/* Mobile Hamburger Menu Toggle (hidden on mobile header per target design) */}
          <button
            type="button"
            className="mobile-menu-toggle-btn"
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X size={20} strokeWidth={2.2} /> : <Menu size={20} strokeWidth={2.2} />}
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
            aria-label="Close menu"
            onClick={closeMobileMenu}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-nav-body">
          <ul className="mobile-nav-links">
            <li>
              <a href="/" className={`mobile-nav-link ${currentPath === '/' ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span>{t('nav_home')}</span>
                <ArrowRight size={14} className="mobile-nav-arrow" />
              </a>
            </li>
            <li>
              <a href="/services" className={`mobile-nav-link ${currentPath.startsWith('/services') ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span>{t('nav_services')}</span>
                <ArrowRight size={14} className="mobile-nav-arrow" />
              </a>
            </li>
            <li>
              <a href="/shop" className={`mobile-nav-link ${currentPath.startsWith('/shop') ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span>{t('nav_shop')}</span>
                <ArrowRight size={14} className="mobile-nav-arrow" />
              </a>
            </li>
            <li>
              <a href="/vip" className={`mobile-nav-link ${currentPath === '/vip' ? 'active' : ''}`} onClick={closeMobileMenu}>
                <span>{t('nav_membership')}</span>
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
                <span>{t('nav_contact')}</span>
                <ArrowRight size={14} className="mobile-nav-arrow" />
              </a>
            </li>
          </ul>

          <div className="mobile-nav-cta-wrap">
            <a href="/booking" className="mobile-nav-book-btn" onClick={closeMobileMenu}>
              <Calendar size={16} />
              <span>{t('book_appointment')}</span>
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Quick Language Switcher in Drawer */}
          <div className="mobile-nav-lang-bar">
            <div className="mobile-nav-lang-title">
              <Globe size={14} />
              <span>Select Language</span>
            </div>
            <div className="mobile-nav-lang-pills">
              <button
                type="button"
                className={`mobile-lang-pill ${language === 'en' ? 'active' : ''}`}
                onClick={() => {
                  handleSelectLanguage('en');
                  closeMobileMenu();
                }}
              >
                English
              </button>
              <button
                type="button"
                className={`mobile-lang-pill ${language === 'hi' ? 'active' : ''}`}
                onClick={() => {
                  handleSelectLanguage('hi');
                  closeMobileMenu();
                }}
              >
                हिन्दी
              </button>
              <button
                type="button"
                className={`mobile-lang-pill ${language === 'kn' ? 'active' : ''}`}
                onClick={() => {
                  handleSelectLanguage('kn');
                  closeMobileMenu();
                }}
              >
                ಕನ್ನಡ
              </button>
            </div>
          </div>

          <div className="mobile-nav-footer">
            <div className="mobile-nav-info-item">
              <MapPin size={14} className="mobile-nav-info-icon" />
              <span>Moodbidri, Karnataka &mdash; Near Bus Stand</span>
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
export default Navbar;
