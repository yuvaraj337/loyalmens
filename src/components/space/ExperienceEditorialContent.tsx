import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface ExperienceEditorialContentProps {
  onPlayClick?: () => void;
}

export const ExperienceEditorialContent: React.FC<ExperienceEditorialContentProps> = ({ onPlayClick }) => {
  const { t } = useLanguage();

  return (
    <div className="editorial-left-content">
      {/* Eyebrow with horizontal line */}
      <div className="editorial-eyebrow-wrapper">
        <span className="editorial-eyebrow">{t('space_eyebrow')}</span>
        <div className="editorial-eyebrow-line" />
      </div>

      {/* Main Display Heading */}
      <h2 className="editorial-heading">
        <span className="heading-line line-1">{t('space_title_line1')}</span>
        <span className="heading-line line-2">{t('space_title_line2')}</span>
      </h2>

      {/* Body Copy */}
      <p className="editorial-body">
        {t('space_desc')}
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
          <span className="cta-line-1">{t('space_step_inside')}</span>
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
