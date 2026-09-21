import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { SALON_BRANCH_INFO } from '../../data/services-catalog';

export const BookingStep4Confirmed: React.FC = () => {
  const { latestBooking, resetBookingFlow, bookings, submitUtrPayment } = useBooking();
  const [showMyBookingsModal, setShowMyBookingsModal] = useState(false);
  const [utrInput, setUtrInput] = useState('');
  const [utrSubmitted, setUtrSubmitted] = useState(false);

  const booking = latestBooking || bookings[0];

  const handleBackToHome = () => {
    resetBookingFlow();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUtrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrInput.trim() || !booking) return;
    submitUtrPayment(booking.booking_id, utrInput.trim());
    setUtrSubmitted(true);
  };

  return (
    <div className="booking-page--dark" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="booking-container" style={{ paddingBottom: '80px' }}>
        {/* Subheader with Breadcrumbs & Tagline */}
        <div className="booking-subbar" style={{ marginTop: '16px' }}>
          <nav className="booking-breadcrumbs" aria-label="Breadcrumb">
            <a href="/" className="booking-breadcrumb-link">Home</a>
            <span className="booking-breadcrumb-sep">&gt;</span>
            <a href="/services" className="booking-breadcrumb-link">Services</a>
            <span className="booking-breadcrumb-sep">&gt;</span>
            <span className="booking-breadcrumb-link">Book</span>
            <span className="booking-breadcrumb-sep">&gt;</span>
            <span className="booking-breadcrumb-current">Confirmation</span>
          </nav>
          <div className="booking-tagline">SAME CONFIDENCE AT HOME</div>
        </div>

        {/* Confirmation Content Grid */}
        <div className="confirmation-wrapper">
          {/* LEFT COLUMN: CHECKMARK & SUMMARY */}
          <div className="confirmation-card-col">
            {/* Check Circle */}
            <div className="confirmation-check-circle" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Title & Subtitle */}
            <h1 className="confirmation-title">Booking Confirmed!</h1>
            <p className="confirmation-desc">
              Your appointment has been successfully booked.<br />
              We can't wait to see you!
            </p>

            {/* Dark Glass Card */}
            {booking && (
              <div className="confirmation-summary-card">
                <div className="conf-service-row">
                  <div className="conf-service-thumb">
                    <img src={booking.service_image} alt={booking.service_name} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="conf-service-name">{booking.service_name}</div>
                    <div className="conf-service-price">{booking.service_price}</div>
                    <div className="conf-service-dur">{booking.duration}</div>
                  </div>
                </div>

                <div className="conf-info-list">
                  <div className="conf-info-item">
                    <svg className="conf-info-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="conf-info-label">Date</span>
                    <span className="conf-info-val">{booking.date}</span>
                  </div>

                  <div className="conf-info-item">
                    <svg className="conf-info-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="conf-info-label">Time</span>
                    <span className="conf-info-val">{booking.time}</span>
                  </div>

                  <div className="conf-info-item">
                    <svg className="conf-info-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="conf-info-label">Branch</span>
                    <span className="conf-info-val">
                      <div>{booking.branch}</div>
                      <div style={{ fontSize: '11px', color: '#9C9588', marginTop: '2px', fontWeight: 400 }}>
                        {booking.branch_address}
                      </div>
                    </span>
                  </div>

                  <div className="conf-info-item">
                    <svg className="conf-info-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span className="conf-info-label">Phone</span>
                    <span className="conf-info-val">{booking.phone}</span>
                  </div>

                  <div className="conf-info-item">
                    <svg className="conf-info-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="conf-info-label">Email</span>
                    <span className="conf-info-val">{booking.email}</span>
                  </div>

                  {booking.special_request && (
                    <div className="conf-info-item">
                      <svg className="conf-info-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <span className="conf-info-label">Special Request</span>
                      <span className="conf-info-val">{booking.special_request}</span>
                    </div>
                  )}

                  <div className="conf-info-item" style={{ paddingTop: '8px', borderTop: '1px solid rgba(212, 175, 55, 0.15)' }}>
                    <svg className="conf-info-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="conf-info-label">Booking ID</span>
                    <span className="conf-info-val" style={{ color: '#D4AF37', letterSpacing: '0.04em' }}>
                      {booking.booking_id}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Advance Payment Notice & UPI Verification */}
            <div style={{
              width: '100%',
              background: 'rgba(212, 175, 55, 0.08)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '14px',
              padding: '16px 20px',
              marginBottom: '24px',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#D4AF37', marginBottom: '4px' }}>
                Advance Payment via UPI (Optional / Recommended)
              </div>
              <div style={{ fontSize: '12px', color: '#D8D2C7', lineHeight: 1.4, marginBottom: '12px' }}>
                Salon UPI ID: <strong>{SALON_BRANCH_INFO.upiId}</strong> ({SALON_BRANCH_INFO.phone}).
                If you made an advance deposit, enter your 12-digit UTR reference number below for instant verification.
              </div>

              {utrSubmitted ? (
                <div style={{ color: '#48BB78', fontSize: '13px', fontWeight: 700 }}>
                  ✓ Reference #{utrInput} submitted for owner verification!
                </div>
              ) : (
                <form onSubmit={handleUtrSubmit} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Enter 12-digit UPI UTR number"
                    value={utrInput}
                    onChange={(e) => setUtrInput(e.target.value)}
                    style={{
                      flex: 1,
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFF',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: '#D4AF37',
                      color: '#111',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0 16px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Submit UTR
                  </button>
                </form>
              )}
            </div>

            {/* Buttons */}
            <div className="conf-btn-row">
              <button
                type="button"
                className="conf-btn-primary"
                onClick={() => setShowMyBookingsModal(true)}
              >
                <span>View My Bookings</span>
                <span aria-hidden="true">&rarr;</span>
              </button>

              <button
                type="button"
                className="conf-btn-secondary"
                onClick={handleBackToHome}
              >
                Back to Home
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: CINEMATIC CHAIR VISUAL */}
          <div className="conf-visual-col">
            <div className="conf-visual-frame">
              <img
                src="/images/experience/main_salon_chair.png"
                alt="Luxury Barber Chair at Loyal Professional Men's Parlour"
              />
              <div className="conf-visual-brand-overlay">
                <img
                  src="/images/crown_logo.png"
                  alt="Crown"
                  style={{ width: '48px', marginBottom: '8px', filter: 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.5))' }}
                />
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, letterSpacing: '0.12em' }}>
                  RIZHEENA
                </div>
                <div style={{ fontSize: '9px', letterSpacing: '0.18em', color: '#D4AF37', textTransform: 'uppercase', fontWeight: 600 }}>
                  PROFESSIONAL MEN'S PARLOUR
                </div>
              </div>

              <div className="conf-visual-script">
                Good Hair<br />Better Mood
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Bookings Modal */}
      {showMyBookingsModal && (
        <div className="service-select-modal-overlay" onClick={() => setShowMyBookingsModal(false)}>
          <div
            className="service-select-modal"
            style={{ background: '#161412', color: '#FFF', border: '1px solid rgba(212, 175, 55, 0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="service-select-modal-header" style={{ borderBottomColor: 'rgba(212, 175, 55, 0.2)' }}>
              <h3 className="service-select-modal-title" style={{ color: '#FFF' }}>
                Your Salon Appointments ({bookings.length})
              </h3>
              <button
                type="button"
                className="calendar-nav-btn"
                style={{ color: '#FFF' }}
                onClick={() => setShowMyBookingsModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="service-select-modal-list">
              {bookings.map((b) => (
                <div
                  key={b.booking_id}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(30, 26, 22, 0.8)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <img
                    src={b.service_image}
                    alt={b.service_name}
                    style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: '#FFF' }}>{b.service_name}</div>
                    <div style={{ fontSize: '12px', color: '#D4AF37' }}>
                      {b.date} at {b.time}
                    </div>
                    <div style={{ fontSize: '11px', color: '#A0988A' }}>
                      ID: {b.booking_id} • Status: <span style={{ color: '#48BB78', textTransform: 'capitalize' }}>{b.booking_status}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: '#D4AF37', fontSize: '15px' }}>{b.service_price}</div>
                    <div style={{ fontSize: '11px', color: '#888' }}>{b.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
