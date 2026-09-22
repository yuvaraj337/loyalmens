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
  Receipt,
  Truck,
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
  const deliveryAddress = latestBooking?.delivery_address || customerDetails.deliveryAddress;

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

  const subtotal = latestBooking?.subtotal ?? (() => {
    const match = servicePrice.replace(/,/g, '').match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  })();
  const gst = latestBooking?.gst ?? Math.round(subtotal * 0.12);
  const deliveryCharge = latestBooking?.delivery_charge ?? 50;
  const totalAmount = latestBooking?.total_amount ?? (subtotal + gst + deliveryCharge);

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
        <div className="booking-tagline">{isHome ? 'RIZHEENA AT HOME' : 'SAME CONFIDENCE AT HOME'}</div>
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

            {/* Price breakdown */}
            <div className="confirmation-detail-row">
              <div className="confirmation-detail-left">
                <Tag size={16} className="detail-icon" />
                <span>Subtotal</span>
              </div>
              <div className="confirmation-detail-val">₹{subtotal.toLocaleString('en-IN')}</div>
            </div>

            <div className="confirmation-detail-row">
              <div className="confirmation-detail-left">
                <Receipt size={16} className="detail-icon" />
                <span>GST (12%)</span>
              </div>
              <div className="confirmation-detail-val">₹{gst.toLocaleString('en-IN')}</div>
            </div>

            <div className="confirmation-detail-row">
              <div className="confirmation-detail-left">
                <Truck size={16} className="detail-icon" />
                <span>Delivery Charges</span>
              </div>
              <div className="confirmation-detail-val">₹{deliveryCharge.toLocaleString('en-IN')}</div>
            </div>

            <div className="confirmation-detail-row" style={{ borderTop: '1px dashed #E5E7EB', paddingTop: '8px', marginTop: '4px' }}>
              <div className="confirmation-detail-left">
                <Tag size={16} className="detail-icon" />
                <strong>Total Amount</strong>
              </div>
              <div className="confirmation-detail-val" style={{ fontWeight: 700, color: '#111827', fontSize: '1.05rem' }}>
                ₹{totalAmount.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Branch or At Home Location */}
            {isHome ? (
              <>
                <div className="confirmation-detail-row">
                  <div className="confirmation-detail-left">
                    <MapPin size={16} className="detail-icon" />
                    <span>Service</span>
                  </div>
                  <div className="confirmation-detail-val">
                    <strong style={{ color: '#D4AF37' }}>RIZHEENA AT HOME</strong>
                  </div>
                </div>

                <div className="confirmation-detail-row">
                  <div className="confirmation-detail-left">
                    <MapPin size={16} className="detail-icon" />
                    <span>Address</span>
                  </div>
                  <div className="confirmation-detail-val branch-val" style={{ maxWidth: '240px', textAlign: 'right' }}>
                    <span style={{ fontSize: '0.9rem', color: '#111827', fontWeight: 500, lineHeight: 1.4, display: 'block' }}>
                      {deliveryAddress || 'Doorstep Concierge Location'}
                    </span>
                  </div>
                </div>
              </>
            ) : (
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
            )}
          </div>
        </div>

        {/* CARD 2: What's Next? */}
        <div className="booking-card confirmation-card whats-next-card">
          <h2 className="confirmation-card-title">What's Next?</h2>

          <div className="whats-next-list">
            {isHome ? (
              <>
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
                    <h3 className="whats-next-item-title">Doorstep Arrival</h3>
                    <p className="whats-next-item-desc">Our professional stylist will arrive 5–10 minutes early at your location.</p>
                  </div>
                </div>

                <div className="whats-next-item">
                  <div className="whats-next-icon-box">
                    <Scissors size={18} />
                  </div>
                  <div className="whats-next-item-text">
                    <h3 className="whats-next-item-title">Sanitized &amp; Prepared</h3>
                    <p className="whats-next-item-desc">Our team brings all luxury tools, fresh towels and organic products.</p>
                  </div>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
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
