import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { getServicesCatalog, saveServiceOverride, SALON_BRANCH_INFO } from '../../data/services-catalog';
import { BookingStatus, PaymentStatus } from '../../types/booking';
import '../../styles/admin-bookings.css';

export const AdminBookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus } = useBooking();
  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'salon'>('bookings');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [services, setServices] = useState(() => getServicesCatalog());
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<string>('');

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'all') return true;
    return b.booking_status === statusFilter;
  });

  const handleSavePrice = (id: string) => {
    if (!newPrice.trim()) return;
    saveServiceOverride(id, { price: newPrice.trim() });
    setServices(getServicesCatalog());
    setEditingPriceId(null);
    setNewPrice('');
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-brand">
            <img src="/images/crown_logo.png" alt="Crown" style={{ width: '36px' }} />
            <div>
              <h1 className="admin-title">RIZHEENA ADMIN CONSOLE</h1>
              <div style={{ fontSize: '11px', color: '#A0988A' }}>
                Loyal Professional Men's Parlour • Owner Operations
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="admin-badge">Owner Access</span>
            <a
              href="/"
              style={{
                color: '#D4AF37',
                fontSize: '13px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              &larr; View Live Site
            </a>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="admin-nav-tabs">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            All Appointments ({bookings.length})
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Service Pricing &amp; Durations ({services.length})
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'salon' ? 'active' : ''}`}
            onClick={() => setActiveTab('salon')}
          >
            Branch &amp; Operating Hours
          </button>
        </div>

        {/* Overview Stats */}
        <div className="admin-grid-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-title">Total Bookings</div>
            <div className="admin-stat-val">{bookings.length}</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-title">Confirmed</div>
            <div className="admin-stat-val" style={{ color: '#48BB78' }}>
              {bookings.filter((b) => b.booking_status === 'confirmed').length}
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-title">Payment Verification</div>
            <div className="admin-stat-val" style={{ color: '#ED8936' }}>
              {bookings.filter((b) => b.booking_status === 'payment_verification').length}
            </div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-title">Active Services</div>
            <div className="admin-stat-val">{services.length}</div>
          </div>
        </div>

        {/* TAB 1: BOOKINGS LIST */}
        {activeTab === 'bookings' && (
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', margin: 0, fontWeight: 700, color: '#FFF' }}>
                Customer Appointments
              </h2>

              <div style={{ display: 'flex', gap: '8px' }}>
                {['all', 'confirmed', 'payment_verification', 'completed', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    style={{
                      background: statusFilter === st ? '#D4AF37' : 'rgba(255,255,255,0.06)',
                      color: statusFilter === st ? '#111' : '#DDD',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Service &amp; Price</th>
                    <th>Date &amp; Time</th>
                    <th>Status</th>
                    <th>Payment / UTR</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b.booking_id}>
                      <td style={{ fontWeight: 700, color: '#D4AF37' }}>{b.booking_id}</td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#FFF' }}>{b.customer_name}</div>
                        <div style={{ fontSize: '12px', color: '#888' }}>{b.phone}</div>
                        <div style={{ fontSize: '11px', color: '#666' }}>{b.email}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#FFF' }}>{b.service_name}</div>
                        <div style={{ color: '#D4AF37', fontSize: '12px' }}>{b.service_price} ({b.duration})</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#FFF' }}>{b.date}</div>
                        <div style={{ fontSize: '12px', color: '#AAA' }}>{b.time}</div>
                      </td>
                      <td>
                        <span className={`admin-status-pill admin-status-${b.booking_status === 'payment_verification' ? 'verification' : b.booking_status}`}>
                          {b.booking_status.replace('_', ' ')}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '12px', textTransform: 'capitalize' }}>
                          {b.payment_status.replace('_', ' ')}
                        </div>
                        {b.payment_utr && (
                          <div style={{ fontSize: '11px', color: '#D4AF37', fontWeight: 700 }}>
                            UTR: {b.payment_utr}
                          </div>
                        )}
                      </td>
                      <td>
                        {b.booking_status === 'payment_verification' && (
                          <button
                            type="button"
                            className="admin-action-btn"
                            onClick={() => updateBookingStatus(b.booking_id, 'confirmed', 'advance_paid')}
                          >
                            Verify &amp; Confirm
                          </button>
                        )}
                        {b.booking_status === 'confirmed' && (
                          <button
                            type="button"
                            className="admin-action-btn"
                            onClick={() => updateBookingStatus(b.booking_id, 'completed', 'fully_paid')}
                          >
                            Mark Completed
                          </button>
                        )}
                        {b.booking_status !== 'cancelled' && (
                          <button
                            type="button"
                            className="admin-action-btn"
                            style={{ borderColor: '#E53E3E', color: '#E53E3E' }}
                            onClick={() => updateBookingStatus(b.booking_id, 'cancelled')}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: '#888' }}>
                        No appointments found matching this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICE PRICING MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="admin-card">
            <h2 style={{ fontSize: '18px', margin: '0 0 16px 0', fontWeight: 700, color: '#FFF' }}>
              Dynamic Service Pricing &amp; Details
            </h2>
            <p style={{ fontSize: '13px', color: '#9C9588', marginBottom: '20px' }}>
              Prices modified here update dynamically across all customer booking cards and summaries in real-time.
            </p>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Category</th>
                    <th>Duration</th>
                    <th>Current Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((svc) => (
                    <tr key={svc.id}>
                      <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={svc.thumb} alt={svc.name} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                        <div style={{ fontWeight: 600, color: '#FFF' }}>{svc.name}</div>
                      </td>
                      <td>{svc.category}</td>
                      <td>{svc.duration}</td>
                      <td style={{ color: '#D4AF37', fontWeight: 700 }}>
                        {editingPriceId === svc.id ? (
                          <input
                            type="text"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            style={{
                              background: '#222',
                              color: '#FFF',
                              border: '1px solid #D4AF37',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              width: '100px',
                            }}
                          />
                        ) : (
                          svc.price
                        )}
                      </td>
                      <td>
                        {editingPriceId === svc.id ? (
                          <>
                            <button
                              type="button"
                              className="admin-action-btn"
                              onClick={() => handleSavePrice(svc.id)}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="admin-action-btn"
                              style={{ borderColor: '#666', color: '#AAA' }}
                              onClick={() => setEditingPriceId(null)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            className="admin-action-btn"
                            onClick={() => {
                              setEditingPriceId(svc.id);
                              setNewPrice(svc.price);
                            }}
                          >
                            Edit Price
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SALON LOCATION & HOURS */}
        {activeTab === 'salon' && (
          <div className="admin-card">
            <h2 style={{ fontSize: '18px', margin: '0 0 16px 0', fontWeight: 700, color: '#FFF' }}>
              Salon Location &amp; Booking Hours
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ background: '#110F0D', padding: '20px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.15)' }}>
                <h3 style={{ fontSize: '15px', color: '#D4AF37', marginBottom: '12px' }}>Main Salon Information</h3>
                <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#DDD' }}>
                  <strong>Salon:</strong> {SALON_BRANCH_INFO.name}<br />
                  <strong>Address:</strong> {SALON_BRANCH_INFO.address}<br />
                  <strong>Phone:</strong> {SALON_BRANCH_INFO.phone}<br />
                  <strong>UPI ID:</strong> {SALON_BRANCH_INFO.upiId}<br />
                </div>
              </div>

              <div style={{ background: '#110F0D', padding: '20px', borderRadius: '12px', border: '1px solid rgba(212,175,55,0.15)' }}>
                <h3 style={{ fontSize: '15px', color: '#D4AF37', marginBottom: '12px' }}>Operational Slot Intervals</h3>
                <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#DDD' }}>
                  <strong>Operating Hours:</strong> {SALON_BRANCH_INFO.hours}<br />
                  <strong>Slot Interval:</strong> 30 Minutes<br />
                  <strong>Morning Shift:</strong> 09:00 AM – 12:30 PM (8 slots)<br />
                  <strong>Afternoon Shift:</strong> 01:00 PM – 03:30 PM (6 slots)<br />
                  <strong>Evening Shift:</strong> 04:00 PM – 07:30 PM (8 slots)<br />
                  <strong>Double Booking Guard:</strong> Enabled (Real-time reservation locking)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
