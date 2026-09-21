import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { BookingProgressBar } from './BookingProgressBar';
import { SALON_BRANCH_INFO } from '../../data/services-catalog';
import {
  Clock,
  Tag,
  MapPin,
  Calendar as CalendarIcon,
  Check,
  Scissors,
  Home,
  ArrowRight,
} from 'lucide-react';

export const BookingStep5Confirmed: React.FC = () => {
  const {
    service,
    selectedDate,
    selectedTime,
    latestBooking,
    resetBookingFlow,
  } = useBooking();

  const handleBackToHome = () => {
    resetBookingFlow();
    window.location.href = '/';
  };

  const bookingId = latestBooking?.booking_id || '#RZP20260921';
  const bookingDate = latestBooking?.date || selectedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const bookingTime = latestBooking?.time || selectedTime || '01:30 PM';
  const serviceThumb = latestBooking?.service_image || service.thumb;
  const serviceName = latestBooking?.service_name || service.name;
  const serviceDesc = service.desc;
  const serviceDuration = latestBooking?.duration || service.duration;
  const servicePrice = latestBooking?.service_price || service.price;

  return (
    <div className="booking-container confirmation-page-container">
      {/* Top Breadcrumbs */}
      <div className="booking-breadcrumbs">
        <div className="booking-breadcrumbs-left">
          <a href="/" className="booking-breadcrumb-link">Home</a>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <a href="/services" className="booking-breadcrumb-link">Services</a>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <a href={`/services/${service.id}`} className="booking-breadcrumb-link">{service.name}</a>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <span className="booking-breadcrumb-sep-text">Select Date</span>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <span className="booking-breadcrumb-sep-text">Select Time</span>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <span className="booking-breadcrumb-sep-text">Your Details</span>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <span className="booking-breadcrumb-sep-text">Review</span>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <span className="booking-breadcrumb-current">Confirmation</span>
        </div>
        <div className="booking-tagline">SAME CONFIDENCE AT HOME</div>
      </div>

      {/* 5-Step Progress Indicator: Step 5 active */}
      <BookingProgressBar currentStep={5} />

      {/* Confirmation Celebration Header */}
      <div className="confirmation-hero-area">
        {/* Animated Gold Checkmark with Confetti particles */}
        <div className="confirmation-badge-wrapper">
          <div className="confetti-particle p1" />
          <div className="confetti-particle p2" />
          <div className="confetti-particle p3" />
          <div className="confetti-particle p4" />
          <div className="confetti-particle p5" />
          <div className="confetti-particle p6" />
          <div className="confetti-particle p7" />
          <div className="confetti-particle p8" />
          <div className="confirmation-check-circle">
            <Check size={42} strokeWidth={2.8} className="check-icon" />
          </div>
        </div>

        <h1 className="confirmation-main-title">Booking Confirmed!</h1>
        <p className="confirmation-main-sub">Your appointment has been successfully booked.</p>
        <p className="confirmation-sub-note">
          A confirmation message has been sent to your phone number and email.
        </p>
      </div>

      {/* Two Cards Side-by-Side: Appointment Details + What's Next */}
      <div className="confirmation-grid">
        {/* CARD 1: Appointment Details */}
        <div className="booking-card confirmation-card">
          <div className="confirmation-card-top">
            <h2 className="confirmation-card-title">Appointment Details</h2>
            <span className="confirmation-ref-id">{bookingId}</span>
          </div>

          <div className="appointment-service-preview">
            <img
              src={serviceThumb}
              alt={serviceName}
              className="appointment-service-thumb"
            />
            <div className="appointment-service-info">
              <h3 className="appointment-service-name">{serviceName}</h3>
              <p className="appointment-service-desc">{serviceDesc}</p>
            </div>
          </div>

          <div className="confirmation-details-list">
            <div className="confirmation-detail-row">
              <div className="confirmation-detail-left">
                <CalendarIcon size={16} className="detail-icon" />
                <span>Date</span>
              </div>
              <div className="confirmation-detail-val">{bookingDate}</div>
            </div>

            <div className="confirmation-detail-row">
              <div className="confirmation-detail-left">
                <Clock size={16} className="detail-icon" />
                <span>Time</span>
              </div>
              <div className="confirmation-detail-val">{bookingTime}</div>
            </div>

            <div className="confirmation-detail-row">
              <div className="confirmation-detail-left">
                <Clock size={16} className="detail-icon" />
                <span>Duration</span>
              </div>
              <div className="confirmation-detail-val">{serviceDuration}</div>
            </div>

            <div className="confirmation-detail-row">
              <div className="confirmation-detail-left">
                <Tag size={16} className="detail-icon" />
                <span>Price</span>
              </div>
              <div className="confirmation-detail-val">{servicePrice}</div>
            </div>

            <div className="confirmation-detail-row">
              <div className="confirmation-detail-left">
                <MapPin size={16} className="detail-icon" />
                <span>Branch</span>
              </div>
              <div className="confirmation-detail-val branch-val">
                <strong>{SALON_BRANCH_INFO.shortName}</strong>
                <small>Moodbidri, Karnataka</small>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: What's Next? */}
        <div className="booking-card confirmation-card whats-next-card">
          <h2 className="confirmation-card-title">What's Next?</h2>

          <div className="whats-next-list">
            <div className="whats-next-item">
              <div className="whats-next-icon-box">
                <CalendarIcon size={18} />
              </div>
              <div className="whats-next-item-text">
                <h3 className="whats-next-item-title">You'll receive a reminder</h3>
                <p className="whats-next-item-desc">We'll send a reminder before your appointment.</p>
              </div>
            </div>

            <div className="whats-next-item">
              <div className="whats-next-icon-box">
                <Clock size={18} />
              </div>
              <div className="whats-next-item-text">
                <h3 className="whats-next-item-title">Be on time</h3>
                <p className="whats-next-item-desc">Please arrive 5–10 minutes early.</p>
              </div>
            </div>

            <div className="whats-next-item">
              <div className="whats-next-icon-box">
                <Scissors size={18} />
              </div>
              <div className="whats-next-item-text">
                <h3 className="whats-next-item-title">Get ready for a great experience</h3>
                <p className="whats-next-item-desc">Our team will take care of the rest.</p>
              </div>
            </div>
          </div>

          {/* Single Action Button: Back to Home -> */}
          <div className="confirmation-actions-area">
            <button
              type="button"
              className="booking-primary-btn w-full back-to-home-btn"
              onClick={handleBackToHome}
            >
              <Home size={18} />
              <span>Back to Home</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
