import React from 'react';

interface ExperienceMainImageProps {
  imageSrc?: string;
  altText?: string;
}

export const ExperienceMainImage: React.FC<ExperienceMainImageProps> = ({
  imageSrc = '/images/experience/main_salon_chair.png',
  altText = 'Loyal Professional Men’s Parlour luxury interior with bespoke leather barber chair and ambient backlighting',
}) => {
  return (
    <div className="editorial-main-image-container">
      <div className="main-image-frame">
        <img
          src={imageSrc}
          alt={altText}
          className="main-image-element"
          loading="eager"
        />
        {/* Subtle luxury light sheen overlay */}
        <div className="main-image-sheen" />
      </div>
    </div>
  );
};
