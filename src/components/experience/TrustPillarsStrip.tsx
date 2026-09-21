import React from 'react';
import { Gem, Leaf, UserCheck, MapPin } from 'lucide-react';

interface Pillar {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const PILLARS: Pillar[] = [
  {
    icon: <Gem size={20} strokeWidth={1.8} />,
    title: 'PREMIUM EXPERIENCE',
    subtitle: "Redefining Men's Grooming",
  },
  {
    icon: <Leaf size={20} strokeWidth={1.8} />,
    title: 'TRUSTED PRODUCTS',
    subtitle: 'Used by Professionals',
  },
  {
    icon: <UserCheck size={20} strokeWidth={1.8} />,
    title: 'EXPERT STYLISTS',
    subtitle: 'Skilled. Certified. Passionate',
  },
  {
    icon: <MapPin size={20} strokeWidth={1.8} />,
    title: 'AT YOUR SERVICE',
    subtitle: 'In-Salon & At Home',
  },
];

export const TrustPillarsStrip: React.FC = () => {
  return (
    <div className="trust-strip-wrapper">
      <div className="trust-pillars-grid">
        {PILLARS.map((p, idx) => (
          <div key={idx} className="trust-pillar-item">
            <div className="trust-icon-box" aria-hidden="true">
              {p.icon}
            </div>
            <div className="trust-text-box">
              <span className="trust-title">{p.title}</span>
              <span className="trust-subtitle">{p.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
