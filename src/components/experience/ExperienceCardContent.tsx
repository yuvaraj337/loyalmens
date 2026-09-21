import React from 'react';
import { ExperienceCardCTA } from './ExperienceCardCTA';

interface ExperienceCardContentProps {
  icon: React.ReactNode;
  titleLine1: string;
  titleLine2: string;
  descriptionLine1: string;
  descriptionLine2: string;
  ctaLabel: string;
}

export const ExperienceCardContent: React.FC<ExperienceCardContentProps> = ({
  icon,
  titleLine1,
  titleLine2,
  descriptionLine1,
  descriptionLine2,
  ctaLabel,
}) => {
  return (
    <div className="card-content-area">
      {/* Curved Glass Crest */}
      <div className="card-glass-curve" />

      {/* Circular Icon Badge */}
      <div className="card-icon-badge" aria-hidden="true">
        {icon}
      </div>

      {/* Editorial Title */}
      <h3 className="card-title">
        <span>{titleLine1}</span>
        <br />
        <span>{titleLine2}</span>
      </h3>

      {/* Clean Sans-Serif Description */}
      <p className="card-description">
        <span>{descriptionLine1}</span>
        <br />
        <span>{descriptionLine2}</span>
      </p>

      {/* Outlined Pill CTA */}
      <ExperienceCardCTA label={ctaLabel} />
    </div>
  );
};
