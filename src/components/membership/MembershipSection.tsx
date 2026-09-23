import React, { useState } from 'react';
import '../../styles/membership.css';

export interface MembershipPlan {
  id: string;
  namePrefix: string;
  nameAccent: string;
  fullName: string;
  sublabel: string;
  tagline: string;
  price: string;
  duration: string;
  badge?: string;
  image: string;
  imageOverlayText?: string;
  theme: 'light' | 'dark';
  features: {
    text: string;
    icon: string;
  }[];
  ctaText: string;
}

const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'vip-starter',
    namePrefix: 'VIP',
    nameAccent: 'STARTER',
    fullName: 'VIP Starter',
    sublabel: 'GROOMING ESSENTIALS',
    tagline: 'The perfect start to premium care.',
    price: '₹3,500',
    duration: '/ 3 MONTHS',
    image: '/images/membership/card_vip_starter.jpg',
    imageOverlayText: 'PREMIUM CARE\nFOR A SHARPER YOU',
    theme: 'light',
    features: [
      { text: 'Private AC Cabin (30 min extra)', icon: 'cabin' },
      { text: 'Aroma Hair Cut + Beard Sculpt by Senior', icon: 'scissors' },
      { text: 'RIZHEENA Diamond Facial (1 hour)', icon: 'facial' },
      { text: 'De-Tan + Head Massage', icon: 'spa' },
      { text: 'Black Coffee / Green Tea Free', icon: 'coffee' },
    ],
    ctaText: 'Choose VIP Starter',
  },
  {
    id: 'vvip-signature',
    namePrefix: 'VVIP',
    nameAccent: 'SIGNATURE',
    fullName: 'VVIP Signature',
    sublabel: 'ELEVATED GROOMING EXPERIENCE',
    tagline: 'Everything you love, and so much more.',
    price: '₹7,500',
    duration: '/ 3 MONTHS',
    badge: 'MOST SELLING',
    image: '/images/membership/card_vvip_signature.jpg',
    imageOverlayText: 'ELEVATE\nYOUR GROOMING\nEXPERIENCE',
    theme: 'dark',
    features: [
      { text: 'Everything included in VIP, plus', icon: 'crown' },
      { text: 'Korean Hydra Glass Facial Machine (Actor-level)', icon: 'gear' },
      { text: 'Botox Hair Spa / Keratin Wash', icon: 'droplet' },
      { text: 'Body Polishing (Neck + Hand)', icon: 'hand' },
      { text: 'RIZHEENA Luxe Kit FREE (₹1,200 value)', icon: 'gift' },
      { text: '7-Day Glow Guarantee – If the glow does not appear, enjoy a complimentary repeat treatment.', icon: 'shield-check' },
    ],
    ctaText: 'Choose VVIP Signature',
  },
  {
    id: 'celebrity-royal',
    namePrefix: 'CELEBRITY',
    nameAccent: 'ROYAL',
    fullName: 'Celebrity Royal',
    sublabel: 'THE ULTIMATE TRANSFORMATION',
    tagline: 'For your biggest moments.',
    price: '₹15,000',
    duration: '/ 3 MONTHS',
    image: '/images/membership/card_celebrity_royal.jpg',
    imageOverlayText: '',
    theme: 'light',
    features: [
      { text: 'Full Day Booking – 3 Hours', icon: 'calendar' },
      { text: 'Hair Colour / Highlights (Wella/Loreal)', icon: 'scissors' },
      { text: 'Full Body De-Tan + Body Polishing', icon: 'sparkle' },
      { text: 'Diamond + Gold Double Facial', icon: 'diamond' },
      { text: 'Manicure + Pedicure + Foot Spa', icon: 'lotus' },
      { text: 'Groom Makeup / Party Makeup', icon: 'makeup' },
      { text: 'RIZHEENA Full Luxe Combo FREE (₹2,500 value)', icon: 'gift' },
      { text: 'Photoshoot Ready', icon: 'camera' },
    ],
    ctaText: 'Choose Plan',
  },
  {
    id: 'vvip-membership',
    namePrefix: 'VVIP',
    nameAccent: 'MEMBERSHIP',
    fullName: 'VVIP Membership',
    sublabel: 'A YEAR OF PRIVILEGES',
    tagline: 'More value. All year long.',
    price: '₹9,999',
    duration: '/ YEAR',
    image: '/images/membership/card_vvip_membership.jpg',
    imageOverlayText: '',
    theme: 'light',
    features: [
      { text: '30% OFF All Year', icon: 'percent' },
      { text: '1 Free Haircut Every Month', icon: 'scissors' },
      { text: '1 Free Diamond Facial', icon: 'diamond' },
      { text: 'RIZHEENA VIP / VVIP Private Lounge', icon: 'cabin' },
      { text: 'Only For Premium Clients', icon: 'user' },
      { text: 'By Appointment', icon: 'check-calendar' },
    ],
    ctaText: 'Become a Member',
  },
];

const HEADER_BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18h18v2H3zM4 15l3-8 5 4 5-4 3 8H4z" />
      </svg>
    ),
    label: 'Priority',
    sub: 'Booking',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 7-10 11L2 10l4-7z" />
        <path d="M2 10h20" />
      </svg>
    ),
    label: 'Premium',
    sub: 'Services',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 8a4.8 4.8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
      </svg>
    ),
    label: 'Exclusive',
    sub: 'Benefits',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    label: 'A More Confident',
    sub: 'You',
  },
];

const BOTTOM_STRIP_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 7-10 11L2 10l4-7z" />
        <path d="M2 10h20" />
      </svg>
    ),
    title: 'Premium Ambience',
    desc: 'A luxurious space just for you.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    ),
    title: 'Expert Professionals',
    desc: 'Skilled. Certified. Dedicated.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    title: 'Personalised Care',
    desc: "Because you're unique.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18h18v2H3zM4 15l3-8 5 4 5-4 3 8H4z" />
      </svg>
    ),
    title: 'Exclusive Privileges',
    desc: 'More care. More you.',
  },
];

function renderFeatureIcon(name: string) {
  switch (name) {
    case 'cabin':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'scissors':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <line x1="20" y1="4" x2="8.12" y2="15.88" />
          <line x1="14.47" y1="14.48" x2="20" y2="20" />
          <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
      );
    case 'facial':
    case 'user':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'spa':
    case 'lotus':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a6 6 0 0 1 6 6c0 5-6 12-6 12S6 13 6 8a6 6 0 0 1 6-6z" />
        </svg>
      );
    case 'coffee':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      );
    case 'crown':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 18h18v2H3zM4 15l3-8 5 4 5-4 3 8H4z" />
        </svg>
      );
    case 'gear':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 'droplet':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );
    case 'hand':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 11V6a2 2 0 0 0-4 0v5" />
          <path d="M14 10V4a2 2 0 0 0-4 0v6" />
          <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
          <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-16 0v-4" />
        </svg>
      );
    case 'gift':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      );
    case 'shield-check':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v18M3 12h18M6.5 6.5l11 11M6.5 17.5l11-11" />
        </svg>
      );
    case 'diamond':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 3h12l4 7-10 11L2 10l4-7z" />
          <path d="M2 10h20" />
        </svg>
      );
    case 'makeup':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 4l6 6-12 12H2v-6L14 4z" />
          <line x1="10" y1="8" x2="16" y2="14" />
        </svg>
      );
    case 'camera':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      );
    case 'percent':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="5" x2="5" y2="19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      );
    case 'check-calendar':
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <polyline points="9 16 11 18 15 14" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
  }
}

export function MembershipSection() {
  const [activePlan, setActivePlan] = useState<MembershipPlan | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleOpenModal = (plan: MembershipPlan) => {
    setActivePlan(plan);
    setSubmitted(false);
    setFormData({ name: '', phone: '', email: '' });
  };

  const handleCloseModal = () => {
    setActivePlan(null);
    setSubmitted(false);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !activePlan) return;

    try {
      const inquiry = {
        id: 'mem_' + Date.now(),
        planId: activePlan.id,
        planName: activePlan.fullName,
        price: activePlan.price,
        customerName: formData.name.trim(),
        customerPhone: formData.phone.trim(),
        customerEmail: formData.email.trim(),
        submittedAt: new Date().toISOString(),
        status: 'pending',
      };

      const existing = JSON.parse(localStorage.getItem('rizheena_memberships') || '[]');
      localStorage.setItem('rizheena_memberships', JSON.stringify([...existing, inquiry]));
    } catch (err) {
      console.error('Failed to save membership inquiry:', err);
    }

    setSubmitted(true);
  };

  return (
    <section className="mem-luxury-section" id="vip">
      {/* Decorative Corner Tags */}
      <div className="mem-corner-tag-left">
        <span>MORE</span>
        <span>THAN A</span>
        <span>GROOMING</span>
        <span>EXPERIENCE</span>
      </div>

      <div className="mem-corner-tag-right">
        <span className="mem-cursive-script">Look Good</span>
        <span className="mem-cursive-script">Feel Greater</span>
        <div className="mem-cursive-strokes">
          <span className="stroke stroke-1" />
          <span className="stroke stroke-2" />
        </div>
      </div>

      <div className="mem-luxury-container">
        {/* ==================================================================
            1. SECTION HEADER
            ================================================================== */}
        <div className="mem-luxury-header">
          {/* Mobile-only brand badge */}
          <div className="mem-mobile-top-brand">
            <span className="mem-gold-dash">—</span>
            <span className="mem-mobile-brand-title">RIZHEENA</span>
            <span className="mem-gold-dash">—</span>
            <span className="mem-mobile-brand-sub">MEN'S PARLOUR</span>
          </div>

          <div className="mem-eyebrow-row">
            <span className="mem-gold-line" />
            <span className="mem-eyebrow-label">MEMBERSHIPS</span>
            <span className="mem-gold-line" />
          </div>

          <h2 className="mem-main-title">
            Invest in a <span className="mem-gold-serif-accent">Better You</span>
          </h2>

          <p className="mem-support-line">
            EXCLUSIVE CARE • PREMIUM EXPERIENCES • LASTING CONFIDENCE
          </p>

          {/* 4 Icon Benefit Row */}
          <div className="mem-header-benefits-row">
            {HEADER_BENEFITS.map((item, idx) => (
              <div key={idx} className="mem-header-benefit-item">
                <div className="mem-header-benefit-icon">{item.icon}</div>
                <div className="mem-header-benefit-text">
                  <span className="mem-benefit-line1">{item.label}</span>
                  <span className="mem-benefit-line2">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================================
            2. FOUR MEMBERSHIP CARDS (Desktop: 1 row of 4, Mobile: stacked horizontal)
            ================================================================== */}
        <div className="mem-cards-layout">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isDark = plan.theme === 'dark';
            return (
              <div
                key={plan.id}
                className={`mem-luxe-card ${isDark ? 'mem-luxe-card-dark' : 'mem-luxe-card-light'}`}
              >
                {/* Most Selling Badge for VVIP Signature */}
                {plan.badge && (
                  <div className="mem-most-selling-badge">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                      <path d="M3 18h18v2H3zM4 15l3-8 5 4 5-4 3 8H4z" />
                    </svg>
                    <span>{plan.badge}</span>
                  </div>
                )}

                {/* Left Media (Mobile) / Top-Right Media (Desktop) */}
                <div className="mem-card-image-wrapper">
                  <img
                    src={plan.image}
                    alt={plan.fullName}
                    className="mem-card-photo"
                    loading="lazy"
                  />
                  {plan.imageOverlayText && (
                    <div className="mem-photo-overlay-tag">
                      {plan.imageOverlayText.split('\n').map((line, i) => (
                        <span key={i}>{line}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="mem-card-main-content">
                  {/* Card Title & Price Header */}
                  <div className="mem-card-title-price-row">
                    <div className="mem-card-heading-box">
                      <h3 className="mem-card-title">
                        {plan.namePrefix}{' '}
                        <span className={isDark ? 'gold-accent-dark' : 'gold-accent-light'}>
                          {plan.nameAccent}
                        </span>
                      </h3>
                      <div className="mem-card-sublabel">{plan.sublabel}</div>
                      <p className="mem-card-tagline">{plan.tagline}</p>
                    </div>

                    <div className="mem-card-price-box">
                      <span className="mem-price-val">{plan.price}</span>
                      <span className="mem-duration-val">{plan.duration}</span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="mem-features-list">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="mem-feature-item">
                        <span className="mem-feat-icon-bubble">
                          {renderFeatureIcon(feat.icon)}
                        </span>
                        <span className="mem-feat-text">{feat.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Card Action Button */}
                  <div className="mem-card-cta-wrap">
                    <button
                      type="button"
                      className={`mem-action-pill-btn ${isDark ? 'mem-btn-gold' : 'mem-btn-black'}`}
                      onClick={() => handleOpenModal(plan)}
                    >
                      <span>{plan.ctaText}</span>
                      <span className="mem-btn-chevron" aria-hidden="true">›</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ==================================================================
            3. BOTTOM BENEFIT STRIP
            ================================================================== */}
        <div className="mem-bottom-strip-container">
          <div className="mem-bottom-strip-items">
            {BOTTOM_STRIP_ITEMS.map((item, idx) => (
              <div key={idx} className="mem-bottom-strip-col">
                <div className="mem-strip-icon-circ">{item.icon}</div>
                <div className="mem-strip-text-box">
                  <h4 className="mem-strip-col-title">{item.title}</h4>
                  <p className="mem-strip-col-desc">{item.desc}</p>
                </div>
                {idx < BOTTOM_STRIP_ITEMS.length - 1 && (
                  <span className="mem-strip-vertical-divider" />
                )}
              </div>
            ))}
          </div>

          <div className="mem-bottom-quote-box">
            <span className="mem-bottom-quote-text">“Confidence looks good on you.”</span>
          </div>
        </div>

        {/* ==================================================================
            4. RIZHEENA FOOTER BRANDING
            ================================================================== */}
        <div className="mem-section-footer-brand">
          <div className="mem-footer-brand-left">
            <span className="mem-brand-wordmark">RIZHEENA</span>
            <span className="mem-brand-descriptor">PROFESSIONAL MEN'S PARLOUR</span>
          </div>
          <div className="mem-footer-brand-right">
            <span className="mem-motto-line1">GROOM TODAY.</span>
            <span className="mem-motto-line2">A BETTER TOMORROW.</span>
          </div>
        </div>
      </div>

      {/* ==================================================================
          5. INQUIRY MODAL (Keeps existing functionality)
          ================================================================== */}
      {activePlan && (
        <div className="mem-modal-overlay" onClick={handleCloseModal}>
          <div className="mem-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="mem-modal-close-btn"
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              ✕
            </button>

            {!submitted ? (
              <>
                <span className="mem-modal-badge">MEMBERSHIP INQUIRY</span>
                <h3 className="mem-modal-title">{activePlan.fullName}</h3>
                <p className="mem-modal-sub">
                  {activePlan.price} {activePlan.duration} — Enter your details and our salon concierge will contact you to confirm your membership.
                </p>

                <form onSubmit={handleSubmitInquiry}>
                  <div className="mem-form-group">
                    <label htmlFor="mem-name">Full Name *</label>
                    <input
                      id="mem-name"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="mem-form-group">
                    <label htmlFor="mem-phone">Mobile Number *</label>
                    <input
                      id="mem-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="mem-form-group">
                    <label htmlFor="mem-email">Email Address (Optional)</label>
                    <input
                      id="mem-email"
                      type="email"
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`mem-modal-submit-btn ${
                      activePlan.theme === 'dark' ? 'mem-modal-submit-gold' : 'mem-modal-submit-black'
                    }`}
                  >
                    Submit {activePlan.fullName} Inquiry
                  </button>
                </form>
              </>
            ) : (
              <div className="mem-modal-success">
                <div className="mem-modal-success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="mem-modal-title">Thank You, {formData.name}!</h3>
                <p className="mem-modal-sub">
                  Your inquiry for <strong>{activePlan.fullName}</strong> has been registered. Our salon concierge will call you at <strong>{formData.phone}</strong> shortly.
                </p>
                <button
                  type="button"
                  className="mem-modal-submit-btn mem-modal-submit-gold"
                  onClick={handleCloseModal}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
