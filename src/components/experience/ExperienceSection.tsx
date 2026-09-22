import React, { useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ExperienceHeader } from './ExperienceHeader';
import { ExperienceCarousel, ExperienceCarouselRef } from './ExperienceCarousel';
import { ExperienceFeatureStrip } from './ExperienceFeatureStrip';
import { LifestylePreview } from './LifestylePreview';
import { ExperienceCardData } from './ExperienceCard';
import '../../styles/experience.css';

export const ExperienceSection: React.FC = () => {
  const carouselRef = useRef<ExperienceCarouselRef | null>(null);
  const { t } = useLanguage();

  const cards: ExperienceCardData[] = [
    {
      number: '01',
      titleLines: [t('exp_salon_services')],
      descriptionLines: [t('exp_salon_desc')],
      mobileDescriptionLines: ['Precision. Style. Reimagined.'],
      ctaLabel: 'EXPLORE →',
      mobileCtaLabel: 'EXPLORE',
      tagline: ['STYLE', 'GROOM', 'BELONG'],
      href: '/services',
      image: '/images/cards/card_01_salon_services.png',
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
      number: '02',
      titleLines: [t('exp_rizheena_shop')],
      descriptionLines: [t('exp_shop_desc')],
      mobileDescriptionLines: ['Premium Grooming Essentials', 'for Everyday Excellence.'],
      ctaLabel: 'SHOP NOW →',
      mobileCtaLabel: 'SHOP NOW',
      tagline: ['CARE', 'FUELS', 'CONFIDENCE'],
      href: '/shop',
      image: '/images/cards/card_02_rizheena_shop.png',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      number: '03',
      titleLines: [t('exp_at_home')],
      descriptionLines: [t('exp_home_desc')],
      mobileDescriptionLines: ['Professional Grooming.', 'At Your Doorstep.'],
      ctaLabel: 'BOOK HOME →',
      mobileCtaLabel: 'BOOK HOME',
      tagline: ['SAME', 'EXPERTISE', 'AT YOUR HOME'],
      href: '/home-service',
      image: '/images/cards/card_04_at_home.png',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
  ];

  const handlePrev = () => {
    carouselRef.current?.scrollPrev();
  };

  const handleNext = () => {
    carouselRef.current?.scrollNext();
  };

  return (
    <section
      id="experience-section"
      className="experience-section"
      aria-label="Loyal Professional Men's Parlour Experience Selection"
    >
      <div className="experience-container">
        {/* Section Header with Eyebrow, Title, and Carousel Navigation Controls */}
        <ExperienceHeader onPrev={handlePrev} onNext={handleNext} />

        {/* Cards in One Row / Stacked matching reference design */}
        <ExperienceCarousel ref={carouselRef} cards={cards} />
      </div>

      {/* Feature Strip below cards: 4 Key Pillars with Vertical Separators */}
      <ExperienceFeatureStrip />

      {/* Next Section Preview: It's a Lifestyle */}
      <LifestylePreview />
    </section>
  );
};
export default ExperienceSection;
