import React from 'react';
import { Gem, Leaf, UserCheck, MapPin } from 'lucide-react';

export interface FeaturePillarItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DEFAULT_PILLARS: FeaturePillarItem[] = [
  {
    id: '01',
    icon: <Gem size={20} strokeWidth={1.8} />,
    title: 'PREMIUM EXPERIENCE',
    description: "Redefining Men's Grooming",
  },
  {
    id: '02',
    icon: <Leaf size={20} strokeWidth={1.8} />,
    title: 'TRUSTED PRODUCTS',
    description: 'Used by Professionals',
  },
  {
    id: '03',
    icon: <UserCheck size={20} strokeWidth={1.8} />,
    title: 'EXPERT STYLISTS',
    description: 'Skilled. Certified. Passionate.',
  },
  {
    id: '04',
    icon: <MapPin size={20} strokeWidth={1.8} />,
    title: 'AT YOUR SERVICE',
    description: 'In-Salon & At Home',
  },
];

interface ExperienceFeatureStripProps {
  items?: FeaturePillarItem[];
}

export const ExperienceFeatureStrip: React.FC<ExperienceFeatureStripProps> = ({
  items = DEFAULT_PILLARS,
}) => {
  return (
    <div className="trust-strip-wrapper" role="complementary" aria-label="Salon Key Pillars">
      <div className="trust-pillars-grid">
        {items.map((item, index) => (
          <div key={item.id || index} className="trust-pillar-item">
            <div className="trust-icon-box" aria-hidden="true">
              {item.icon}
            </div>
            <div className="trust-text-box">
              <span className="trust-title">{item.title}</span>
              <span className="trust-subtitle">{item.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
