import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ExperienceHeaderProps {
  onPrev?: () => void;
  onNext?: () => void;
}

export const ExperienceHeader: React.FC<ExperienceHeaderProps> = ({ onPrev, onNext }) => {
  const { t } = useLanguage();

  return (
    <div className="experience-header">
      <div className="experience-header-text">
        <span className="experience-eyebrow">{t('exp_eyebrow')}</span>
        <h2 className="experience-title">
          <span>{t('exp_title')}</span>
        </h2>
      </div>

      <div className="experience-arrows" aria-label="Experience cards navigation">
        <button
          className="experience-nav-arrow"
          onClick={onPrev}
          aria-label="Previous cards"
          type="button"
        >
          <ChevronLeft size={20} strokeWidth={1.8} />
        </button>
        <button
          className="experience-nav-arrow"
          onClick={onNext}
          aria-label="Next cards"
          type="button"
        >
          <ChevronRight size={20} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
};
export default ExperienceHeader;
