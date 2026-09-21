import React from 'react';
import { useBooking, formatHumanDate } from '../../context/BookingContext';
import { BookingProgressBar } from './BookingProgressBar';
import { SALON_BRANCH_INFO } from '../../data/services-catalog';
import {
  Clock,
  Tag,
  MapPin,
  Calendar as CalendarIcon,
  Sun,
  Moon,
  CheckCircle2,
} from 'lucide-react';

export const BookingStep2Time: React.FC = () => {
  const {
    service,
    selectedDate,
    selectedTime,
    setSelectedTime,
    getTimeSlotsForDate,
    setStep,
  } = useBooking();

  const formattedDate = formatHumanDate(selectedDate);
  const slots = getTimeSlotsForDate(selectedDate);

  const morningSlots = slots.filter((s) => s.period === 'Morning');
  const afternoonSlots = slots.filter((s) => s.period === 'Afternoon');
  const eveningSlots = slots.filter((s) => s.period === 'Evening');

  const handleSelectSlot = (time: string, isAvailable: boolean) => {
    if (!isAvailable) return;
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (!selectedTime) return;
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChangeDate = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <button type="button" onClick={handleChangeDate} className="booking-breadcrumb-link-btn">Select Date</button>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <span className="booking-breadcrumb-current">Select Time</span>
        </div>
        <div className="booking-tagline">SAME CONFIDENCE AT HOME</div>
      </div>

      {/* Main Title & Dynamic Subtitle */}
      <div className="booking-header-area">
        <h1 className="booking-main-title">Select Your Time</h1>
        <p className="booking-main-subtitle">Choose a convenient time slot on {formattedDate}.</p>
      </div>

      {/* 5-Step Progress Indicator: Step 2 active */}
      <BookingProgressBar currentStep={2} />

      {/* Main 2-Column Layout */}
      <div className="booking-content-grid">
        {/* LEFT COLUMN: Time Selection */}
        <div className="booking-left-col">
          {/* Selected Date Header Box with "Change Date" */}
          <div className="selected-date-banner">
            <div className="selected-date-banner-left">
              <CalendarIcon size={18} className="banner-cal-icon" />
              <span className="banner-date-text">{formattedDate}</span>
            </div>
            <button
              type="button"
              className="change-date-btn"
              onClick={handleChangeDate}
            >
              Change Date
            </button>
          </div>

          {/* Available Time Slots Card */}
          <div className="booking-card timeslots-card">
            <h2 className="timeslots-section-title">Available Time Slots</h2>

            {/* Morning Group */}
            <div className="slot-group">
              <div className="slot-group-header">
                <Sun size={17} className="slot-group-icon" />
                <span className="slot-group-label">Morning</span>
              </div>
              <div className="slots-grid">
                {morningSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      type="button"
                      key={slot.time}
                      disabled={!slot.isAvailable}
                      onClick={() => handleSelectSlot(slot.time, slot.isAvailable)}
                      className={`time-slot-btn ${isSelected ? 'selected' : ''} ${
                        !slot.isAvailable ? 'disabled' : ''
                      }`}
                      aria-label={`${slot.time} ${!slot.isAvailable ? '(Unavailable)' : ''}`}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Afternoon Group */}
            <div className="slot-group">
              <div className="slot-group-header">
                <Sun size={17} className="slot-group-icon" />
                <span className="slot-group-label">Afternoon</span>
              </div>
              <div className="slots-grid">
                {afternoonSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      type="button"
                      key={slot.time}
                      disabled={!slot.isAvailable}
                      onClick={() => handleSelectSlot(slot.time, slot.isAvailable)}
                      className={`time-slot-btn ${isSelected ? 'selected' : ''} ${
                        !slot.isAvailable ? 'disabled' : ''
                      }`}
                      aria-label={`${slot.time} ${!slot.isAvailable ? '(Unavailable)' : ''}`}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Evening Group */}
            <div className="slot-group">
              <div className="slot-group-header">
                <Moon size={17} className="slot-group-icon" />
                <span className="slot-group-label">Evening</span>
              </div>
              <div className="slots-grid">
                {eveningSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      type="button"
                      key={slot.time}
                      disabled={!slot.isAvailable}
                      onClick={() => handleSelectSlot(slot.time, slot.isAvailable)}
                      className={`time-slot-btn ${isSelected ? 'selected' : ''} ${
                        !slot.isAvailable ? 'disabled' : ''
                      }`}
                      aria-label={`${slot.time} ${!slot.isAvailable ? '(Unavailable)' : ''}`}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Status / Selection Notice */}
            <div className="slot-footer-status">
              <Clock size={16} className="slot-footer-icon" />
              <span>
                Selected Slot: <strong>{selectedTime ? `${selectedTime}, ${formattedDate}` : 'Please select a slot'}</strong>
              </span>
            </div>
          </div>

          {/* Mobile Only Action Button */}
          <div className="booking-mobile-action-wrap">
            <button
              type="button"
              className="booking-primary-btn w-full"
              disabled={!selectedTime}
              onClick={handleContinue}
            >
              <span>Continue</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
            <div className="booking-btn-subtext">Next: Enter your details</div>
          </div>
        </div>

        {/* RIGHT COLUMN: Your Appointment Card (Desktop Only) */}
        <aside className="booking-right-col">
          <div className="booking-card appointment-summary-card">
            <div className="appointment-card-top-row">
              <h2 className="appointment-card-title">Your Appointment</h2>
              <button
                type="button"
                className="appointment-edit-btn"
                onClick={handleChangeDate}
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

            <div className="appointment-details-list">
              <div className="appointment-detail-row">
                <div className="appointment-detail-left">
                  <CalendarIcon size={16} className="detail-icon" />
                  <span>Date</span>
                </div>
                <div className="appointment-detail-val">{formattedDate}</div>
              </div>

              <div className="appointment-detail-row">
                <div className="appointment-detail-left">
                  <Clock size={16} className="detail-icon" />
                  <span>Time</span>
                </div>
                <div className="appointment-detail-val">
                  {selectedTime || <span className="text-muted">Select a time</span>}
                </div>
              </div>

              <div className="appointment-detail-row">
                <div className="appointment-detail-left">
                  <Clock size={16} className="detail-icon" />
                  <span>Duration</span>
                </div>
                <div className="appointment-detail-val">{service.duration}</div>
              </div>

              <div className="appointment-detail-row">
                <div className="appointment-detail-left">
                  <Tag size={16} className="detail-icon" />
                  <span>Price</span>
                </div>
                <div className="appointment-detail-val">{service.price}</div>
              </div>

              <div className="appointment-detail-row">
                <div className="appointment-detail-left">
                  <MapPin size={16} className="detail-icon" />
                  <span>Branch</span>
                </div>
                <div className="appointment-detail-val branch-val">
                  <strong>{SALON_BRANCH_INFO.shortName}</strong>
                  <small>Moodbidri, Karnataka</small>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="booking-primary-btn w-full mt-6"
              disabled={!selectedTime}
              onClick={handleContinue}
            >
              <span>Continue</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
            <div className="booking-btn-subtext">Next: Enter your details</div>
          </div>
        </aside>
      </div>
    </div>
  );
};
