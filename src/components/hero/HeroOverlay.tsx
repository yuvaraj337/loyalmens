import React, { forwardRef } from 'react';
import { Play } from 'lucide-react';

interface HeroOverlayProps {
  onStoryClick?: () => void;
}

export const HeroOverlay = forwardRef<HTMLDivElement, HeroOverlayProps>(({ onStoryClick }, ref) => {
  return (
    <div ref={ref} className="hero-overlay-container">
      {/* Left Content Area */}
      <div className="hero-left-content hero-overlay-interactive">
        <span className="hero-eyebrow">CONFIDENCE LOOKS GOOD ON YOU</span>

        <h1 className="hero-title">
          <span>More</span>
          <span>Than A Salon.</span>
        </h1>

        <p className="hero-subtitle">
          Precision. Style. Self-Care.
        </p>

        <button
          className="hero-story-btn"
          aria-label="Watch our salon story"
          onClick={() => {
            if (onStoryClick) {
              onStoryClick();
            } else {
              const exp = document.getElementById('experience-section');
              if (exp) exp.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <div className="play-circle">
            <Play size={16} fill="currentColor" strokeWidth={1} style={{ marginLeft: '2px' }} />
          </div>
          <span>Watch Our Story</span>
        </button>

        {/* Social Proof */}
        <div className="hero-social-proof">
          <div className="avatar-stack">
            <img
              src="/images/avatars/social_proof_avatars.png"
              alt="Satisfied Clients"
              className="social-proof-image"
              style={{ height: '36px', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.7))' }}
            />
          </div>
          <div className="social-proof-text">
            <span className="social-count">10K+</span>
            <span className="social-label">Happy Clients</span>
          </div>
        </div>
      </div>

      {/* Bottom Left Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <span className="scroll-text">SCROLL</span>
        <div className="scroll-line-track">
          <div className="scroll-line-thumb" />
        </div>
      </div>

      {/* Right Editorial Accents */}
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
