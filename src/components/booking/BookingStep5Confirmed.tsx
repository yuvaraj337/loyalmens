import React from 'react';
import { useBooking } from '../../context/BookingContext';
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
  Check,
  Scissors,
  ArrowRight,
} from 'lucide-react';

export const BookingStep5Confirmed: React.FC = () => {
  const {
    service,
    selectedDate,
    selectedTime,
    latestBooking,
    customerDetails,
    bookingType,
    resetBookingFlow,
  } = useBooking();

  const isHome = latestBooking?.booking_type === 'home' || bookingType === 'home';

  const handleBackToHome = () => {
    resetBookingFlow();
    window.location.href = '/';
  };

  const bookingId = latestBooking?.booking_id || 'LYP20260922001';
  const bookingDate =
    latestBooking?.date ||
    selectedDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  const bookingTime = latestBooking?.time || selectedTime || '09:30 AM';
  const serviceThumb = latestBooking?.service_image || service.thumb;
  const serviceName = latestBooking?.service_name || service.name;
  const serviceDesc = service.desc;

  const customerName = latestBooking?.customer_name || customerDetails.fullName || 'Valued Guest';
  const customerPhone = latestBooking?.phone || customerDetails.phone || 'Not provided';
  const customerEmail = latestBooking?.email || customerDetails.email || 'Not provided';
  const customerGender = latestBooking?.gender || customerDetails.gender || 'Male';
  const customerRequests =
    latestBooking?.special_request || customerDetails.specialRequest || 'None';
  const deliveryAddress =
    latestBooking?.delivery_address || customerDetails.deliveryAddress || 'Not provided';

  return (
    <div className="booking-container booking-step5-container">
      {/* Top Header / Brand Row matching Reference Image 5 */}
      <div className="confirmation-brand-header">
        <div className="confirmation-brand-left">
          <img
            src="/images/crown_logo.png"
            alt="Loyal Crown Logo"
            className="confirmation-brand-crown"
          />
          <div className="confirmation-brand-titles">
            <span className="confirmation-brand-main">LOYAL</span>
            <span className="confirmation-brand-mid">PROFESSIONAL</span>
            <span className="confirmation-brand-sub">MEN&apos;S SALON</span>
          </div>
        </div>
        <div className="confirmation-brand-right">
          <span>GOOD HAIR</span>
          <span>BETTER MOOD</span>
        </div>
      </div>

      {/* 5-Step Progress Indicator: Step 5 active */}
      <BookingProgressBar currentStep={5} />

      {/* Confirmation Celebration Hero matching Reference Image 5 */}
      <div className="confirmation-hero-area">
        <div className="confirmation-burst-badge-wrap">
          {/* Subtle radial bursts */}
          <div className="burst-spoke b1" />
          <div className="burst-spoke b2" />
          <div className="burst-spoke b3" />
          <div className="burst-spoke b4" />
          <div className="burst-spoke b5" />
          <div className="burst-spoke b6" />
          <div className="burst-spoke b7" />
          <div className="burst-spoke b8" />
          <div className="confirmation-check-circle-gold">
            <Check size={32} strokeWidth={2.6} className="check-gold-icon" />
          </div>
        </div>

        <h1 className="confirmation-main-title">Booking Confirmed!</h1>
        <p className="confirmation-main-sub">Your appointment has been successfully booked.</p>
        <p className="confirmation-sub-note">
          A confirmation message has been sent to your phone number and email.
        </p>
      </div>

      {/* Main Column of Cards matching Reference Image 5 */}
      <div className="booking-single-card-wrap">
        {/* CARD 1: Appointment Details */}
        <div className="booking-card confirmation-details-card">
          <div className="confirmation-details-header">
            <h2 className="confirmation-card-heading">Appointment Details</h2>
            <span className="confirmation-id-pill">{bookingId}</span>
          </div>

          {/* Service Meta */}
          <div className="confirmation-service-preview">
            <img
              src={serviceThumb}
              alt={serviceName}
              className="confirmation-service-thumb"
            />
            <div className="confirmation-service-info">
              <h3 className="confirmation-service-name">{serviceName}</h3>
              <p className="confirmation-service-desc">{serviceDesc}</p>
            </div>
          </div>

          <div className="confirmation-card-divider" />

          {/* Details Rows */}
          <div className="confirmation-rows-list">
            {/* 1. Date */}
            <div className="confirmation-row-item">
              <div className="confirmation-row-left">
                <CalendarIcon size={18} className="conf-icon" />
                <span className="conf-label">Date</span>
              </div>
              <div className="confirmation-row-right">
                <span className="conf-value">{bookingDate}</span>
              </div>
            </div>

            {/* 2. Time */}
            <div className="confirmation-row-item">
              <div className="confirmation-row-left">
                <Clock size={18} className="conf-icon" />
                <span className="conf-label">Time</span>
              </div>
              <div className="confirmation-row-right">
                <span className="conf-value">{bookingTime}</span>
              </div>
            </div>

            {/* 3. Branch / Address */}
            <div className="confirmation-row-item">
              <div className="confirmation-row-left">
                {isHome ? (
                  <Home size={18} className="conf-icon" />
                ) : (
                  <MapPin size={18} className="conf-icon" />
                )}
                <span className="conf-label">{isHome ? 'Service Address' : 'Branch'}</span>
              </div>
              <div className="confirmation-row-right">
                {isHome ? (
                  <span className="conf-value">{deliveryAddress}</span>
                ) : (
                  <div className="conf-branch-block">
                    <span className="conf-value">{SALON_BRANCH_INFO.shortName}</span>
                    <span className="conf-branch-sub">Moodbidri, Karnataka</span>
                  </div>
                )}
              </div>
            </div>

            {/* 4. Full Name */}
            <div className="confirmation-row-item">
              <div className="confirmation-row-left">
                <User size={18} className="conf-icon" />
                <span className="conf-label">Full Name</span>
              </div>
              <div className="confirmation-row-right">
                <span className="conf-value">{customerName}</span>
              </div>
            </div>

            {/* 5. Phone Number */}
            <div className="confirmation-row-item">
              <div className="confirmation-row-left">
                <Phone size={18} className="conf-icon" />
                <span className="conf-label">Phone Number</span>
              </div>
              <div className="confirmation-row-right">
                <span className="conf-value">{customerPhone}</span>
              </div>
            </div>

            {/* 6. Email */}
            <div className="confirmation-row-item">
              <div className="confirmation-row-left">
                <Mail size={18} className="conf-icon" />
                <span className="conf-label">Email</span>
              </div>
              <div className="confirmation-row-right">
                <span className="conf-value">{customerEmail}</span>
              </div>
            </div>

            {/* 7. Gender */}
            <div className="confirmation-row-item">
              <div className="confirmation-row-left">
                <Users size={18} className="conf-icon" />
                <span className="conf-label">Gender</span>
              </div>
              <div className="confirmation-row-right">
                <span className="conf-value">{customerGender}</span>
              </div>
            </div>

            {/* 8. Special Requests */}
            <div className="confirmation-row-item">
              <div className="confirmation-row-left">
                <FileText size={18} className="conf-icon" />
                <span className="conf-label">Special Requests</span>
              </div>
              <div className="confirmation-row-right">
                <span className="conf-value">{customerRequests}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: What's Next? */}
        <div className="booking-card whats-next-card">
          <h2 className="whats-next-heading">What&apos;s Next?</h2>

          <div className="whats-next-items">
            {/* 1. Reminder */}
            <div className="whats-next-item">
              <div className="whats-next-icon-bubble">
                <CalendarIcon size={18} />
              </div>
              <div className="whats-next-content">
                <h3 className="whats-next-item-title">You&apos;ll receive a reminder</h3>
                <p className="whats-next-item-desc">
                  We&apos;ll send a reminder before your appointment.
                </p>
              </div>
            </div>

            {/* 2. Be on time */}
            <div className="whats-next-item">
              <div className="whats-next-icon-bubble">
                <Clock size={18} />
              </div>
              <div className="whats-next-content">
                <h3 className="whats-next-item-title">Be on time</h3>
                <p className="whats-next-item-desc">Please arrive 5–10 minutes early.</p>
              </div>
            </div>

            {/* 3. Get ready */}
            <div className="whats-next-item">
              <div className="whats-next-icon-bubble">
                <Scissors size={18} />
              </div>
              <div className="whats-next-content">
                <h3 className="whats-next-item-title">Get ready for a great experience</h3>
                <p className="whats-next-item-desc">Our team will take care of the rest.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Back to Home Button */}
        <div className="confirmation-action-wrap">
          <button
            type="button"
            className="booking-primary-btn w-full back-home-btn"
            onClick={handleBackToHome}
          >
            <Home size={18} className="btn-home-icon" />
            <span>Back to Home</span>
            <ArrowRight size={18} className="btn-arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};
