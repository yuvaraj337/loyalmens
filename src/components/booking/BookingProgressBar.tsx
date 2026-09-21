import React from 'react';

interface BookingProgressBarProps {
  currentStep: 1 | 2 | 3 | 4 | 5;
}

export const BookingProgressBar: React.FC<BookingProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Date' },
    { num: 2, label: 'Time' },
    { num: 3, label: 'Your Details' },
    { num: 4, label: 'Review' },
    { num: 5, label: 'Confirmation' },
  ];

  return (
    <div className="booking-progress-wrap" aria-label="Booking Progress">
      <ol className="booking-progress-list">
        {steps.map((s, idx) => {
          const isActive = currentStep === s.num;
          const isCompleted = currentStep > s.num;

          return (
            <React.Fragment key={s.num}>
              <li
                className={`booking-progress-step ${
                  isActive ? 'active' : ''
                } ${isCompleted ? 'completed' : ''}`}
              >
                <div className="booking-progress-circle">
                  {s.num}
                </div>
                <span className="booking-progress-label">{s.label}</span>
              </li>

              {idx < steps.length - 1 && (
                <div className={`booking-progress-line ${currentStep > s.num ? 'filled' : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </div>
  );
};
