import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { BookingProgressBar } from './BookingProgressBar';
import { SALON_BRANCH_INFO } from '../../data/services-catalog';

export const BookingStep2Details: React.FC = () => {
  const {
    service,
    selectedDate,
    selectedTime,
    customerDetails,
    setCustomerDetails,
    setStep,
  } = useBooking();

  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerDetails((prev) => ({
      ...prev,
      whatsappConsent: e.target.checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerDetails.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!customerDetails.phone.trim() || customerDetails.phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile phone number.');
      return;
    }
    if (!customerDetails.email.trim() || !customerDetails.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <span className="booking-breadcrumb-link">{service.name}</span>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <span className="booking-breadcrumb-link">Book</span>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <span className="booking-breadcrumb-current">Your Details</span>
        </nav>
        <div className="booking-tagline">SAME CONFIDENCE AT HOME</div>
      </div>

      {/* Heading */}
      <div className="booking-heading-row">
        <div className="booking-heading-col">
          <h1 className="booking-main-title">Your Details</h1>
          <p className="booking-main-subtitle">
            Just a few details to confirm your booking.
          </p>
        </div>
      </div>

      {/* Progress Bar: Step 2 active */}
      <BookingProgressBar currentStep={2} />

      {/* 2-Column Grid */}
      <div className="booking-grid-s2">
        {/* LEFT COLUMN: FORM */}
        <div className="booking-card">
          <form onSubmit={handleSubmit} className="details-form">
            {/* Full Name */}
            <div className="details-field-card">
              <svg className="details-field-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <div className="details-field-inner">
                <label htmlFor="booking-fullname" className="details-field-label">Full Name</label>
                <input
                  id="booking-fullname"
                  type="text"
                  name="fullName"
                  value={customerDetails.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Rahul Sharma"
                  className="details-field-input"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="details-field-card">
              <svg className="details-field-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div className="details-field-inner">
                <label htmlFor="booking-phone" className="details-field-label">Phone Number</label>
                <input
                  id="booking-phone"
                  type="tel"
                  name="phone"
                  value={customerDetails.phone}
                  onChange={handleInputChange}
                  placeholder="+91 97315 42050"
                  className="details-field-input"
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="details-field-card">
              <svg className="details-field-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <div className="details-field-inner">
                <label htmlFor="booking-email" className="details-field-label">Email Address</label>
                <input
                  id="booking-email"
                  type="email"
                  name="email"
                  value={customerDetails.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="details-field-input"
                  required
                />
              </div>
            </div>

            {/* Preferred Branch */}
            <div className="details-field-card">
              <svg className="details-field-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div className="details-field-inner">
                <label htmlFor="booking-branch" className="details-field-label">Preferred Branch (Optional)</label>
                <select
                  id="booking-branch"
                  name="branch"
                  value={customerDetails.branch}
                  onChange={handleInputChange}
                  className="details-field-select"
                >
                  <option value={SALON_BRANCH_INFO.name}>
                    {SALON_BRANCH_INFO.name}
                  </option>
                  <option value="Moodbidri Main Road Express Suite">
                    Moodbidri Main Road Express Suite
                  </option>
                </select>
              </div>
            </div>

            {/* Consent Checkbox */}
            <label className="details-checkbox-label">
              <input
                type="checkbox"
                checked={customerDetails.whatsappConsent}
                onChange={handleCheckboxChange}
                className="details-checkbox"
              />
              <span>I agree to receive booking updates via WhatsApp/SMS.</span>
            </label>

            {errorMsg && (
              <div style={{ color: '#E53E3E', fontSize: '13px', fontWeight: 600 }}>
                {errorMsg}
              </div>
            )}

            {/* Continue Button */}
            <button
              type="submit"
              className="booking-continue-btn"
              style={{ marginTop: '12px' }}
            >
              <span>Continue</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: BOOKING SUMMARY */}
        <div className="booking-card summary-card">
          <h2 className="booking-card-title">Booking Summary</h2>

          <div className="summary-service-box">
            <div className="summary-service-img">
              <img src={service.thumb} alt={service.name} />
            </div>
            <div className="summary-service-info">
              <div className="summary-service-name">{service.name}</div>
              <div className="summary-service-desc">{service.desc}</div>
            </div>
          </div>

          <div className="summary-info-rows">
            {/* Duration */}
            <div className="summary-info-row">
              <span className="summary-info-left">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Duration</span>
              </span>
              <span className="summary-info-right">{service.duration}</span>
            </div>

            {/* Date */}
            <div className="summary-info-row">
              <span className="summary-info-left">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Date</span>
              </span>
              <span className="summary-info-right">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Time */}
            <div className="summary-info-row">
              <span className="summary-info-left">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Time</span>
              </span>
              <span className="summary-info-right">{selectedTime}</span>
            </div>

            {/* Branch */}
            <div className="summary-info-row">
              <span className="summary-info-left">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Branch</span>
              </span>
              <div className="summary-branch-block">
                <span className="summary-branch-name">{SALON_BRANCH_INFO.shortName}</span>
                <span className="summary-branch-addr">Moodbidri, Karnataka</span>
              </div>
            </div>

            {/* Price */}
            <div className="summary-info-row" style={{ paddingTop: '10px', borderTop: '1px solid #F2ECE3' }}>
              <span className="summary-info-left" style={{ fontWeight: 700, color: '#111' }}>
                Service Price
              </span>
              <span className="summary-info-right price" style={{ fontSize: '18px', color: '#111' }}>
                {service.price}
              </span>
            </div>
          </div>

          {/* Security Box */}
          <div className="security-box">
            <svg className="security-box-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <div>
              <div className="security-box-title">Your booking is safe with us</div>
              <div className="security-box-desc">
                We'll confirm your appointment details on the next step.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
