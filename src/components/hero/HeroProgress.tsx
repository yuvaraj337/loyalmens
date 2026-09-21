import React from 'react';

interface HeroProgressProps {
  progress: number;
}

export const HeroProgress: React.FC<HeroProgressProps> = ({ progress }) => {
  return (
    <div className="hero-scrub-progress" aria-hidden="true">
      <div
        className="hero-scrub-bar"
        style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
      />
    </div>
  );
};
