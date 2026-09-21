import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const FeatureIcon: React.FC<IconProps> = ({ name, className = '', size = 24 }) => {
  switch (name) {
    case 'diamond':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
          <path d="M2 9h20" />
          <path d="M10 3l-2 6 4 12 4-12-2-6" />
        </svg>
      );

    case 'leaf':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M11 20A7 7 0 0 1 4 13C4 8 8 3 19 3c.5 3.5 0 8-3.5 11.5A7 7 0 0 1 11 20z" />
          <path d="M4 20l7-7" />
        </svg>
      );

    case 'beaker':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M10 2v5.5L4.5 19A2 2 0 0 0 6.2 22h11.6a2 2 0 0 0 1.7-3L14 7.5V2" />
          <path d="M8.5 2h7" />
          <path d="M7 16h10" />
        </svg>
      );

    case 'recycle':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M7 19H4.8A2.8 2.8 0 0 1 2 16.2V14" />
          <path d="M2 17l3 3 3-3" />
          <path d="M17 5h2.2A2.8 2.8 0 0 1 22 7.8V10" />
          <path d="M22 7l-3-3-3 3" />
          <path d="M12 2a10 10 0 0 0-7 2.9L3.5 6.5" />
          <path d="M12 22a10 10 0 0 0 7-2.9l1.5-1.6" />
        </svg>
      );

    case 'shield':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );

    case 'chart':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M3 3v18h18" />
          <path d="M18.5 8.5l-5 5-3-3-4.5 4.5" />
          <polyline points="14 8.5 18.5 8.5 18.5 13" />
        </svg>
      );

    case 'people':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );

    case 'droplet':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );

    case 'ribbon':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      );

    case 'gift':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      );

    default:
      return null;
  }
};
