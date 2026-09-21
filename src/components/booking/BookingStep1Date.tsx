import React, { useState, useMemo } from 'react';
import { useBooking, formatHumanDate } from '../../context/BookingContext';
import { BookingProgressBar } from './BookingProgressBar';
import { SALON_BRANCH_INFO } from '../../data/services-catalog';
import { Clock, Tag, MapPin, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export const BookingStep1Date: React.FC = () => {
  const {
    service,
    selectedDate,
    setSelectedDate,
    setStep,
  } = useBooking();

  const [calendarViewDate, setCalendarViewDate] = useState<Date>(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

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

    // Next month padding to fill grid
    const remaining = (35 - days.length > 0 ? 35 - days.length : 42 - days.length);
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [calendarViewDate]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const handleSelectDate = (d: Date) => {
    const chosen = new Date(d);
    chosen.setHours(0, 0, 0, 0);
    if (chosen < today) return; // Cannot pick past dates
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
    setStep(2);
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
          <span className="booking-breadcrumb-current">Select Date</span>
        </div>
        <div className="booking-tagline">SAME CONFIDENCE AT HOME</div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="booking-header-area">
        <h1 className="booking-main-title">Select Your Date</h1>
        <p className="booking-main-subtitle">Choose your preferred date for your appointment.</p>
      </div>

      {/* 5-Step Progress Indicator */}
      <BookingProgressBar currentStep={1} />

      {/* Main 2-Column Layout */}
      <div className="booking-content-grid">
        {/* LEFT COLUMN: Large Calendar Card */}
        <div className="booking-left-col">
          <div className="booking-card calendar-card">
            {/* Month & Year Navigation */}
            <div className="calendar-header-nav">
              <button
                type="button"
                className="calendar-nav-btn"
                onClick={prevMonth}
                aria-label="Previous Month"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="calendar-month-year">
                {monthNames[calendarViewDate.getMonth()]} {calendarViewDate.getFullYear()}
              </div>
              <button
                type="button"
                className="calendar-nav-btn"
                onClick={nextMonth}
                aria-label="Next Month"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Weekday Labels */}
            <div className="calendar-weekdays-row">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Days Grid */}
            <div className="calendar-days-grid">
              {daysInMonth.map((dayObj, i) => {
                const dayDate = dayObj.date;
                const isPast = dayDate < today;
                const isSelected = isSameDay(dayDate, selectedDate);
                const isCurrent = dayObj.isCurrentMonth;

                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => handleSelectDate(dayDate)}
                    disabled={isPast}
                    className={`calendar-day-cell ${
                      !isCurrent ? 'other-month' : ''
                    } ${isPast ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
                    aria-label={formatHumanDate(dayDate)}
                  >
                    <span className="day-number">{dayDate.getDate()}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Status / Selection Notice */}
            <div className="calendar-footer-note">
              <CalendarIcon size={16} className="note-icon" />
              <span>Select a date to continue.</span>
            </div>
          </div>

          {/* Mobile Only Continue Button */}
          <div className="booking-mobile-action-wrap">
            <button
              type="button"
              className="booking-primary-btn w-full"
              onClick={handleContinue}
            >
              <span>Continue</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
            <div className="booking-btn-subtext">Choose your time in the next step.</div>
          </div>
        </div>

        {/* RIGHT COLUMN: Your Appointment Card (Desktop Only) */}
        <aside className="booking-right-col">
          <div className="booking-card appointment-summary-card">
            <h2 className="appointment-card-title">Your Appointment</h2>

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
              onClick={handleContinue}
            >
              <span>Continue</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
            <div className="booking-btn-subtext">Choose your time in the next step.</div>
          </div>
        </aside>
      </div>
    </div>
  );
};
