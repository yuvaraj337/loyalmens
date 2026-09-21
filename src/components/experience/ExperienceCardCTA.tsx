import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ExperienceCardCTAProps {
  label: string;
}

export const ExperienceCardCTA: React.FC<ExperienceCardCTAProps> = ({ label }) => {
  return (
    <div className="card-cta-container">
      <span className="card-cta-label">{label}</span>
      <div className="card-cta-circle" aria-hidden="true">
        <ArrowRight size={14} strokeWidth={2.2} />
      </div>
    </div>
  );
};
