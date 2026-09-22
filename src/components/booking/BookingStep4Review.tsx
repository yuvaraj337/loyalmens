import React, { useState } from 'react';
import { useBooking, formatHumanDate } from '../../context/BookingContext';
import { BookingProgressBar } from './BookingProgressBar';
import { SALON_BRANCH_INFO } from '../../data/services-catalog';
import {
  Clock,
  Tag,
  MapPin,
  Calendar as CalendarIcon,
  User,
  Phone,
  Mail,
  Users,
  FileText,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

export const BookingStep4Review: React.FC = () => {
  const {
    service,
    selectedDate,
    selectedTime,
    customerDetails,
    createBooking,
    setStep,
    bookingType,
  } = useBooking();

  const [termsAgreed, setTermsAgreed] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');

  const formattedDate = formatHumanDate(selectedDate);

  const handleBack = () => {
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirm = async () => {
    if (!termsAgreed) {
      setSubmitError('Please agree to the Terms & Conditions and Cancellation Policy to confirm.');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError('');
      await createBooking();
      // createBooking sets step to 5 automatically
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setSubmitError(err?.message || 'Failed to confirm booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-container">
      {/* Top Breadcrumbs */}
      <div className="booking-breadcrumbs">
        <div className="booking-breadcrumbs-left">
          <a href="/" className="booking-breadcrumb-link">Home</a>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <a href="/services" className="booking-breadcrumb-link">Services</a>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <a href={`/services/${service.id}`} className="booking-breadcrumb-link">{service.name}</a>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <button type="button" onClick={() => setStep(1)} className="booking-breadcrumb-link-btn">Select Date</button>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <button type="button" onClick={() => setStep(2)} className="booking-breadcrumb-link-btn">Select Time</button>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <button type="button" onClick={() => setStep(3)} className="booking-breadcrumb-link-btn">Your Details</button>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <span className="booking-breadcrumb-current">Review</span>
        </div>
        <div className="booking-tagline">{bookingType === 'home' ? 'RIZHEENA AT HOME' : 'SAME CONFIDENCE AT HOME'}</div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="booking-header-area">
        <h1 className="booking-main-title">Review Your Booking</h1>
        <p className="booking-main-subtitle">Please check your appointment details before confirming.</p>
      </div>

      {/* 5-Step Progress Indicator: Step 4 active */}
      <BookingProgressBar currentStep={4} />

      {/* Error alert if any */}
      {submitError && (
        <div className="review-error-banner" role="alert">
          <AlertCircle size={18} />
          <span>{submitError}</span>
        </div>
      )}

      {/* Main 2-Column Side-by-Side Review Grid */}
      <div className="review-cards-grid">
        {/* CARD 1: Appointment Summary */}
        <div className="booking-card review-card">
          <div className="review-card-header">
            <h2 className="review-card-title">Appointment Summary</h2>
            <button
              type="button"
              className="review-card-edit-btn"
              onClick={() => setStep(1)}
            >
              Edit
            </button>
          </div>

          <div className="appointment-service-preview">
            <img
              src={service.thumb}
              alt={service.name}
              className="appointment-service-thumb"
            />
            <div className="appointment-service-info">
              <h3 className="appointment-service-name">{service.name}</h3>
              <p className="appointment-service-desc">{service.desc}</p>
            </div>
          </div>

          <div className="review-details-list">
            {/* Date row */}
            <div className="review-detail-row">
              <div className="review-detail-left">
                <CalendarIcon size={16} className="detail-icon" />
                <span className="review-detail-label">Date</span>
              </div>
              <div className="review-detail-right">
                <span className="review-detail-val">{formattedDate}</span>
                <button
                  type="button"
                  className="review-row-edit-link"
                  onClick={() => setStep(1)}
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Time row */}
            <div className="review-detail-row">
              <div className="review-detail-left">
                <Clock size={16} className="detail-icon" />
                <span className="review-detail-label">Time</span>
              </div>
              <div className="review-detail-right">
                <span className="review-detail-val">{selectedTime}</span>
                <button
                  type="button"
                  className="review-row-edit-link"
                  onClick={() => setStep(2)}
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Duration row */}
            <div className="review-detail-row">
              <div className="review-detail-left">
                <Clock size={16} className="detail-icon" />
                <span className="review-detail-label">Duration</span>
              </div>
              <div className="review-detail-right">
                <span className="review-detail-val">{service.duration}</span>
              </div>
            </div>

            {/* Price row */}
            <div className="review-detail-row">
              <div className="review-detail-left">
                <Tag size={16} className="detail-icon" />
                <span className="review-detail-label">Price</span>
              </div>
              <div className="review-detail-right">
                <span className="review-detail-val">{service.price}</span>
              </div>
            </div>

            {/* Location / Branch row */}
            {bookingType === 'home' ? (
              <>
                <div className="review-detail-row">
                  <div className="review-detail-left">
                    <MapPin size={16} className="detail-icon" />
                    <span className="review-detail-label">Service Type</span>
                  </div>
                  <div className="review-detail-right">
                    <div className="branch-val">
                      <strong style={{ color: '#D4AF37' }}>RIZHEENA AT HOME</strong>
                      <small>Doorstep Grooming Experience</small>
                    </div>
                  </div>
                </div>

                <div className="review-detail-row">
                  <div className="review-detail-left">
                    <MapPin size={16} className="detail-icon" />
                    <span className="review-detail-label">Delivery Address</span>
                  </div>
                  <div className="review-detail-right">
                    <div className="branch-val" style={{ maxWidth: '240px', textAlign: 'right' }}>
                      <span style={{ fontSize: '0.9rem', color: '#111827', fontWeight: 500, lineHeight: 1.4, display: 'block' }}>
                        {customerDetails.deliveryAddress || 'Address not specified'}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="review-row-edit-link"
                      onClick={() => setStep(3)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="review-detail-row">
                <div className="review-detail-left">
                  <MapPin size={16} className="detail-icon" />
                  <span className="review-detail-label">Branch</span>
                </div>
                <div className="review-detail-right">
                  <div className="branch-val">
                    <strong>{SALON_BRANCH_INFO.shortName}</strong>
                    <small>Moodbidri, Karnataka</small>
                  </div>
                  <button
                    type="button"
                    className="review-row-edit-link"
                    onClick={() => setStep(1)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CARD 2: Customer Details */}
        <div className="booking-card review-card">
          <div className="review-card-header">
            <h2 className="review-card-title">Customer Details</h2>
            <button
              type="button"
              className="review-card-edit-btn"
              onClick={() => setStep(3)}
            >
              Edit
            </button>
          </div>

          <div className="review-details-list">
            {/* Full Name */}
            <div className="review-detail-row">
              <div className="review-detail-left">
                <User size={16} className="detail-icon" />
                <span className="review-detail-label">Full Name</span>
              </div>
              <div className="review-detail-right">
                <span className="review-detail-val font-semibold">
                  {customerDetails.fullName || 'Valued Guest'}
                </span>
              </div>
            </div>

            {/* Phone */}
            <div className="review-detail-row">
              <div className="review-detail-left">
                <Phone size={16} className="detail-icon" />
                <span className="review-detail-label">Phone Number</span>
              </div>
              <div className="review-detail-right">
                <span className="review-detail-val">{customerDetails.phone || '—'}</span>
              </div>
            </div>

            {/* Email */}
            <div className="review-detail-row">
              <div className="review-detail-left">
                <Mail size={16} className="detail-icon" />
                <span className="review-detail-label">Email</span>
              </div>
              <div className="review-detail-right">
                <span className="review-detail-val">
                  {customerDetails.email || 'Not provided'}
                </span>
              </div>
            </div>

            {/* Gender */}
            <div className="review-detail-row">
              <div className="review-detail-left">
                <Users size={16} className="detail-icon" />
                <span className="review-detail-label">Gender</span>
              </div>
              <div className="review-detail-right">
                <span className="review-detail-val">{customerDetails.gender || 'Male'}</span>
              </div>
            </div>

            {/* Delivery Address if At Home */}
            {bookingType === 'home' && customerDetails.deliveryAddress && (
              <div className="review-detail-row">
                <div className="review-detail-left">
                  <MapPin size={16} className="detail-icon" />
                  <span className="review-detail-label">Delivery Address</span>
                </div>
                <div className="review-detail-right">
                  <span className="review-detail-val" style={{ maxWidth: '240px', textAlign: 'right', fontSize: '0.85rem', lineHeight: 1.4 }}>
                    {customerDetails.deliveryAddress}
                  </span>
                </div>
              </div>
            )}

            {/* Special Requests */}
            <div className="review-detail-row">
              <div className="review-detail-left">
                <FileText size={16} className="detail-icon" />
                <span className="review-detail-label">Special Requests</span>
              </div>
              <div className="review-detail-right">
                <span className="review-detail-val">
                  {customerDetails.specialRequest ? customerDetails.specialRequest : 'None'}
                </span>
              </div>
            </div>
          </div>

          {/* Security Guarantee Box */}
          <div className="details-security-notice mt-6">
            <ShieldCheck size={20} className="security-icon" />
            <div className="security-text">
              <strong>Your information is safe with us</strong>
              <p>We'll only use your details to confirm your appointment.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Agreement & Bottom Action Buttons */}
      <div className="review-bottom-section">
        <label className="terms-checkbox-label">
          <input
            type="checkbox"
            checked={termsAgreed}
            onChange={(e) => setTermsAgreed(e.target.checked)}
            className="terms-checkbox-input"
          />
          <span className="terms-checkbox-text">
            I agree to the <a href="/terms" className="terms-link">Terms &amp; Conditions</a> and{' '}
            <a href="/refund-policy" className="terms-link">Cancellation Policy</a>.
          </span>
        </label>

        <div className="review-actions-row">
          <button
            type="button"
            className="booking-secondary-btn"
            onClick={handleBack}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <button
            type="button"
            className="booking-primary-btn confirm-btn"
            disabled={isSubmitting}
            onClick={handleConfirm}
          >
            <span>{isSubmitting ? 'Confirming Appointment...' : 'Confirm Booking'}</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
