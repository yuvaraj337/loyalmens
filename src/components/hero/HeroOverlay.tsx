import React, { forwardRef } from 'react';

interface HeroOverlayProps {
  onStoryClick?: () => void;
}

export const HeroOverlay = forwardRef<HTMLDivElement, HeroOverlayProps>(({ onStoryClick }, ref) => {
  return (
    <div ref={ref} className="hero-overlay-container">
      {/* Left Content Area — Exact Match to Reference 2 */}
      <div className="hero-left-content hero-overlay-interactive">
        {/* Eyebrow Label with Decorative Champagne Lines */}
        <div className="hero-eyebrow-wrapper">
          <span className="hero-eyebrow-line" />
          <span className="hero-eyebrow">CONFIDENCE LOOKS GOOD ON YOU</span>
          <span className="hero-eyebrow-line" />
        </div>

        {/* Main Editorial Headline (Strict 2 Lines) */}
        <h1 className="hero-title">
          <span>More</span>
          <span>Than A Salon.</span>
        </h1>

        {/* Subheading */}
        <p className="hero-subtitle">
          Precision. Style. Self-Care.
        </p>

        {/* Book Now Pill CTA Button */}
        <a href="/booking" className="hero-cta-btn">
          <span>Book Now</span>
          <span className="hero-cta-arrow" aria-hidden="true">&rarr;</span>
        </a>

        {/* Clean Social Proof (No Black Background Box) */}
        <div className="hero-social-proof">
          <div className="avatar-stack">
            <img
              src="/images/avatars/social_proof_avatars.png"
              alt="Satisfied Clients"
              className="social-proof-image"
            />
          </div>
          <div className="social-proof-divider" />
          <div className="social-proof-text">
            <span className="social-count">10K+</span>
            <span className="social-label">Happy Clients</span>
          </div>
        </div>
      </div>

      {/* Right Editorial Accents (Hidden on Mobile) */}
      <div className="hero-right-accents">
        <div className="hero-right-tag">
          GOOD<br />
          HAIR<br />
          BETTER<br />
          MOOD
        </div>

        <div className="hero-script-watermark">
          A Sharper<br />
          You
        </div>
      </div>
    </div>
  );
});

HeroOverlay.displayName = 'HeroOverlay';
