import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { ExperienceCard, ExperienceCardData } from './ExperienceCard';

export interface ExperienceCarouselRef {
  scrollPrev: () => void;
  scrollNext: () => void;
}

interface ExperienceCarouselProps {
  cards: ExperienceCardData[];
}

export const ExperienceCarousel = forwardRef<ExperienceCarouselRef, ExperienceCarouselProps>(
  ({ cards }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
      scrollPrev: () => {
        if (containerRef.current) {
          containerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
        }
      },
      scrollNext: () => {
        if (containerRef.current) {
          containerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      },
    }));

    return (
      <div
        ref={containerRef}
        className="experience-cards-grid"
        role="region"
        aria-label="Experience Cards Selection"
      >
        {cards.map((card) => (
          <ExperienceCard key={card.number} card={card} />
        ))}
      </div>
    );
  }
);

ExperienceCarousel.displayName = 'ExperienceCarousel';
