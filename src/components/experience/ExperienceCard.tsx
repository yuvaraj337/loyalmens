import React from 'react';

export interface ExperienceCardData {
  number: string;
  titleLines: string[];
  descriptionLines: string[];
  mobileDescriptionLines?: string[];
  href: string;
  image: string;
  ctaLabel: string;
  mobileCtaLabel?: string;
  tagline?: string[];
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
      className={`experience-card exp-card-${card.number}`}
      aria-label={`${card.number} ${card.titleLines.join(' ')} - ${card.ctaLabel}`}
    >
      {/* Background Photography Flush to Container */}
      <img
        src={card.image}
        alt={card.titleLines.join(' ')}
        className="card-bg-img"
        loading="eager"
      />

      {/* Luxury Dark Gradient Vignette for Text Contrast */}
      <div className="card-overlay-gradient" />

      {/* Card Number at Top Left */}
      <span className="card-number-badge">{card.number}</span>

      {/* Micro Tagline at Top Right (Mobile Reference 2) */}
      {card.tagline && (
        <div className="card-micro-tag" aria-hidden="true">
          {card.tagline.map((tag, idx) => (
            <span key={idx}>{tag}</span>
          ))}
        </div>
      )}

      {/* Desktop Content Overlay (100% Preserved for Desktop) */}
      <div className="card-desktop-content">
        <div className="card-text-content">
          <div className={`card-icon-circle ${card.hasEmbeddedIcon ? 'is-embedded' : ''}`} aria-hidden="true">
            {!card.hasEmbeddedIcon && card.icon}
          </div>

          <h3 className="card-editorial-title">
            <span>{card.titleLines[0]}</span>
            {card.titleLines[1] && <span>{card.titleLines[1]}</span>}
          </h3>

          <p className="card-editorial-desc">
            <span>{card.descriptionLines[0]}</span>
            {card.descriptionLines[1] && <span>{card.descriptionLines[1]}</span>}
          </p>
        </div>

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

      {/* Mobile Content Layout (Exact Visual Match to Reference Image 2) */}
      <div className="card-mobile-layout">
        <div className="card-mobile-main">
          <div className="card-mobile-icon" aria-hidden="true">
            {card.icon}
          </div>
          <h3 className="card-mobile-title">{card.titleLines.join(' ')}</h3>
          <p className="card-mobile-desc">
            {card.mobileDescriptionLines ? (
              card.mobileDescriptionLines.map((line, idx) => (
                <span key={idx}>{line}</span>
              ))
            ) : (
              card.descriptionLines.map((line, idx) => (
                <span key={idx}>{line}</span>
              ))
            )}
          </p>
        </div>

        <div className="card-mobile-btn">
          <span className="card-mobile-btn-text">{card.mobileCtaLabel || card.ctaLabel}</span>
          <span className="card-mobile-btn-arrow" aria-hidden="true">→</span>
        </div>
      </div>

      {/* Subtle border highlight on hover */}
      <div className="card-hover-border" />
    </a>
  );
};

