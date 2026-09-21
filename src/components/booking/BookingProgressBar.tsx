import React from 'react';

interface BookingProgressBarProps {
  currentStep: 1 | 2 | 3 | 4;
}

export const BookingProgressBar: React.FC<BookingProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { num: 1, label: '1. Date & Time' },
    { num: 2, label: '2. Your Details' },
    { num: 3, label: '3. Review' },
    { num: 4, label: '4. Confirmation' },
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
                  {isCompleted ? (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    s.num
                  )}
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
