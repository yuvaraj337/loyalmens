import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { BookingProgressBar } from './BookingProgressBar';
import { SALON_BRANCH_INFO } from '../../data/services-catalog';

export const BookingStep3Review: React.FC = () => {
  const {
    service,
    selectedDate,
    selectedTime,
    customerDetails,
    specialRequest,
    setSpecialRequest,
    createBooking,
  } = useBooking();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true);
      setErrorMessage('');
      await createBooking();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err?.message || 'Unable to confirm appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-container">
      {/* Subheader with Breadcrumbs & Tagline */}
      <div className="booking-subbar">
        <nav className="booking-breadcrumbs" aria-label="Breadcrumb">
          <a href="/" className="booking-breadcrumb-link">Home</a>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <a href="/services" className="booking-breadcrumb-link">Services</a>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <span className="booking-breadcrumb-link">Book</span>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <span className="booking-breadcrumb-current">Review</span>
        </nav>
        <div className="booking-tagline">SAME CONFIDENCE AT HOME</div>
      </div>

      {/* Heading */}
      <div className="booking-heading-row">
        <div className="booking-heading-col">
          <span className="booking-eyebrow">ALMOST THERE</span>
          <h1 className="booking-main-title">Review Your Booking</h1>
          <p className="booking-main-subtitle">
            Please check your details below and hit confirm.
          </p>
        </div>
      </div>

      {/* Progress Bar: Step 3 active */}
      <BookingProgressBar currentStep={3} />

      {/* 2-Column Grid */}
      <div className="booking-grid-s3">
        {/* LEFT COLUMN: REVIEW DETAILS */}
        <div className="review-card">
          {/* Service Hero Row */}
          <div className="review-service-hero">
            <div className="review-service-thumb">
              <img src={service.thumb} alt={service.name} />
            </div>
            <div className="review-service-meta">
              <div className="review-service-name">{service.name}</div>
              <div className="review-service-price">{service.price}</div>
              <div className="review-service-dur">{service.duration}</div>
            </div>
          </div>

          {/* Detailed Info Rows */}
          <div className="review-details-list">
            {/* Date */}
            <div className="review-detail-row">
              <svg className="review-detail-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="review-detail-label">Date</span>
              <span className="review-detail-value">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Time */}
            <div className="review-detail-row">
              <svg className="review-detail-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span className="review-detail-label">Time</span>
              <span className="review-detail-value">{selectedTime}</span>
            </div>

            {/* Branch */}
            <div className="review-detail-row">
              <svg className="review-detail-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="review-detail-label">Branch</span>
              <span className="review-detail-value">
                <div>{SALON_BRANCH_INFO.name}</div>
                <div style={{ fontSize: '11.5px', color: '#767067', fontWeight: 400, marginTop: '2px' }}>
                  {SALON_BRANCH_INFO.address}
                </div>
              </span>
            </div>

            {/* Phone */}
            <div className="review-detail-row">
              <svg className="review-detail-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="review-detail-label">Phone</span>
              <span className="review-detail-value">{customerDetails.phone || SALON_BRANCH_INFO.phone}</span>
            </div>

            {/* Email */}
            <div className="review-detail-row">
              <svg className="review-detail-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="review-detail-label">Email</span>
              <span className="review-detail-value">{customerDetails.email || 'customer@example.com'}</span>
            </div>

            {/* Special Request */}
            <div className="review-detail-row">
              <svg className="review-detail-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span className="review-detail-label">Special Request</span>
              <div className="review-detail-value">
                <input
                  type="text"
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="e.g. Fade cut, extra care for sensitive skin"
                  className="review-special-request-input"
                />
              </div>
            </div>
          </div>

          {errorMessage && (
            <div style={{ color: '#E53E3E', fontSize: '13px', fontWeight: 600, marginBottom: '14px' }}>
              {errorMessage}
            </div>
          )}

          {/* Confirm Button */}
          <button
            type="button"
            className="booking-continue-btn"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? 'Confirming...' : 'Confirm Booking'}</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        {/* RIGHT COLUMN: LUXURY SALON IMAGE WITH OVERLAY */}
        <div className="review-visual-card">
          <img
            src="/images/experience/main_salon_chair.png"
            alt="Rizheena luxury salon interior"
            className="review-visual-img"
          />
          <div className="review-visual-overlay">
            <div className="review-visual-brand">
              <img
                src="/images/crown_logo.png"
                alt="Crown"
                className="review-visual-crown"
              />
              <h3 className="review-visual-brand-title">RIZHEENA</h3>
              <span className="review-visual-brand-sub">PROFESSIONAL MEN'S PARLOUR</span>
            </div>

            <div className="review-script-note">
              Good Hair<br />Better Mood
            </div>

            <div className="review-visual-features">
              <div className="review-visual-feat-row">
                <svg className="review-visual-feat-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="6" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <line x1="20" y1="4" x2="8.12" y2="15.88" />
                  <line x1="14.47" y1="14.48" x2="20" y2="20" />
                </svg>
                <span>Expert Stylists</span>
              </div>

              <div className="review-visual-feat-row">
                <svg className="review-visual-feat-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Hygiene First</span>
              </div>

              <div className="review-visual-feat-row">
                <svg className="review-visual-feat-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>Premium Experience</span>
              </div>

              <div className="review-visual-feat-row">
                <svg className="review-visual-feat-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                <span>Personalized Care</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
