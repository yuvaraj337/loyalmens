import React, { useState, useMemo } from 'react';
import { useBooking, formatHumanDate, formatDateToIso } from '../../context/BookingContext';
import { BookingProgressBar } from './BookingProgressBar';
import { ServiceSelectModal } from './ServiceSelectModal';
import { SALON_BRANCH_INFO } from '../../data/services-catalog';

export const BookingStep1DateTime: React.FC = () => {
  const {
    service,
    setService,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    setStep,
    getTimeSlotsForDate,
  } = useBooking();

  const [calendarViewDate, setCalendarViewDate] = useState<Date>(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Month navigation
  const prevMonth = () => {
    setCalendarViewDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCalendarViewDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calendar calculations
  const daysInMonth = useMemo(() => {
    const year = calendarViewDate.getFullYear();
    const month = calendarViewDate.getMonth();
    const date = new Date(year, month, 1);
    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Previous month padding
    const firstDayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon ...
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    const totalDays = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month padding to fill full 5 or 6 weeks (up to 35 or 42 cells)
    const remaining = 35 - days.length > 0 ? 35 - days.length : 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [calendarViewDate]);

  // Today for past date check
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Time slots for selected date
  const slots = useMemo(() => getTimeSlotsForDate(selectedDate), [
    getTimeSlotsForDate,
    selectedDate,
  ]);

  const morningSlots = slots.filter((s) => s.period === 'Morning');
  const afternoonSlots = slots.filter((s) => s.period === 'Afternoon');
  const eveningSlots = slots.filter((s) => s.period === 'Evening');

  const handleSelectDate = (d: Date) => {
    const chosen = new Date(d);
    chosen.setHours(0, 0, 0, 0);
    if (chosen < today) return; // cannot pick past dates
    setSelectedDate(chosen);
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const handleContinue = () => {
    if (!selectedTime) return;
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
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
            <span className="booking-breadcrumb-current">Select Date &amp; Time</span>
          </nav>
          <div className="booking-tagline">SAME CONFIDENCE AT HOME</div>
        </div>

        {/* Heading */}
        <div className="booking-heading-row">
          <div className="booking-heading-col">
            <h1 className="booking-main-title">Select Date &amp; Time</h1>
            <p className="booking-main-subtitle">
              Pick your preferred date and time for your appointment.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <BookingProgressBar currentStep={1} />

        {/* 3-Column Booking Grid */}
        <div className="booking-grid-s1">
          {/* COLUMN 1: CALENDAR CARD */}
          <div className="booking-card calendar-card">
            <div className="calendar-header">
              <button
                type="button"
                className="calendar-nav-btn"
                onClick={prevMonth}
                aria-label="Previous month"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <h2 className="calendar-month-title">
                {monthNames[calendarViewDate.getMonth()]} {calendarViewDate.getFullYear()}
              </h2>
              <button
                type="button"
                className="calendar-nav-btn"
                onClick={nextMonth}
                aria-label="Next month"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            <div className="calendar-weekdays">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            <div className="calendar-days-grid">
              {daysInMonth.map((item, idx) => {
                const isPast = item.date < today;
                const isSelected = isSameDay(item.date, selectedDate);
                const isCurrentToday = isSameDay(item.date, new Date());

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isPast}
                    onClick={() => handleSelectDate(item.date)}
                    className={`calendar-day-cell ${
                      !item.isCurrentMonth ? 'other-month' : ''
                    } ${isSelected ? 'selected' : ''} ${
                      isCurrentToday ? 'today' : ''
                    }`}
                  >
                    {item.date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: TIME SLOTS CARD */}
          <div className="booking-card slots-card">
            <div className="slots-card-header">
              <h2 className="booking-card-title" style={{ margin: 0 }}>
                Available Time Slots
              </h2>
              <span className="slots-date-label">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Morning */}
            <div className="slots-group">
              <div className="slots-group-title">Morning</div>
              <div className="slots-grid">
                {morningSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.isAvailable}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`slot-btn ${isSelected ? 'selected' : ''}`}
                      title={slot.bookedReason}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Afternoon */}
            <div className="slots-group">
              <div className="slots-group-title">Afternoon</div>
              <div className="slots-grid">
                {afternoonSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.isAvailable}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`slot-btn ${isSelected ? 'selected' : ''}`}
                      title={slot.bookedReason}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Evening */}
            <div className="slots-group">
              <div className="slots-group-title">Evening</div>
              <div className="slots-grid">
                {eveningSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.isAvailable}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`slot-btn ${isSelected ? 'selected' : ''}`}
                      title={slot.bookedReason}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Note */}
            <div className="slots-footer-note">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>
                Selected Slot: <strong>{selectedTime}, {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
              </span>
            </div>
          </div>

          {/* COLUMN 3: YOUR APPOINTMENT SUMMARY CARD */}
          <div className="booking-card summary-card summary-card-col">
            <div className="summary-top-row">
              <h2 className="booking-card-title" style={{ margin: 0 }}>
                Your Appointment
              </h2>
              <button
                type="button"
                className="change-service-link"
                onClick={() => setIsServiceModalOpen(true)}
              >
                Change Service
              </button>
            </div>

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
              {/* Duration & Price */}
              <div className="summary-info-row">
                <span className="summary-info-left">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{service.duration}</span>
                </span>
                <span className="summary-info-right price">{service.price}</span>
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
            </div>

            <button
              type="button"
              className="booking-continue-btn"
              onClick={handleContinue}
            >
              <span>Continue</span>
              <span aria-hidden="true">&rarr;</span>
            </button>

            <div className="summary-step-note">
              You can confirm your details in the next step.
            </div>
          </div>
        </div>

        {/* Feature Strip */}
        <div className="booking-features-strip">
          <div className="booking-feature-item">
            <svg className="booking-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="6" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <line x1="20" y1="4" x2="8.12" y2="15.88" />
              <line x1="14.47" y1="14.48" x2="20" y2="20" />
              <line x1="8.12" y1="8.12" x2="12" y2="12" />
            </svg>
            <span className="booking-feature-text">Expert Stylists</span>
          </div>

          <div className="booking-feature-item">
            <svg className="booking-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="booking-feature-text">Hygiene First</span>
          </div>

          <div className="booking-feature-item">
            <svg className="booking-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="booking-feature-text">Premium Experience</span>
          </div>

          <div className="booking-feature-item">
            <svg className="booking-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="booking-feature-text">Personalized Care</span>
          </div>
        </div>
      </div>

      {/* Service Switcher Modal */}
      <ServiceSelectModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSelect={(svc) => setService(svc)}
        selectedId={service.id}
      />
    </>
  );
};
