import React, { useId } from 'react';

interface RizheenaSealProps {
  className?: string;
  size?: number | string;
  color?: string;
}

export const RizheenaSeal: React.FC<RizheenaSealProps> = ({
  className = '',
  size = 100,
  color = '#B89A58',
}) => {
  const rawId = useId();
  const pathId = `seal-path-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rizheena-circular-seal ${className}`}
      aria-label="Rizheena Signature Brand Seal"
    >
      {/* Outer Delicate Champagne Circle */}
      <circle
        cx="50"
        cy="50"
        r="46.5"
        stroke={color}
        strokeWidth="0.8"
        strokeOpacity="0.65"
      />

      {/* Circular Text Path (Clockwise from top) */}
      <defs>
        <path
          id={pathId}
          d="M 50,11.5 A 38.5,38.5 0 1,1 49.99,11.5"
        />
      </defs>

      <text
        fill={color}
        fontSize="5.7"
        fontWeight="500"
        fontFamily="'Plus Jakarta Sans', var(--font-sans), sans-serif"
        letterSpacing="0.18em"
        opacity="0.85"
      >
        <textPath
          href={`#${pathId}`}
          startOffset="0%"
          textLength="241"
          lengthAdjust="spacing"
        >
          · PRECISION · STYLE · ELEVATED · GROOMING ·
        </textPath>
      </text>

      {/* Centered Minimalist Crown with Double Wavy Baseline */}
      <g
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      >
        {/* Crown 3-Peak Silhouette */}
        <path d="M36 53.5 L38.5 42.5 L44 48.5 L50 38.5 L56 48.5 L61.5 42.5 L64 53.5 Z" />
        {/* Wave 1 */}
        <path
          d="M37.5 57.5 C 41.5 56.2, 45.5 58.8, 50 57.5 C 54.5 56.2, 58.5 58.8, 62.5 57.5"
          strokeWidth="1.1"
        />
        {/* Wave 2 */}
        <path
          d="M37.5 61 C 41.5 59.7, 45.5 62.3, 50 61 C 54.5 59.7, 58.5 62.3, 62.5 61"
          strokeWidth="1.1"
        />
      </g>
    </svg>
  );
};

export default RizheenaSeal;
