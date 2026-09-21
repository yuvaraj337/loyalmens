import React from 'react';
import '../../styles/location.css';

export interface LocationData {
  businessName: string;
  addressLines: string[];
  phone: string;
  displayPhone: string;
  workingHours: string;
  googleMapsUrl: string;
  directionsUrl: string;
}

const CLIENT_LOCATION: LocationData = {
  businessName: "LOYAL PROFESSIONAL MEN'S PARLOUR",
  addressLines: [
    'Kotebagilu, Moodbidri Road,',
    'Moodbidri S.O., Mangalore Taluk,',
    'Dakshina Kannada District, Karnataka – 574227',
  ],
  phone: '9731542050',
  displayPhone: '+91 97315 42050',
  workingHours: 'Mon – Sun : 9:00 AM – 9:00 PM',
  googleMapsUrl:
    'https://maps.google.com/maps?q=Kotebagilu,+Moodbidri+Road,+Moodbidri,+Karnataka+574227&t=&z=15&ie=UTF8&iwloc=&output=embed',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Kotebagilu,+Moodbidri+Road,+Moodbidri,+Karnataka+574227',
};

export const LocationSection: React.FC<{ data?: LocationData }> = ({
  data = CLIENT_LOCATION,
}) => {
  return (
    <section
      id="location-section"
      className="location-section"
      aria-label="Loyal Professional Men's Parlour Location and Contact Information"
    >
      <div className="location-container">
        {/* Top 2-Column Grid: Info Left | Map Right */}
        <div className="location-grid">
          {/* Left Column: Heading, Address, Contacts, Actions, Amenities */}
          <div className="location-left">
            {/* Eyebrow */}
            <div className="location-eyebrow-wrapper">
              <span className="location-eyebrow">VISIT OUR PARLOUR</span>
              <div className="location-eyebrow-line" />
            </div>

            {/* Display Heading */}
            <h2 className="location-heading">
              Find Us <span className="location-heading-accent">Here</span>
            </h2>

            {/* Sub-paragraph */}
            <p className="location-desc">
              Visit Loyal Professional Men's Parlour and experience premium grooming in person.
            </p>

            {/* Information Blocks */}
            <div className="location-info-list">
              {/* 1. Address */}
              <div className="location-info-item">
                <div className="location-info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="location-info-content">
                  <span className="location-info-title">Address</span>
                  <p className="location-info-text">
                    {data.addressLines.map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx < data.addressLines.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>

              {/* 2. Call Us */}
              <div className="location-info-item">
                <div className="location-info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="location-info-content">
                  <span className="location-info-title">Call Us</span>
                  <a href={`tel:${data.phone}`} className="location-info-text">
                    {data.displayPhone}
                  </a>
                </div>
              </div>

              {/* 3. Working Hours */}
              <div className="location-info-item">
                <div className="location-info-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="location-info-content">
                  <span className="location-info-title">Working Hours</span>
                  <span className="location-info-text">{data.workingHours}</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="location-btn-group">
              <a
                href={data.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="location-btn-primary"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
                <span>Get Directions →</span>
              </a>

              <a href={`tel:${data.phone}`} className="location-btn-secondary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call Now</span>
              </a>
            </div>

            {/* Bottom 4 Feature Amenities */}
            <div className="location-features-row" role="region" aria-label="Parlour Amenities">
              {/* 1. Easy Parking */}
              <div className="location-feature-box">
                <div className="location-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 17h14v-5l-2-6H7L5 12v5z" />
                    <circle cx="7.5" cy="14.5" r="1.5" />
                    <circle cx="16.5" cy="14.5" r="1.5" />
                    <path d="M9 17v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2" />
                    <path d="M18 17v2a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-2" />
                  </svg>
                </div>
                <span className="location-feature-label">Easy Parking</span>
              </div>

              {/* 2. Safe & Secure Area */}
              <div className="location-feature-box">
                <div className="location-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <span className="location-feature-label">Safe & Secure Area</span>
              </div>

              {/* 3. Prime Location */}
              <div className="location-feature-box">
                <div className="location-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l1-5h16l1 5" />
                    <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
                    <path d="M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
                    <path d="M9 21V13h6v8" />
                  </svg>
                </div>
                <span className="location-feature-label">Prime Location</span>
              </div>

              {/* 4. Walk-ins Welcome */}
              <div className="location-feature-box">
                <div className="location-feature-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span className="location-feature-label">Walk-ins Welcome</span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Rounded Map Container */}
          <div className="location-right">
            <div className="location-map-wrapper">
              <iframe
                title="Loyal Professional Men's Parlour Location Map"
                src={data.googleMapsUrl}
                className="location-map-frame"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Visual Brand Pin */}
              <div className="map-brand-pin" aria-hidden="true">
                <svg className="map-pin-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <div className="map-pin-card">
                  <span>Loyal Professional Men's Parlour</span>
                </div>
              </div>

              {/* Map UI Elements matching Google Maps reference */}
              <div className="map-target-btn" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="7" />
                  <line x1="12" y1="2" x2="12" y2="5" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="5" y2="12" />
                  <line x1="19" y1="12" x2="22" y2="12" />
                </svg>
              </div>

              <div className="map-zoom-controls" aria-hidden="true">
                <button type="button" className="map-zoom-btn" tabIndex={-1}>+</button>
                <div className="map-zoom-divider" />
                <button type="button" className="map-zoom-btn" tabIndex={-1}>−</button>
              </div>

              <div className="map-google-watermark" aria-hidden="true">
                <span className="google-blue">G</span>
                <span className="google-red">o</span>
                <span className="google-yellow">o</span>
                <span className="google-blue">g</span>
                <span className="google-green">l</span>
                <span className="google-red">e</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Divider */}
        <div className="location-bottom-divider">
          <div className="bottom-divider-left">
            <span>STYLE</span>
            <span className="divider-sep">|</span>
            <span>CARE</span>
            <span className="divider-sep">|</span>
            <span>CONFIDENCE</span>
          </div>
          <div className="bottom-divider-line" />
          <div className="bottom-divider-right">
            <span>GOOD HAIR &nbsp; BETTER MOOD</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
