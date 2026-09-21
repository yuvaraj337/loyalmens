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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="3.5" />
        <path d="M5.5 21v-1.5a4.5 4.5 0 0 1 4.5-4.5h4a4.5 4.5 0 0 1 4.5 4.5V21" />
        <circle cx="5" cy="9" r="2.5" />
        <path d="M2 21v-1a3.5 3.5 0 0 1 3.5-3.5" />
        <circle cx="19" cy="9" r="2.5" />
        <path d="M22 21v-1a3.5 3.5 0 0 0-3.5-3.5" />
      </svg>
    ),
  },
  {
    id: 'years',
    value: '5+',
    label: 'Years of Excellence',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4c-1.8 3.5-2 7 0 11 2-4 1.8-7.5 0-11z" />
        <path d="M8.5 7c-2.5 3-2 7 2 9-0.5-3.5 0-6 2-7.5" />
        <path d="M15.5 7c2.5 3 2 7-2 9 0.5-3.5 0-6-2-7.5" />
        <path d="M5 11c-2.5 3.5-1 6.5 3.5 7" />
        <path d="M19 11c2.5 3.5 1 6.5-3.5 7" />
        <path d="M7 20c3 1 7 1 10 0" />
      </svg>
    ),
  },
  {
    id: 'rating',
    value: '4.9',
    label: 'Client Rating',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: 'hygiene',
    value: 'Premium',
    label: 'Hygiene Standards',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
