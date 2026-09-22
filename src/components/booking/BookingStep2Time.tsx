import React, { useState } from 'react';
import { useBooking, formatHumanDate } from '../../context/BookingContext';
import { BookingProgressBar } from './BookingProgressBar';
import {
  Calendar as CalendarIcon,
  Sun,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';

export const BookingStep2Time: React.FC = () => {
  const {
    selectedDate,
    selectedTime,
    setSelectedTime,
    isTimeExplicitlySelected,
    getTimeSlotsForDate,
    setStep,
  } = useBooking();

  const [errorMessage, setErrorMessage] = useState<string>('');

  const formattedDate = formatHumanDate(selectedDate);
  const slots = getTimeSlotsForDate(selectedDate);

  const morningSlots = slots.filter((s) => s.period === 'Morning');
  const afternoonSlots = slots.filter((s) => s.period === 'Afternoon');
  const eveningSlots = slots.filter((s) => s.period === 'Evening');

  const handleSelectSlot = (time: string, isAvailable: boolean) => {
    if (!isAvailable) return;
    setSelectedTime(time);
    setErrorMessage('');
  };

  const handleContinue = () => {
    if (!isTimeExplicitlySelected || !selectedTime) {
      setErrorMessage('Please choose a time to continue.');
      const slotsElement = document.getElementById('available-time-slots');
      if (slotsElement) {
        slotsElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setErrorMessage('');
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChangeDate = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="booking-container booking-step2-container">
      {/* Main Title & Dynamic Subtitle */}
      <div className="booking-header-area">
        <h1 className="booking-main-title">Select Your Time</h1>
        <p className="booking-main-subtitle">Choose a convenient time slot on {formattedDate}.</p>
      </div>

      {/* 5-Step Progress Indicator: Step 2 active */}
      <BookingProgressBar currentStep={2} />

      {/* Single Unified Content Column */}
      <div className="booking-single-card-wrap">
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
        <div id="available-time-slots" className="booking-card timeslots-card">
          <h2 className="timeslots-section-title">Available Time Slots</h2>

          {errorMessage && (
            <div
              className="time-slot-error-banner"
              role="alert"
              style={{
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                color: '#B91C1C',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertCircle size={18} color="#DC2626" style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

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
              <Sun size={17} className="slot-group-icon" />
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
        </div>

        {/* Action Buttons below the Time Slots Card */}
        <div className="booking-step-action-wrap">
          <button
            type="button"
            className="booking-primary-btn w-full"
            onClick={handleContinue}
          >
            <span>Continue</span>
            <ArrowRight size={18} className="btn-arrow-icon" />
          </button>
          <div className="booking-btn-subtext">Enter your details in the next step.</div>

          <button
            type="button"
            className="booking-back-link-btn"
            onClick={handleChangeDate}
          >
            <ArrowLeft size={16} />
            <span>Back to Date Selection</span>
          </button>
        </div>
      </div>
    </div>
  );
};
