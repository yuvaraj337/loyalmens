import React, { useState } from 'react';
import { useBooking, formatHumanDate } from '../../context/BookingContext';
import { BookingProgressBar } from './BookingProgressBar';
import { SALON_BRANCH_INFO } from '../../data/services-catalog';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  Users,
  FileText,
  MapPin,
  Home,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
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
  const isHome = bookingType === 'home';

  const handleEdit = (stepNumber: 1 | 2 | 3) => {
    setStep(stepNumber);
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
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to confirm booking. Please try again.';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-container booking-step4-container">
      {/* Main Title & Subtitle */}
      <div className="booking-header-area">
        <h1 className="booking-main-title">Review Your Appointment</h1>
        <p className="booking-main-subtitle">
          Please review your details below and confirm your appointment.
        </p>
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

      {/* ONE SINGLE COMBINED REVIEW CARD (Exact match to Reference Image 4) */}
      <div className="booking-single-card-wrap">
        <div className="booking-card unified-review-card">
          {/* Top: Service Section */}
          <div className="review-service-header">
            <img
              src={service.thumb}
              alt={service.name}
              className="review-service-image"
            />
            <div className="review-service-meta">
              <h2 className="review-service-title">{service.name}</h2>
              <p className="review-service-desc">{service.desc}</p>
            </div>
          </div>

          <div className="review-divider" />

          {/* Details Information Rows */}
          <div className="review-rows-list">
            {/* 1. Date */}
            <div className="review-row-item">
              <div className="review-row-left">
                <CalendarIcon size={18} className="review-row-icon" />
                <span className="review-row-label">Date</span>
              </div>
              <div className="review-row-right">
                <span className="review-row-value">{formattedDate}</span>
                <button
                  type="button"
                  className="review-row-edit-btn"
                  onClick={() => handleEdit(1)}
                  aria-label="Edit Date"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* 2. Time */}
            <div className="review-row-item">
              <div className="review-row-left">
                <Clock size={18} className="review-row-icon" />
                <span className="review-row-label">Time</span>
              </div>
              <div className="review-row-right">
                <span className="review-row-value">{selectedTime}</span>
                <button
                  type="button"
                  className="review-row-edit-btn"
                  onClick={() => handleEdit(2)}
                  aria-label="Edit Time"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* 3. Full Name */}
            <div className="review-row-item">
              <div className="review-row-left">
                <User size={18} className="review-row-icon" />
                <span className="review-row-label">Full Name</span>
              </div>
              <div className="review-row-right">
                <span className="review-row-value">
                  {customerDetails.fullName || 'Not provided'}
                </span>
                <button
                  type="button"
                  className="review-row-edit-btn"
                  onClick={() => handleEdit(3)}
                  aria-label="Edit Full Name"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* 4. Phone Number */}
            <div className="review-row-item">
              <div className="review-row-left">
                <Phone size={18} className="review-row-icon" />
                <span className="review-row-label">Phone Number</span>
              </div>
              <div className="review-row-right">
                <span className="review-row-value">{customerDetails.phone || 'Not provided'}</span>
                <button
                  type="button"
                  className="review-row-edit-btn"
                  onClick={() => handleEdit(3)}
                  aria-label="Edit Phone Number"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* 5. Email */}
            <div className="review-row-item">
              <div className="review-row-left">
                <Mail size={18} className="review-row-icon" />
                <span className="review-row-label">Email</span>
              </div>
              <div className="review-row-right">
                <span className="review-row-value">{customerDetails.email || 'Not provided'}</span>
                <button
                  type="button"
                  className="review-row-edit-btn"
                  onClick={() => handleEdit(3)}
                  aria-label="Edit Email"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* 6. Gender */}
            <div className="review-row-item">
              <div className="review-row-left">
                <Users size={18} className="review-row-icon" />
                <span className="review-row-label">Gender</span>
              </div>
              <div className="review-row-right">
                <span className="review-row-value">{customerDetails.gender || 'Male'}</span>
                <button
                  type="button"
                  className="review-row-edit-btn"
                  onClick={() => handleEdit(3)}
                  aria-label="Edit Gender"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* 7. Special Requests */}
            <div className="review-row-item">
              <div className="review-row-left">
                <FileText size={18} className="review-row-icon" />
                <span className="review-row-label">Special Requests</span>
              </div>
              <div className="review-row-right">
                <span className="review-row-value">
                  {customerDetails.specialRequest ? customerDetails.specialRequest : 'None'}
                </span>
                <button
                  type="button"
                  className="review-row-edit-btn"
                  onClick={() => handleEdit(3)}
                  aria-label="Edit Special Requests"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* 8. Branch (Salon) OR Address (Home) */}
            <div className="review-row-item">
              <div className="review-row-left">
                {isHome ? (
                  <Home size={18} className="review-row-icon" />
                ) : (
                  <MapPin size={18} className="review-row-icon" />
                )}
                <span className="review-row-label">{isHome ? 'Service Address' : 'Branch'}</span>
              </div>
              <div className="review-row-right branch-right-cell">
                {isHome ? (
                  <span className="review-row-value">
                    {customerDetails.deliveryAddress || 'Not provided'}
                  </span>
                ) : (
                  <div className="review-branch-block">
                    <span className="review-row-value">{SALON_BRANCH_INFO.shortName}</span>
                    <span className="review-branch-sub">Moodbidri, Karnataka</span>
                  </div>
                )}
                <button
                  type="button"
                  className="review-row-edit-btn"
                  onClick={() => handleEdit(3)}
                  aria-label={isHome ? 'Edit Service Address' : 'Edit Branch'}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Below the Card: Terms Checkbox & Confirm Booking Button */}
        <div className="review-footer-action-block">
          <label className="review-terms-label">
            <input
              type="checkbox"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="review-terms-checkbox"
            />
            <span className="review-terms-text">
              I agree to the{' '}
              <a href="/terms" target="_blank" rel="noreferrer" className="review-terms-link">
                Terms &amp; Conditions
              </a>{' '}
              and{' '}
              <a href="/cancellation-policy" target="_blank" rel="noreferrer" className="review-terms-link">
                Cancellation Policy
              </a>
              .
            </span>
          </label>

          <button
            type="button"
            className="booking-primary-btn review-confirm-btn w-full"
            disabled={isSubmitting || !termsAgreed}
            onClick={handleConfirm}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Confirming Booking...</span>
              </>
            ) : (
              <>
                <span>Confirm Booking</span>
                <ArrowRight size={18} className="btn-arrow-icon" />
              </>
            )}
          </button>

          <button
            type="button"
            className="booking-back-link-btn"
            onClick={() => handleEdit(3)}
          >
            <ArrowLeft size={16} />
            <span>Back to Your Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};
