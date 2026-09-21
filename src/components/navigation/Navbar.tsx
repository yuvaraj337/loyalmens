import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import '../../styles/navbar.css';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-container ${scrolled ? 'navbar-scrolled' : ''}`}>
      <BrandLogo />

      <nav aria-label="Main Navigation">
        <ul className="nav-links">
          <li>
            <a href="/" className="nav-link active">
              Home
            </a>
          </li>
          <li>
            <a href="/services" className="nav-link">
              Services
            </a>
          </li>
          <li>
            <a href="/shop" className="nav-link">
              Shop
            </a>
          </li>
          <li>
            <a href="/vip" className="nav-link">
              VIP
            </a>
          </li>
          <li>
            <a href="/gallery" className="nav-link">
              Gallery
            </a>
          </li>
          <li>
            <a href="/contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <div className="nav-actions">
        <button className="nav-icon-btn" aria-label="Search services or products">
          <Search size={18} strokeWidth={1.8} />
        </button>

        <div className="nav-divider" />

        <button className="nav-icon-btn cart-btn-wrapper" aria-label="Shopping Cart">
          <ShoppingBag size={18} strokeWidth={1.8} />
          <span className="cart-badge">0</span>
        </button>

        <a href="/booking" className="book-now-btn">
          <span>BOOK NOW</span>
          <ArrowRight size={14} strokeWidth={2.2} />
        </a>
      </div>
    </header>
  );
};
