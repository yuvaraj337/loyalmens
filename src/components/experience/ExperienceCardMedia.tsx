import React from 'react';

interface ExperienceCardMediaProps {
  number?: string;
  image: string;
  alt: string;
}

export const ExperienceCardMedia: React.FC<ExperienceCardMediaProps> = ({
  image,
  alt,
}) => {
  return (
    <div className="card-visual-wrapper">
      {/* Cinematic Photo with integrated editorial number */}
      <img src={image} alt={alt} className="card-visual-img" />

      {/* Dark Gradient Fade into card body */}
      <div className="card-visual-fade" />
    </div>
  );
};
