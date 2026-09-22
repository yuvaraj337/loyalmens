import React from 'react';

export interface ExperienceCardData {
  number: string;
  titleLines: [string, string];
  descriptionLines: [string, string];
  href: string;
  image: string;
  ctaLabel: string;
  icon: React.ReactNode;
  hasEmbeddedIcon?: boolean;
}

interface ExperienceCardProps {
  card: ExperienceCardData;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ card }) => {
  return (
    <a
      href={card.href}
      className="experience-card"
      aria-label={`${card.number} ${card.titleLines.join(' ')} - ${card.ctaLabel}`}
    >
      {/* Layer 1: Supplied PNG filling 100% width and 100% height flush to edges */}
      <img
        src={card.image}
        alt={card.titleLines.join(' ')}
        className="card-bg-img"
        loading="eager"
      />

      {/* Layer 2: Subtle Luxury Vignette / Glass Gradient for Contrast */}
      <div className="card-overlay-gradient" />

      {/* Layer 3: Card Number at Top Left */}
      <span className="card-number-badge">{card.number}</span>

      {/* Layer 4: Desktop Content Overlay (Preserved 100% for Desktop) */}
      <div className="card-desktop-content">
        <div className="card-text-content">
          <div className={`card-icon-circle ${card.hasEmbeddedIcon ? 'is-embedded' : ''}`} aria-hidden="true">
            {!card.hasEmbeddedIcon && card.icon}
          </div>

          <h3 className="card-editorial-title">
            <span>{card.titleLines[0]}</span>
            <span>{card.titleLines[1]}</span>
          </h3>

          <p className="card-editorial-desc">
            <span>{card.descriptionLines[0]}</span>
            <span>{card.descriptionLines[1]}</span>
          </p>
        </div>

        {/* Layer 5: Interactive Pill CTA Button Overlay */}
        <div className="card-cta-pill">
          <span className="cta-pill-label">{card.ctaLabel}</span>
          <div className="cta-pill-arrow-circle" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>

      {/* Layer 4b: Mobile Content Layout — Exact Match to Reference 1 */}
      <div className="card-mobile-content">
        <div className="card-mobile-icon-circle" aria-hidden="true">
          {card.icon}
        </div>
        <div className="card-mobile-text">
          <h3 className="card-mobile-title">{card.titleLines.join(' ')}</h3>
          <p className="card-mobile-subtitle">
            {card.number === '01' ? (
              'Precision. Style. Elevated.'
            ) : (
              <>
                <span>{card.descriptionLines[0]}</span>
                <span>{card.descriptionLines[1]}</span>
              </>
            )}
          </p>
        </div>
        <div className="card-mobile-arrow-btn" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      {/* Subtle border highlight on hover */}
      <div className="card-hover-border" />
    </a>
  );
};
