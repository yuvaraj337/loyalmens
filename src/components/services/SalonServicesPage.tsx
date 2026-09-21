import React, { useState, useEffect } from 'react';
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

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'haircut',
    number: '01',
    title: 'Haircut & Styling',
    description: 'Precision cuts, modern styles\nand expert finishing.',
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
        name: 'Signature Royal Haircut',
        description: 'Bespoke consultation, precision shear cut, wash with Rizheena organic shampoo, blow-dry & luxury styling.',
        duration: '45 mins',
      },
      {
        id: 'h2',
        name: 'Executive Scissor Cut & Finish',
        description: 'Classic scissor over comb sculpting, clean taper or fade, cooling scalp tonic massage.',
        duration: '40 mins',
      },
      {
        id: 'h3',
        name: 'Junior Master Cut (Under 12)',
        description: 'Gentle, stylish haircuts tailored for young gentlemen with patience and precision.',
        duration: '30 mins',
      },
      {
        id: 'h4',
        name: 'Scalp Clarifying Wash & Blow-Dry',
        description: 'Deep clarifying wash, therapeutic scalp massage, blow dry & luxury matte paste finish.',
        duration: '25 mins',
      },
    ],
  },
  {
    id: 'beard',
    number: '02',
    title: 'Beard Grooming',
    description: 'Sharp. Defined.\nAlways on point.',
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
        name: 'Royal Hot Towel Beard Sculpt',
        description: 'Essential oil hot towel infusion, precision straight razor edge lining, beard shaping & warm oil conditioning.',
        duration: '35 mins',
      },
      {
        id: 'b2',
        name: 'Classic Beard Trim & Line-Up',
        description: 'Clipper and shear detailing, cheek and neckline definition, nourishing beard butter application.',
        duration: '25 mins',
      },
      {
        id: 'b3',
        name: 'Traditional Straight Razor Shave',
        description: 'Pre-shave botanical oil, rich warm lather, dual-pass straight razor shave, ice towel & aftershave balm.',
        duration: '40 mins',
      },
      {
        id: 'b4',
        name: 'Beard Spa & Follicle Therapy',
        description: 'Deep cleansing steam treatment, exfoliating beard scrub, leave-in hydration serum for soft texture.',
        duration: '30 mins',
      },
    ],
  },
  {
    id: 'facial',
    number: '03',
    title: 'Facial & Skin Care',
    description: 'Refresh your skin.\nFeel the difference.',
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
        name: 'Rizheena Signature Deep Cleanse',
        description: 'Ultrasonic pore cleansing, herbal steam, gentle exfoliation, bespoke mask & tension-relieving face massage.',
        duration: '60 mins',
      },
      {
        id: 'f2',
        name: 'Hydra-Infusion Glow Treatment',
        description: 'Intense hyaluronic acid hydration therapy, cooling jade roller stimulation, and bright radiant skin finish.',
        duration: '50 mins',
      },
      {
        id: 'f3',
        name: 'De-Tan & Skin Brightening Therapy',
        description: 'Targeted botanical de-tanning mask, active antioxidant serum, and UV protection barrier.',
        duration: '45 mins',
      },
      {
        id: 'f4',
        name: 'Anti-Pollution Charcoal Detox',
        description: 'Activated charcoal peel, sebum control toning, pore tightening & refreshing cold mist.',
        duration: '45 mins',
      },
    ],
  },
  {
    id: 'colour',
    number: '04',
    title: 'Hair Colour & Treatment',
    description: 'Express your style\nwith expert care.',
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
        name: 'Natural Gray Blending Camouflage',
        description: 'Subtle, ammonia-free 10-minute tone application for hair or beard to achieve a distinguished, youthful blend.',
        duration: '35 mins',
      },
      {
        id: 'c2',
        name: 'Full Luxury Hair Colouring',
        description: 'Rich multidimensional colour application with conditioning agents, lustrous shine & scalp barrier protectant.',
        duration: '60 mins',
      },
      {
        id: 'c3',
        name: 'Keratin Smooth & Repair Therapy',
        description: 'Intense protein infusion to tame unmanageable frizz, strengthen broken hair shafts & lock in silky texture.',
        duration: '75 mins',
      },
      {
        id: 'c4',
        name: 'Moroccan Oil Scalp & Hair Spa',
        description: 'Warm argan oil massage, nourishing cream bath with steam infusion, neck & shoulder pressure point relief.',
        duration: '50 mins',
      },
    ],
  },
];

export const SalonServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  // Check URL hash on load for deep linking (e.g. /services#haircut)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const match = SERVICE_CATEGORIES.find((cat) => cat.id === hash);
      if (match) {
        setSelectedCategory(match);
      }
    }
  }, []);

  const handleCardClick = (cat: ServiceCategory) => {
    let route = '';
    if (cat.id === 'haircut') route = '/services/haircut-styling';
    else if (cat.id === 'beard') route = '/services/beard-grooming';
    else if (cat.id === 'facial') route = '/services/facial-skin-care';
    else if (cat.id === 'colour') route = '/services/hair-colour-treatment';

    if (route) {
      window.history.pushState({}, '', route);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSelectedCategory(cat);
  };

  const handleExploreAll = () => {
    // Open full modal showing all services
    setSelectedCategory({
      id: 'all',
      number: 'ALL',
      title: 'Our Complete Signature Menu',
      description: 'Explore our full array of luxury grooming, hair styling, beard artistry & skin treatments.',
      image: '/images/services/card_01_haircut_styling.png',
      imgClass: '',
      icon: null,
      services: SERVICE_CATEGORIES.flatMap((c) => c.services),
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
              <span>GOOD</span>
              <span>HAIR</span>
              <span>BETTER</span>
              <span>MOOD</span>
            </div>
          </div>

          {/* Center Header: Eyebrow + Main Heading + Intro Text */}
          <div className="salon-center-header">
            <div className="salon-eyebrow-wrapper">
              <span className="salon-eyebrow-line" />
              <span className="salon-eyebrow-text">OUR SIGNATURE SERVICES</span>
              <span className="salon-eyebrow-line" />
            </div>

            <h1 className="salon-main-heading">Crafted for a Better You</h1>

            <p className="salon-intro-text">
              From classic cuts to advanced grooming, discover services designed to
              <br />
              bring out your best — every time.
            </p>
          </div>

          {/* Top Right: Circular Stamp / Seal Badge */}
          <div className="salon-top-right-seal" aria-hidden="true">
            <img
              src="/images/services/badge_seal.png"
              alt="Style Grooming Sleek Stamp"
              className="salon-seal-badge-img"
            />
          </div>
        </div>

        {/* ==================================================================
            2. FOUR SERVICE CARDS (HORIZONTAL ROW)
            ================================================================== */}
        <div className="salon-cards-grid" role="region" aria-label="Signature Salon Services">
          {SERVICE_CATEGORIES.map((cat) => (
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
                  <span className="salon-card-cta-label">VIEW SERVICES</span>
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
              Self-care
              <br />
              is a new confidence.
            </blockquote>
            <div className="salon-quote-underline" />
          </div>

          {/* Center: EXPLORE ALL SERVICES Pill CTA + RIZHEENA PROFESSIONAL */}
          <div className="salon-bottom-center-block">
            <button
              type="button"
              className="salon-explore-all-btn"
              onClick={handleExploreAll}
              aria-label="Explore all services"
            >
              <span>EXPLORE ALL SERVICES</span>
              <span aria-hidden="true">→</span>
            </button>

            <div className="salon-brand-line-wrapper">
              <span className="salon-brand-line" />
              <span className="salon-brand-text">RIZHEENA PROFESSIONAL</span>
              <span className="salon-brand-line" />
            </div>
          </div>

          {/* Right: Editorial Slogan & Stone Plinth Corner Composition */}
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
              aria-label="Close services modal"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="salon-modal-header">
              <span className="salon-modal-category-eyebrow">
                {selectedCategory.number !== 'ALL' ? `Service 0${selectedCategory.number} • Category` : 'Signature Menu'}
              </span>
              <h3 className="salon-modal-title">{selectedCategory.title}</h3>
            </div>

            <div className="salon-modal-services-list">
              {selectedCategory.services.map((svc) => (
                <div key={svc.id} className="salon-modal-service-item">
                  <div className="salon-modal-service-info">
                    <h4 className="salon-modal-service-name">{svc.name}</h4>
                    <p className="salon-modal-service-desc">{svc.description}</p>
                    <span className="salon-modal-service-duration">Estimated Duration: {svc.duration}</span>
                  </div>
                  <a
                    href={`/booking?service=${encodeURIComponent(svc.name)}`}
                    className="salon-modal-book-btn"
                  >
                    Book Now
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
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
