import React from 'react';
import '../../styles/selfcare.css';

export const SelfCareSection: React.FC = () => {
  return (
    <section
      id="self-care-section"
      className="selfcare-section"
      aria-label="Self-Care Looks Good On You"
    >
      <div className="selfcare-backdrop" aria-hidden="true" />

      <div className="selfcare-container">
        {/* Left Column: Eyebrow + Editorial Display Heading */}
        <div className="selfcare-left">
          <span className="selfcare-eyebrow">IT'S A LIFESTYLE</span>
          <div className="selfcare-heading-wrapper">
            <h2 className="selfcare-title">
              Self-Care<br />
              <span className="selfcare-title-accent">Looks Good</span> On You.
            </h2>
            <div className="selfcare-line" aria-hidden="true" />
          </div>
        </div>

        {/* Right Column: Brand Accent & Pagination Dots */}
        <div className="selfcare-right">
          <div className="selfcare-brand-block">
            <div className="selfcare-brand-name">RIZHEENA</div>
            <div className="selfcare-brand-sub">PROFESSIONAL MEN'S PARLOUR</div>
          </div>
          <div className="selfcare-dots" aria-hidden="true">
            <span className="selfcare-dot active" />
            <span className="selfcare-dot" />
            <span className="selfcare-dot" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfCareSection;
