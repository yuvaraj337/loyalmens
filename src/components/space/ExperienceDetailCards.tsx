import React from 'react';

export interface DetailCardItem {
  id: string;
  image: string;
  label: string;
  icon: React.ReactNode;
}

const DETAIL_CARDS: DetailCardItem[] = [
  {
    id: 'expert-stylists',
    image: '/images/details/expert_stylists.png',
    label: 'EXPERT STYLISTS',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    id: 'premium-products',
    image: '/images/details/premium_products.png',
    label: 'PREMIUM PRODUCTS',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: 'luxury-ambience',
    image: '/images/details/luxury_ambience.png',
    label: 'LUXURY AMBIENCE',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9z" />
        <path d="M12 8c1.5 2 2.5 4 2.5 6.5" />
        <path d="M12 8c-1.5 2-2.5 4-2.5 6.5" />
        <path d="M8 12c2.5-1 4.5-1 8 0" />
      </svg>
    ),
  },
  {
    id: 'relaxed-you',
    image: '/images/details/more_relaxed_you.png',
    label: 'A MORE RELAXED YOU',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
];

interface ExperienceDetailCardsProps {
  cards?: DetailCardItem[];
}

export const ExperienceDetailCards: React.FC<ExperienceDetailCardsProps> = ({
  cards = DETAIL_CARDS,
}) => {
  return (
    <div className="editorial-detail-cards-grid" role="region" aria-label="Parlour Highlights">
      {cards.map((card) => (
        <div key={card.id} className="detail-card-item">
          <div className="detail-card-image-wrapper">
            <img
              src={card.image}
              alt={card.label}
              className="detail-card-img"
              loading="lazy"
            />
            {/* Subtle dark gradient overlay */}
            <div className="detail-card-overlay-gradient" />
          </div>

          {/* Bottom Content Bar with Circular Icon and Label */}
          <div className="detail-card-bottom-bar">
            <div className="detail-card-icon-circle" aria-hidden="true">
              {card.icon}
            </div>
            <span className="detail-card-label">{card.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
