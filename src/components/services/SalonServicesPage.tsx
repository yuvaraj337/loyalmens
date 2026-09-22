import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from '../common/LanguageSelector';
import { RizheenaSeal } from '../common/RizheenaSeal';
import '../../styles/salon-services.css';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  duration: string;
}

interface ServiceCategory {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imgClass: string;
  icon: React.ReactNode;
  services: ServiceItem[];
}

interface SalonServicesPageProps {
  isHomeService?: boolean;
}

export const SalonServicesPage: React.FC<SalonServicesPageProps> = ({ isHomeService = false }) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  const categories: ServiceCategory[] = useMemo(() => [
    {
      id: 'haircut',
      number: '01',
      title: t('cat_haircut_title'),
      description: t('cat_haircut_desc'),
      image: '/images/services/card_01_final.jpg',
      imgClass: 'salon-card-img-01',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      ),
      services: [
        {
          id: 'h1',
          name: t('h1_name'),
          description: t('h1_desc'),
          duration: '45 mins',
        },
        {
          id: 'h2',
          name: t('h2_name'),
          description: t('h2_desc'),
          duration: '40 mins',
        },
        {
          id: 'h3',
          name: t('h3_name'),
          description: t('h3_desc'),
          duration: '30 mins',
        },
        {
          id: 'h4',
          name: t('h4_name'),
          description: t('h4_desc'),
          duration: '25 mins',
        },
      ],
    },
    {
      id: 'beard',
      number: '02',
      title: t('cat_beard_title'),
      description: t('cat_beard_desc'),
      image: '/images/services/card_02_final.jpg',
      imgClass: 'salon-card-img-02',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16M4 10h16M7 14h10M9 18h6" />
          <path d="M5 6c0 6 3 14 7 14s7-8 7-14" />
        </svg>
      ),
      services: [
        {
          id: 'b1',
          name: t('b1_name'),
          description: t('b1_desc'),
          duration: '35 mins',
        },
        {
          id: 'b2',
          name: t('b2_name'),
          description: t('b2_desc'),
          duration: '25 mins',
        },
        {
          id: 'b3',
          name: t('b3_name'),
          description: t('b3_desc'),
          duration: '40 mins',
        },
        {
          id: 'b4',
          name: t('b4_name'),
          description: t('b4_desc'),
          duration: '30 mins',
        },
      ],
    },
    {
      id: 'facial',
      number: '03',
      title: t('cat_facial_title'),
      description: t('cat_facial_desc'),
      image: '/images/services/card_03_final.jpg',
      imgClass: 'salon-card-img-03',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C9 7 4 9 4 14a8 8 0 0 0 16 0c0-5-5-7-8-12z" />
          <path d="M12 12c-2 2-3 4-3 6" />
          <path d="M12 12c2 2 3 4 3 6" />
        </svg>
      ),
      services: [
        {
          id: 'f1',
          name: t('f1_name'),
          description: t('f1_desc'),
          duration: '60 mins',
        },
        {
          id: 'f2',
          name: t('f2_name'),
          description: t('f2_desc'),
          duration: '50 mins',
        },
        {
          id: 'f3',
          name: t('f3_name'),
          description: t('f3_desc'),
          duration: '45 mins',
        },
        {
          id: 'f4',
          name: t('f4_name'),
          description: t('f4_desc'),
          duration: '45 mins',
        },
      ],
    },
    {
      id: 'colour',
      number: '04',
      title: t('cat_colour_title'),
      description: t('cat_colour_desc'),
      image: '/images/services/card_04_final.jpg',
      imgClass: 'salon-card-img-04',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9" />
          <circle cx="12" cy="7" r="1" fill="currentColor" />
          <circle cx="12" cy="17" r="1" fill="currentColor" />
        </svg>
      ),
      services: [
        {
          id: 'c1',
          name: t('c1_name'),
          description: t('c1_desc'),
          duration: '35 mins',
        },
        {
          id: 'c2',
          name: t('c2_name'),
          description: t('c2_desc'),
          duration: '60 mins',
        },
        {
          id: 'c3',
          name: t('c3_name'),
          description: t('c3_desc'),
          duration: '75 mins',
        },
        {
          id: 'c4',
          name: t('c4_name'),
          description: t('c4_desc'),
          duration: '50 mins',
        },
      ],
    },
  ], [t]);

  // Auto-open modal if URL has hash (e.g. /services#haircut)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = categories.find((c) => c.id === hash);
      if (match) {
        setSelectedCategory(match);
      }
    }
  }, [categories]);

  const handleCardClick = (cat: ServiceCategory) => {
    let route = '';
    const typeSuffix = isHomeService ? '?type=home' : '';
    if (cat.id === 'haircut') route = `/services/haircut-styling${typeSuffix}`;
    else if (cat.id === 'beard') route = `/services/beard-grooming${typeSuffix}`;
    else if (cat.id === 'facial') route = `/services/facial-skin-care${typeSuffix}`;
    else if (cat.id === 'colour') route = `/services/hair-colour-treatment${typeSuffix}`;

    if (route) {
      window.history.pushState({}, '', route);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSelectedCategory(cat);
  };

  const handleExploreAll = () => {
    setSelectedCategory({
      id: 'all',
      number: 'ALL',
      title: t('explore_all_menu'),
      description: t('salon_intro_desc'),
      image: '/images/services/card_01_final.jpg',
      imgClass: '',
      icon: null,
      services: categories.flatMap((c) => c.services),
    });
  };

  const closeModal = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="salon-services-page" id="salon-services-page">
      <div className="salon-services-container">
        {/* ==================================================================
            1. TOP EDITORIAL HEADER SECTION
            ================================================================== */}
        <div className="salon-top-section">
          {/* Top Left: GOOD HAIR BETTER MOOD with vertical line */}
          <div className="salon-top-left-tagline" aria-label="Brand Motto">
            <div className="salon-vertical-line" />
            <div className="salon-tagline-text">
              <span>{t('salon_motto_good')}</span>
              <span>{t('salon_motto_hair')}</span>
              <span>{t('salon_motto_better')}</span>
              <span>{t('salon_motto_mood')}</span>
            </div>
          </div>

          {/* Center Header: Eyebrow + Main Heading + Intro Text */}
          <div className="salon-center-header">
            <div className="salon-eyebrow-wrapper">
              <span className="salon-eyebrow-line" />
              <span className="salon-eyebrow-text">{t('salon_signature_services')}</span>
              <span className="salon-eyebrow-line" />
            </div>

            <h1 className="salon-main-heading">{t('salon_crafted_for_you')}</h1>

            <p className="salon-intro-text">
              {t('salon_intro_desc')}
            </p>

            {/* Centerpiece Embossed Brand Seal Directly Above Service Cards */}
            <div className="salon-seal-container" aria-hidden="true">
              <RizheenaSeal className="salon-brand-seal" />
            </div>
          </div>

          {/* Top Right: Language Selector */}
          <div className="salon-top-right-actions">
            <LanguageSelector theme="light" />
          </div>
        </div>

        {/* ==================================================================
            2. FOUR SERVICE CARDS (HORIZONTAL ROW)
            ================================================================== */}
        <div className="salon-cards-grid" role="region" aria-label="Signature Salon Services">
          {categories.map((cat) => (
            <article
              key={cat.id}
              className="salon-service-card"
              onClick={() => handleCardClick(cat)}
              tabIndex={0}
              role="button"
              aria-label={`View ${cat.title} services`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(cat);
                }
              }}
            >
              {/* Card Photo Area */}
              <div className="salon-card-image-wrap">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className={`salon-card-img ${cat.imgClass}`}
                  loading="eager"
                />
                <div className="salon-card-image-vignette" />

                {/* Card Number at Top Left */}
                <span className="salon-card-number">{cat.number}</span>

                {/* Circular Icon Badge floating on photo bottom-left */}
                <div className="salon-card-icon-badge" aria-hidden="true">
                  {cat.icon}
                </div>
              </div>

              {/* Card Text Content */}
              <div className="salon-card-content">
                <h2 className="salon-card-title">{cat.title}</h2>
                <p className="salon-card-description">{cat.description}</p>

                {/* Card CTA Row */}
                <div className="salon-card-cta-row">
                  <span className="salon-card-cta-label">{t('view_services')}</span>
                  <div className="salon-card-arrow-btn" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ==================================================================
            3. BOTTOM SECTION
            ================================================================== */}
        <div className="salon-bottom-section">
          {/* Left: Editorial Quote */}
          <div className="salon-bottom-quote-block">
            <span className="salon-quote-mark" aria-hidden="true">“</span>
            <blockquote className="salon-quote-text">
              {t('salon_quote_1')}
              <br />
              {t('salon_quote_2')}
            </blockquote>
            <div className="salon-quote-underline" />
          </div>

          {/* Center: Brand Line */}
          <div className="salon-bottom-center-block">
            <div className="salon-brand-line-wrapper">
              <span className="salon-brand-line" />
              <span className="salon-brand-text">{t('salon_brand_text')}</span>
              <span className="salon-brand-line" />
            </div>
          </div>

          {/* Right: Editorial Slogan & Corner Image */}
          <div className="salon-bottom-right-block">
            <div className="salon-plinth-wrapper">
              <img
                src="/images/services/bottom_right_corner.png"
                alt="Look Good Feel Better Be Rizheena - Luxury Care"
                className="salon-plinth-img"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================
          4. INTERACTIVE SERVICE DETAIL MODAL
          ================================================================== */}
      {selectedCategory && (
        <div
          className="salon-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCategory.title}
        >
          <div
            className="salon-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="salon-modal-close-btn"
              onClick={closeModal}
              aria-label={t('close')}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="salon-modal-header">
              <span className="salon-modal-category-eyebrow">
                {selectedCategory.number !== 'ALL' ? `${t('category_label')} 0${selectedCategory.number}` : t('explore_all_menu')}
              </span>
              <h3 className="salon-modal-title">{selectedCategory.title}</h3>
            </div>

            <div className="salon-modal-services-list">
              {selectedCategory.services.map((svc) => (
                <div key={svc.id} className="salon-modal-service-item">
                  <div className="salon-modal-service-info">
                    <h4 className="salon-modal-service-name">{svc.name}</h4>
                    <p className="salon-modal-service-desc">{svc.description}</p>
                    <span className="salon-modal-service-duration">{t('est_duration')} {svc.duration}</span>
                  </div>
                  <a
                    href={`/booking?service=${encodeURIComponent(svc.name)}${isHomeService ? '&type=home' : ''}`}
                    className="salon-modal-book-btn"
                  >
                    {t('nav_book_now')}
                  </a>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                className="salon-explore-all-btn"
                onClick={closeModal}
                style={{ fontSize: '11px', padding: '12px 28px' }}
              >
                {t('close_menu')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalonServicesPage;
