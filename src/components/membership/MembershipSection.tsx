import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import '../../styles/membership.css';

export interface MembershipPlan {
  id: 'vip' | 'vvip';
  badge?: string;
  name: string;
  sublabel: string;
  tagline: string;
  price: string;
  duration: string;
  image: string;
  benefits: string[];
  btnText: string;
  theme: 'light' | 'dark';
}

const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'vip',
    badge: 'MOST POPULAR',
    name: 'VIP',
    sublabel: 'MEMBERSHIP',
    tagline: 'Essential grooming. Exclusive benefits.',
    price: '₹2,499',
    duration: '/ 3 Months',
    image: '/images/catalogue/gift-sets/vip-membership-set.jpg',
    benefits: [
      '6 Haircuts (Any Style)',
      '4 Beard Trims',
      '2 Facials',
      '10% Off on All Products',
      'Priority Booking',
      'Complimentary Hair Wash',
      'Exclusive Member Offers',
    ],
    btnText: 'Join VIP',
    theme: 'light',
  },
  {
    id: 'vvip',
    name: 'VVIP',
    sublabel: 'MEMBERSHIP',
    tagline: 'The ultimate grooming experience.',
    price: '₹4,999',
    duration: '/ 6 Months',
    image: '/images/catalogue/gift-sets/luxury-vvip-kit.jpg',
    benefits: [
      '12 Haircuts (Any Style)',
      '8 Beard Trims',
      '4 Facials / Skin Care',
      '2 Head Massages',
      '20% Off on All Products',
      'Priority Booking (No Wait)',
      'Invites to Exclusive Events',
      'Personal Grooming Consultation',
    ],
    btnText: 'Join VVIP',
    theme: 'dark',
  },
];

const BENEFIT_STRIP = [
  {
    title: 'Save More',
    desc: 'Get premium services at special rates.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polygon points="6 3 18 3 22 8 12 21 2 8" />
        <line x1="2" y1="8" x2="22" y2="8" />
        <polyline points="6 3 12 8 18 3" />
        <polyline points="2 8 12 21 22 8" />
      </svg>
    ),
  },
  {
    title: 'Priority Access',
    desc: 'Skip the queue and book anytime.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 17l1.5-9 4.5 4 3-7 3 7 4.5-4 1.5 9H3z" />
        <line x1="2" y1="19" x2="22" y2="19" />
      </svg>
    ),
  },
  {
    title: 'Exclusive Offers',
    desc: 'Special discounts and member-only deals.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M12 8v13" />
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 4.8 0 0 1 12 8a4.8 4.8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
      </svg>
    ),
  },
  {
    title: 'Premium Experience',
    desc: 'Feel the difference every visit.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

export function MembershipSection() {
  const { t } = useLanguage();
  const [activePlan, setActivePlan] = useState<MembershipPlan | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: number) => {
    if (cardsContainerRef.current) {
      const scrollAmount = direction * 450;
      cardsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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
        planName: activePlan.name,
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
    <section className="mem-section" id="memberships">
      <div className="mem-container">
        {/* Section Header */}
        <div className="mem-header">
          <div className="mem-eyebrow-wrap">
            <span className="mem-eyebrow-line" />
            <span className="mem-eyebrow-text">MEMBERSHIP PLANS</span>
            <span className="mem-eyebrow-line" />
          </div>

          <h2 className="mem-heading">{t('mem_title')}</h2>
          <p className="mem-subtitle">{t('mem_subtitle')}</p>

          {/* Top-Right Navigation Arrows */}
          <div className="mem-nav-arrows">
            <button
              type="button"
              className="mem-arrow-btn"
              onClick={() => handleScroll(-1)}
              aria-label="Previous membership"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="mem-arrow-btn"
              onClick={() => handleScroll(1)}
              aria-label="Next membership"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Side-by-Side Cards Grid */}
        <div className="mem-cards-grid" ref={cardsContainerRef}>
          {MEMBERSHIP_PLANS.map((plan) => {
            const isVip = plan.id === 'vip';
            return (
              <div
                key={plan.id}
                className={`mem-card ${isVip ? 'mem-card-vip' : 'mem-card-vvip'}`}
              >
                {/* Left Side: Image Container */}
                <div className="mem-card-media">
                  <div className="mem-card-img-inner">
                    <img src={plan.image} alt={`${plan.name} Membership Kit`} loading="lazy" />
                  </div>
                </div>

                {/* Right Side: Information */}
                <div className="mem-card-content">
                  {/* Badge */}
                  {plan.badge ? (
                    <span className="mem-popular-badge">{t('mem_popular')}</span>
                  ) : (
                    <div className="mem-badge-spacer" />
                  )}

                  {/* Title & Sublabel */}
                  <h3 className="mem-card-title">{plan.name}</h3>
                  <div className="mem-card-sublabel">{plan.sublabel}</div>
                  <p className="mem-card-tagline">{isVip ? t('mem_vip_desc') : t('mem_vvip_desc')}</p>

                  {/* Price */}
                  <div className="mem-card-price-row">
                    <span className="mem-card-price">{plan.price}</span>
                    <span className="mem-card-duration">{plan.duration}</span>
                  </div>

                  {/* Benefits List */}
                  <ul className="mem-benefit-list">
                    {plan.benefits.map((benefit, index) => (
                      <li key={index} className="mem-benefit-row">
                        <div className="mem-check-icon-circle">
                          <svg viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Join Button */}
                  <button
                    type="button"
                    className="mem-card-btn"
                    onClick={() => handleOpenModal(plan)}
                  >
                    <span>{isVip ? t('mem_join_vip') : t('mem_join_vvip')}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Horizontal Benefit Strip */}
        <div className="mem-benefit-strip">
          {BENEFIT_STRIP.map((item, index) => (
            <div key={index} className="mem-strip-item">
              <div className="mem-strip-icon-wrap">{item.icon}</div>
              <div className="mem-strip-content">
                <h4 className="mem-strip-title">{item.title}</h4>
                <p className="mem-strip-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inquiry Modal */}
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
                <h3 className="mem-modal-title">{activePlan.name} Membership</h3>
                <p className="mem-modal-sub">
                  {activePlan.price} {activePlan.duration} — Enter your details and our team will contact you to confirm your membership.
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
                      activePlan.id === 'vip' ? 'mem-modal-submit-vip' : 'mem-modal-submit-vvip'
                    }`}
                  >
                    Submit {activePlan.name} Inquiry
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
                  Your inquiry for <strong>{activePlan.name} Membership</strong> has been registered. Our salon concierge will call you at <strong>{formData.phone}</strong> shortly.
                </p>
                <button
                  type="button"
                  className="mem-modal-submit-btn mem-modal-submit-vip"
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
