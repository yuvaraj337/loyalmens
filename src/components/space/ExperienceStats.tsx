import React from 'react';

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: React.ReactNode;
}

const DEFAULT_STATS: StatItem[] = [
  {
    id: 'clients',
    value: '10K+',
    label: 'Happy Clients',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'years',
    value: '5+',
    label: 'Years of Excellence',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9z" />
        <path d="M12 7c2 2.5 3 5 3 8" />
        <path d="M12 7c-2 2.5-3 5-3 8" />
        <path d="M7 12c2.5-2 5-3 8-3" />
        <path d="M7 16c2.5-1 5-1 8 0" />
      </svg>
    ),
  },
  {
    id: 'rating',
    value: '4.9',
    label: 'Client Rating',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: 'hygiene',
    value: 'Premium',
    label: 'Hygiene Standards',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

interface ExperienceStatsProps {
  stats?: StatItem[];
}

export const ExperienceStats: React.FC<ExperienceStatsProps> = ({ stats = DEFAULT_STATS }) => {
  return (
    <div className="editorial-stats-floating-bar" role="region" aria-label="Parlour Key Milestones">
      <div className="stats-pill-container">
        {stats.map((item) => (
          <div key={item.id} className="stat-item-box">
            <div className="stat-icon-wrapper" aria-hidden="true">
              {item.icon}
            </div>
            <div className="stat-text-wrapper">
              <span className="stat-value">{item.value}</span>
              <span className="stat-label">{item.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
