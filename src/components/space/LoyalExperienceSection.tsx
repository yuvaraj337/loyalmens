import React, { useState, useEffect, useRef } from 'react';
import { ExperienceEditorialContent } from './ExperienceEditorialContent';
import { ExperienceMainImage } from './ExperienceMainImage';
import { ExperienceQuote } from './ExperienceQuote';
import { ExperienceStats } from './ExperienceStats';
import { ExperienceDetails } from './ExperienceDetails';
import { ExperienceDetailCards } from './ExperienceDetailCards';
import { ExperienceFooterLine } from './ExperienceFooterLine';
import '../../styles/space-experience.css';

export const LoyalExperienceSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="loyal-space-section"
      className={`loyal-space-section ${isVisible ? 'is-visible' : ''}`}
      aria-label="Loyal Professional Men’s Parlour Space & Ambience"
    >
      {/* Ambient Silk Swirl & Shadow fronds background decoration */}
      <div className="space-bg-decorations" aria-hidden="true">
        <div className="bg-silk-light" />
        <div className="bg-leaf-shadow-left" />
        <div className="bg-leaf-shadow-right" />
      </div>

      <div className="space-content-container">
        {/* Top Composition: Left Content | Center/Right Main Image | Far-Right Quote */}
        <div className="space-top-grid">
          <div className="space-col-left reveal-item reveal-left">
            <ExperienceEditorialContent onPlayClick={() => setIsModalOpen(true)} />
          </div>

          <div className="space-col-main-image reveal-item reveal-image">
            <ExperienceMainImage />
          </div>

          <div className="space-col-right-quote reveal-item reveal-fade">
            <ExperienceQuote />
          </div>
        </div>

        {/* Floating Rounded Statistics Bar */}
        <div className="space-stats-row reveal-item reveal-up">
          <ExperienceStats />
        </div>

        {/* Lower Composition: Left "Details Make the Difference" | Right 4 Cards */}
        <div className="space-lower-grid">
          <div className="space-lower-left reveal-item reveal-left">
            <ExperienceDetails />
          </div>

          <div className="space-lower-right reveal-item reveal-stagger">
            <ExperienceDetailCards />
          </div>
        </div>

        {/* Bottom Editorial Divider: STYLE • CARE • CONFIDENCE */}
        <div className="space-footer-row reveal-item reveal-fade">
          <ExperienceFooterLine />
        </div>
      </div>

      {/* Video Modal when clicking Step Inside Our World */}
      {isModalOpen && (
        <div
          className="space-video-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Loyal Parlour Virtual Tour"
        >
          <div className="space-video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="modal-video-placeholder">
              <img
                src="/images/experience/main_salon_chair.png"
                alt="Loyal Parlour Interior"
                className="modal-preview-img"
              />
              <div className="modal-caption">
                <h4>STEP INSIDE OUR WORLD</h4>
                <p>Welcome to LOYAL PROFESSIONAL MEN'S PARLOUR — A bespoke grooming sanctuary designed around precision and comfort.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
