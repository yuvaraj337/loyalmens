import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ExperienceEditorialContent } from './ExperienceEditorialContent';
import { ExperienceMainImage } from './ExperienceMainImage';
import { ExperienceQuote } from './ExperienceQuote';
import { ExperienceStats } from './ExperienceStats';
import { ExperienceDetails } from './ExperienceDetails';
import { ExperienceDetailCards } from './ExperienceDetailCards';
import { ExperienceFooterLine } from './ExperienceFooterLine';
import '../../styles/space-experience.css';

export const LoyalExperienceSection: React.FC = () => {
  const { t } = useLanguage();
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

      {/* ========================================================
          DESKTOP CONTAINER (100% UNTOUCHED, HIDDEN ON MOBILE <= 768px)
          ======================================================== */}
      <div className="space-content-container space-desktop-view">
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

      {/* ========================================================
          MOBILE CONTAINER (EXACT 1:1 MATCH TO REFERENCE IMAGE 2)
          ======================================================== */}
      <div className="space-mobile-view" role="region" aria-label="The Loyal Experience Mobile">
        {/* 1. Top Eyebrow with horizontal line */}
        <div className="space-mobile-eyebrow-row">
          <span className="space-mobile-eyebrow">{t('space_eyebrow')}</span>
          <div className="space-mobile-eyebrow-line" />
        </div>

        {/* 2. Main Heading: A Space Designed Around You */}
        <h2 className="space-mobile-heading">
          <span>{t('space_title_line1')}</span>
          <span className="space-mobile-gold-accent">{t('space_title_line2')}</span>
        </h2>

        {/* 3. Description Paragraph */}
        <p className="space-mobile-desc">
          {t('space_desc')}
        </p>

        {/* 4. Full-width Salon Interior Image with Rounded Corners */}
        <div className="space-mobile-image-wrap">
          <img
            src="/images/experience/main_salon_chair.png"
            alt="Loyal Professional Men’s Parlour luxury interior"
            className="space-mobile-image"
          />
        </div>

        {/* 5. Four-Column Statistics Row matching Reference 2 */}
        <div className="space-mobile-stats-card">
          <div className="space-mobile-stat-col">
            <div className="space-mobile-stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="7" r="3.5" />
                <path d="M5.5 21v-1.5a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5V21" />
                <circle cx="5" cy="9" r="2.5" />
                <path d="M2 21v-1a3.5 3.5 0 0 1 3.5-3.5" />
                <circle cx="19" cy="9" r="2.5" />
                <path d="M22 21v-1a3.5 3.5 0 0 0-3.5-3.5" />
              </svg>
            </div>
            <div className="space-mobile-stat-val">10K+</div>
            <div className="space-mobile-stat-lbl">{t('space_stat_clients')}</div>
          </div>

          <div className="space-mobile-stat-col">
            <div className="space-mobile-stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4c-1.8 3.5-2 7 0 11 2-4 1.8-7.5 0-11z" />
                <path d="M8.5 7c-2.5 3-2 7 2 9-0.5-3.5 0-6 2-7.5" />
                <path d="M15.5 7c2.5 3 2 7-2 9 0.5-3.5 0-6-2-7.5" />
                <path d="M5 11c-2.5 3.5-1 6.5 3.5 7" />
                <path d="M19 11c2.5 3.5 1 6.5-3.5 7" />
                <path d="M7 20c3 1 7 1 10 0" />
              </svg>
            </div>
            <div className="space-mobile-stat-val">5+</div>
            <div className="space-mobile-stat-lbl">{t('space_stat_years')}</div>
          </div>

          <div className="space-mobile-stat-col">
            <div className="space-mobile-stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="space-mobile-stat-val">4.9</div>
            <div className="space-mobile-stat-lbl">{t('space_stat_rating')}</div>
          </div>

          <div className="space-mobile-stat-col">
            <div className="space-mobile-stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div className="space-mobile-stat-val">Premium</div>
            <div className="space-mobile-stat-lbl">{t('space_stat_hygiene')}</div>
          </div>
        </div>

        {/* 6. Bottom Row: Play Button & Script (Left) | Divider | Quote (Right) */}
        <div className="space-mobile-bottom-row">
          <div className="space-mobile-bottom-left">
            <div className="space-mobile-play-line-wrap">
              <button
                type="button"
                className="space-mobile-play-btn"
                onClick={() => setIsModalOpen(true)}
                aria-label="Step Inside Our World - Watch Video"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="mobile-play-triangle">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className="space-mobile-play-text">
                <span>STEP INSIDE</span>
                <span>OUR WORLD</span>
              </div>
              <div className="space-mobile-play-divider-line" />
            </div>

            <div className="space-mobile-script-art">
              <span>Look Good</span>
              <span>Feel Better</span>
            </div>
          </div>

          <div className="space-mobile-vert-line" />

          <div className="space-mobile-bottom-right">
            <div className="space-mobile-quote-eyebrow">
              <span>CRAFTED</span>
              <span>FOR A</span>
              <span>BETTER YOU</span>
            </div>
            <div className="space-mobile-quote-dash" />
            <blockquote className="space-mobile-quote-text">
              It's not just<br />a haircut, it's<br />how you feel<br />tomorrow.
            </blockquote>
          </div>
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
