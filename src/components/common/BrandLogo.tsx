import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', variant = 'light' }) => {
  return (
    <a href="/" className={`nav-brand ${className}`}>
      {/* Crown SVG vector matching the reference crown geometry */}
      <svg
        className="brand-crown-svg"
        viewBox="0 0 48 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Loyal Crown Emblem"
      >
        <path
          d="M4 10L12 28H36L44 10L30 18L24 6L18 18L4 10Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 32H38"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="24" cy="4" r="2" fill="currentColor" />
        <circle cx="4" cy="8" r="1.8" fill="currentColor" />
        <circle cx="44" cy="8" r="1.8" fill="currentColor" />
      </svg>

      <div className="brand-text-block">
        <span
          className="brand-title"
          style={{ color: variant === 'dark' ? '#161513' : '#FFFFFF' }}
        >
          LOYAL
        </span>
        <span className="brand-sub">PROFESSIONAL</span>
        <span className="brand-sub-tag">MEN'S PARLOUR</span>
      </div>
    </a>
  );
};
