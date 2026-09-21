import React from 'react';

export const LifestylePreview: React.FC = () => {
  return (
    <div className="lifestyle-peek-section" aria-label="Section Preview">
      <div className="lifestyle-peek-container">
        <div className="lifestyle-left">
          <span className="lifestyle-eyebrow">IT'S A LIFESTYLE</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '32px' }}>
            <h2 className="lifestyle-title">
              Self-Care<br />
              Looks Good On You.
            </h2>
            <div
              style={{
                width: '70px',
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                marginBottom: '14px',
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="lifestyle-right">
          <div style={{ textAlign: 'right' }}>
            <div className="lifestyle-brand">LOYAL</div>
            <div className="lifestyle-sub">MEN'S PARLOUR</div>
          </div>
          <div className="lifestyle-dots" aria-hidden="true">
            <span className="lifestyle-dot active" />
            <span className="lifestyle-dot" />
            <span className="lifestyle-dot" />
          </div>
        </div>
      </div>
    </div>
  );
};
