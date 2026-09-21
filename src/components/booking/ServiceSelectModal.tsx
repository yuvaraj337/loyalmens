import React from 'react';
import { getServicesCatalog } from '../../data/services-catalog';
import { ServiceBookingItem } from '../../types/booking';

interface ServiceSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (svc: ServiceBookingItem) => void;
  selectedId: string;
}

export const ServiceSelectModal: React.FC<ServiceSelectModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedId,
}) => {
  if (!isOpen) return null;

  const catalog = getServicesCatalog();

  return (
    <div className="service-select-modal-overlay" onClick={onClose}>
      <div className="service-select-modal" onClick={(e) => e.stopPropagation()}>
        <div className="service-select-modal-header">
          <h3 className="service-select-modal-title">Select a Service</h3>
          <button
            type="button"
            className="calendar-nav-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="service-select-modal-list">
          {catalog.map((svc) => (
            <div
              key={svc.id}
              className={`service-select-modal-item ${svc.id === selectedId ? 'active' : ''}`}
              onClick={() => {
                onSelect(svc);
                onClose();
              }}
            >
              <img src={svc.thumb} alt={svc.name} className="service-select-modal-thumb" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '14.5px', color: '#111' }}>
                  {svc.name}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>{svc.category} • {svc.duration}</div>
              </div>
              <div style={{ fontWeight: 700, color: '#C8A366', fontSize: '15px' }}>
                {svc.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
