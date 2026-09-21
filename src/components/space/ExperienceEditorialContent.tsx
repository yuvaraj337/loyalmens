import React from 'react';

interface ExperienceEditorialContentProps {
  onPlayClick?: () => void;
}

export const ExperienceEditorialContent: React.FC<ExperienceEditorialContentProps> = ({ onPlayClick }) => {
  return (
    <div className="editorial-left-content">
      {/* Eyebrow with horizontal line */}
      <div className="editorial-eyebrow-wrapper">
        <span className="editorial-eyebrow">THE LOYAL EXPERIENCE</span>
        <div className="editorial-eyebrow-line" />
      </div>

      {/* Main Display Heading */}
      <h2 className="editorial-heading">
        <span className="heading-line line-1">A Space</span>
        <span className="heading-line line-2">Designed Around</span>
        <span className="heading-line line-3 editorial-gold-accent">You</span>
      </h2>

      {/* Body Copy */}
      <p className="editorial-body">
        More than a salon, it's an experience — where expertise, comfort and modern style come together to bring out the best in you.
      </p>

      {/* Circular Play CTA */}
      <div className="editorial-cta-wrapper">
        <button
          type="button"
          className="editorial-play-btn"
          onClick={onPlayClick}
          aria-label="Step Inside Our World - Watch Video"
        >
          <svg className="play-triangle-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <div className="editorial-cta-text">
          <span className="cta-line-1">STEP INSIDE</span>
          <span className="cta-line-2">OUR WORLD</span>
        </div>
      </div>

      {/* Script Accent: Look Good Feel Better */}
      <div className="editorial-script-container">
        <div className="editorial-script-words">
          <span>Look Good</span>
          <span>Feel Better</span>
        </div>
      </div>
    </div>
  );
};
