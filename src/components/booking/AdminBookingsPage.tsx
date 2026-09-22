import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  LayoutDashboard,
  Calendar,
  ShoppingBag,
  Home,
  Crown,
  Edit3,
  MoreVertical,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Trash2,
  ChevronRight,
  User,
  DollarSign,
  Tag
} from 'lucide-react';
import { useBooking, formatHumanDate } from '../../context/BookingContext';
import { useCheckout } from '../../context/CheckoutContext';
import { getServicesCatalog, saveServiceOverride, SALON_BRANCH_INFO } from '../../data/services-catalog';
import { BookingRecord, BookingStatus, PaymentStatus } from '../../types/booking';
import { OrderStatus } from '../../types/checkout';
import '../../styles/admin-bookings.css';

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
  '07:00 PM', '07:30 PM',
];

interface MembershipLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  plan: 'VIP Membership' | 'VVIP Royal Tier';
  status: 'New' | 'Contacted' | 'Active';
  date: string;
}

const INITIAL_MEMBERSHIPS: MembershipLead[] = [
  { id: 'MEM-101', name: 'Vikramaditya Roy', phone: '+91 98450 12345', email: 'vikram.roy@example.com', plan: 'VVIP Royal Tier', status: 'Active', date: '2026-09-18' },
  { id: 'MEM-102', name: 'Arjun Kamath', phone: '+91 99801 87654', email: 'arjun.k@example.com', plan: 'VIP Membership', status: 'Active', date: '2026-09-19' },
  { id: 'MEM-103', name: 'Devendra Shetty', phone: '+91 97412 34567', email: 'dev.shetty@example.com', plan: 'VVIP Royal Tier', status: 'New', date: '2026-09-21' },
];

export const AdminBookingsPage: React.FC = () => {
  const { bookings, updateBookingStatus, rescheduleBooking, deleteBooking } = useBooking();
  const { orders, updateOrderStatus, storeSettings, updateStoreSettings } = useCheckout();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'bookings' | 'shop_orders' | 'home_orders' | 'memberships' | 'services'
  >('bookings');

  // Mobile drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Delivery fee editing
  const [editingDeliveryFee, setEditingDeliveryFee] = useState<boolean>(false);
  const [customDeliveryFee, setCustomDeliveryFee] = useState<number>(storeSettings.deliveryCharge);

  // Services catalog management
  const [services, setServices] = useState(() => getServicesCatalog());
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<string>('');

  // Memberships
  const [memberships, setMemberships] = useState<MembershipLead[]>(() => {
    try {
      const saved = localStorage.getItem('rizheena_membership_leads');
      return saved ? JSON.parse(saved) : INITIAL_MEMBERSHIPS;
    } catch {
      return INITIAL_MEMBERSHIPS;
    }
  });

  // 3-dot dropdown menu open state (stores booking_id)
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Reschedule modal state
  const [reschedulingBooking, setReschedulingBooking] = useState<BookingRecord | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<string>('');
  const [rescheduleTime, setRescheduleTime] = useState<string>('');

  // Cancel confirmation modal state
  const [cancellingBooking, setCancellingBooking] = useState<BookingRecord | null>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.admin-dots-menu-wrap')) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen]);

  // Handle saving service price modification
  const handleSavePrice = (id: string) => {
    if (!newPrice.trim()) return;
    saveServiceOverride(id, { price: newPrice.trim() });
    setServices(getServicesCatalog());
    setEditingPriceId(null);
    setNewPrice('');
  };

  // Open reschedule modal
  const openRescheduleModal = (b: BookingRecord) => {
    setReschedulingBooking(b);
    setRescheduleDate(b.date_iso || new Date().toISOString().split('T')[0]);
    setRescheduleTime(b.time || '11:00 AM');
    setActiveMenuId(null);
  };

  // Confirm reschedule
  const handleConfirmReschedule = () => {
    if (!reschedulingBooking || !rescheduleDate || !rescheduleTime) return;
    try {
      const [year, month, day] = rescheduleDate.split('-').map(Number);
      const dObj = new Date(year, month - 1, day);
      const formatted = formatHumanDate(dObj);
      rescheduleBooking(reschedulingBooking.booking_id, rescheduleDate, formatted, rescheduleTime);
    } catch {
      rescheduleBooking(reschedulingBooking.booking_id, rescheduleDate, rescheduleDate, rescheduleTime);
    }
    setReschedulingBooking(null);
  };

  // Open cancel modal
  const openCancelModal = (b: BookingRecord) => {
    setCancellingBooking(b);
    setActiveMenuId(null);
  };

  // Confirm cancel and delete/remove
  const handleConfirmCancel = () => {
    if (!cancellingBooking) return;
    deleteBooking(cancellingBooking.booking_id);
    setCancellingBooking(null);
  };

  // Handle completion toggle
  const handleToggleCompletion = (b: BookingRecord, isChecked: boolean) => {
    if (isChecked) {
      updateBookingStatus(b.booking_id, 'completed', 'fully_paid');
    } else {
      updateBookingStatus(b.booking_id, 'confirmed', 'advance_paid');
    }
  };

  // Filtered lists
  const salonBookings = bookings.filter((b) => b.booking_type !== 'home');
  const homeBookings = bookings.filter((b) => b.booking_type === 'home');

  const filteredSalonBookings = salonBookings.filter((b) => {
    if (statusFilter === 'all') return true;
    return b.booking_status === statusFilter;
  });

  const filteredHomeBookings = homeBookings.filter((b) => {
    if (statusFilter === 'all') return true;
    return b.booking_status === statusFilter;
  });

  interface NavItem {
    id: 'dashboard' | 'bookings' | 'shop_orders' | 'home_orders' | 'memberships' | 'services';
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Salon Services Bookings', icon: Calendar, badge: salonBookings.length },
    { id: 'shop_orders', label: 'RIZHEENA Shop Orders', icon: ShoppingBag, badge: orders.length },
    { id: 'home_orders', label: 'RIZHEENA At Home Orders', icon: Home, badge: homeBookings.length },
    { id: 'memberships', label: 'Memberships', icon: Crown, badge: memberships.length },
    { id: 'services', label: 'Card Modification', icon: Edit3, badge: services.length },
  ];

  return (
    <div className="admin-page">
      {/* ======================================================================
          OFF-CANVAS MOBILE DRAWER & BACKDROP
          ====================================================================== */}
      {isSidebarOpen && (
        <div
          className="admin-drawer-overlay"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`admin-drawer ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-drawer-header">
          <div className="admin-drawer-brand">
            <img src="/images/crown_logo.png" alt="Crown" className="admin-drawer-logo" />
            <div>
              <div className="admin-drawer-title">RIZHEENA OPERATIONS</div>
              <div className="admin-drawer-subtitle">Owner Management Console</div>
            </div>
          </div>
          <button
            type="button"
            className="admin-drawer-close"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="admin-drawer-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`admin-drawer-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
              >
                <div className="admin-drawer-item-left">
                  <Icon size={18} className="admin-drawer-icon" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`admin-drawer-badge ${isActive ? 'active' : ''}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="admin-drawer-footer">
          <a href="/" className="admin-drawer-link">
            <span>&larr; View Live Website</span>
          </a>
        </div>
      </aside>

      {/* ======================================================================
          MAIN TOP BAR (DESKTOP + MOBILE HEADER)
          ====================================================================== */}
      <div className="admin-container">
        <header className="admin-header">
          <div className="admin-header-left">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="admin-hamburger-btn"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open operations menu"
            >
              <Menu size={22} />
            </button>

            <div className="admin-brand">
              <img src="/images/crown_logo.png" alt="Crown" className="admin-logo-crown" />
              <div>
                <h1 className="admin-title">RIZHEENA ADMIN CONSOLE</h1>
                <div className="admin-subtext">
                  Loyal Professional Men's Parlour &bull; Owner Operations
                </div>
              </div>
            </div>
          </div>

          <div className="admin-header-actions">
            <span className="admin-badge">Owner Access</span>
            <a href="/" className="admin-live-link">
              &larr; View Live Site
            </a>
          </div>
        </header>

        {/* ======================================================================
            DESKTOP NAVIGATION TABS (HIDDEN ON MOBILE, USES SIDEBAR)
            ====================================================================== */}
        <div className="admin-nav-tabs">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`admin-tab-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label} {item.badge !== undefined ? `(${item.badge})` : ''}
            </button>
          ))}
        </div>

        {/* ======================================================================
            TAB 0: DASHBOARD OVERVIEW
            ====================================================================== */}
        {activeTab === 'dashboard' && (
          <div className="admin-dashboard-section">
            <div className="admin-grid-stats">
              <div className="admin-stat-card">
                <div className="admin-stat-title">Total Salon Bookings</div>
                <div className="admin-stat-val">{salonBookings.length}</div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-title">Shop Orders</div>
                <div className="admin-stat-val" style={{ color: '#48BB78' }}>
                  {orders.length}
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-title">At-Home Requests</div>
                <div className="admin-stat-val" style={{ color: '#ED8936' }}>
                  {homeBookings.length}
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-title">Active VIP Members</div>
                <div className="admin-stat-val">{memberships.length}</div>
              </div>
            </div>

            <div className="admin-card">
              <h2 className="admin-section-heading">Quick Salon Status</h2>
              <div className="admin-dashboard-info-grid">
                <div className="admin-dashboard-info-card">
                  <h3 className="admin-info-card-title">Main Branch Information</h3>
                  <div className="admin-info-card-body">
                    <p><strong>Salon:</strong> {SALON_BRANCH_INFO.name}</p>
                    <p><strong>Address:</strong> {SALON_BRANCH_INFO.address}</p>
                    <p><strong>Phone:</strong> {SALON_BRANCH_INFO.phone}</p>
                    <p><strong>UPI ID:</strong> {SALON_BRANCH_INFO.upiId}</p>
                  </div>
                </div>

                <div className="admin-dashboard-info-card">
                  <h3 className="admin-info-card-title">Booking Operating Windows</h3>
                  <div className="admin-info-card-body">
                    <p><strong>Hours:</strong> {SALON_BRANCH_INFO.hours}</p>
                    <p><strong>Slot Interval:</strong> 30 Minutes</p>
                    <p><strong>Morning Shift:</strong> 09:00 AM &ndash; 12:30 PM (8 slots)</p>
                    <p><strong>Afternoon Shift:</strong> 01:00 PM &ndash; 03:30 PM (6 slots)</p>
                    <p><strong>Evening Shift:</strong> 04:00 PM &ndash; 07:30 PM (8 slots)</p>
                    <p><strong>Double Booking Guard:</strong> Real-time reservation lock active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================
            TAB 1: SALON SERVICES BOOKINGS
            ====================================================================== */}
        {activeTab === 'bookings' && (
          <div className="admin-card">
            <div className="admin-card-header-bar">
              <div>
                <h2 className="admin-section-heading">Salon Services Appointments</h2>
                <div className="admin-section-sub">
                  View, reschedule, toggle completion, or cancel confirmed salon reservations.
                </div>
              </div>

              {/* Status Filters */}
              <div className="admin-filter-pills-row">
                {['all', 'confirmed', 'payment_verification', 'completed', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`admin-filter-pill ${statusFilter === st ? 'active' : ''}`}
                    onClick={() => setStatusFilter(st)}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* --- DESKTOP TABLE VIEW (Visible on width >= 769px) --- */}
            <div className="admin-desktop-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Service &amp; Price</th>
                    <th>Date &amp; Time</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalonBookings.map((b) => (
                    <tr key={b.booking_id}>
                      <td className="admin-id-col">{b.booking_id}</td>
                      <td>
                        <div className="admin-cust-name">{b.customer_name}</div>
                        <div className="admin-cust-sub">{b.phone}</div>
                        {b.email && <div className="admin-cust-sub">{b.email}</div>}
                      </td>
                      <td>
                        <div className="admin-svc-name">{b.service_name}</div>
                        <div className="admin-svc-price">{b.service_price} ({b.duration})</div>
                      </td>
                      <td>
                        <div className="admin-date-text">{b.date}</div>
                        <div className="admin-time-text">{b.time}</div>
                      </td>
                      <td>
                        <span className={`admin-status-pill admin-status-${b.booking_status === 'payment_verification' ? 'verification' : b.booking_status}`}>
                          {b.booking_status.replace('_', ' ')}
                        </span>
                      </td>
                      <td>
                        <div className="admin-payment-status">{b.payment_status.replace('_', ' ')}</div>
                        {b.payment_utr && <div className="admin-utr-badge">UTR: {b.payment_utr}</div>}
                      </td>
                      <td>
                        <div className="admin-table-actions">
                          <button
                            type="button"
                            className="admin-action-btn"
                            onClick={() => openRescheduleModal(b)}
                          >
                            Reschedule
                          </button>
                          <button
                            type="button"
                            className="admin-action-btn admin-action-danger"
                            onClick={() => openCancelModal(b)}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredSalonBookings.length === 0 && (
                    <tr>
                      <td colSpan={7} className="admin-empty-table">
                        No appointments found matching this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* --- MOBILE CARDS VIEW (Visible on width <= 768px) --- */}
            <div className="admin-mobile-cards-wrap">
              {filteredSalonBookings.map((b) => {
                const isCompleted = b.booking_status === 'completed';
                const isMenuOpen = activeMenuId === b.booking_id;

                return (
                  <div key={b.booking_id} className="admin-booking-mobile-card">
                    {/* Card Top Row: ID, Status & 3-dot Menu */}
                    <div className="admin-mcard-header">
                      <div className="admin-mcard-id-wrap">
                        <span className="admin-mcard-id">{b.booking_id}</span>
                        <span className={`admin-status-pill admin-status-${b.booking_status === 'payment_verification' ? 'verification' : b.booking_status}`}>
                          {b.booking_status.replace('_', ' ')}
                        </span>
                      </div>

                      {/* 3-Dot Action Menu */}
                      <div className="admin-dots-menu-wrap">
                        <button
                          type="button"
                          className="admin-dots-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(isMenuOpen ? null : b.booking_id);
                          }}
                          aria-label="Appointment Actions"
                        >
                          <MoreVertical size={18} />
                        </button>

                        {isMenuOpen && (
                          <div className="admin-dots-dropdown">
                            <button
                              type="button"
                              className="admin-dropdown-item"
                              onClick={() => openRescheduleModal(b)}
                            >
                              <RotateCcw size={15} />
                              <span>Reschedule</span>
                            </button>
                            <button
                              type="button"
                              className="admin-dropdown-item admin-dropdown-danger"
                              onClick={() => openCancelModal(b)}
                            >
                              <Trash2 size={15} />
                              <span>Cancel Booking</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="admin-mcard-cust">
                      <div className="admin-mcard-cust-name">
                        <User size={15} className="admin-mcard-icon" />
                        <span>{b.customer_name}</span>
                      </div>
                      <div className="admin-mcard-cust-row">
                        <Phone size={14} className="admin-mcard-icon" />
                        <a href={`tel:${b.phone}`} className="admin-mcard-tel">{b.phone}</a>
                      </div>
                      {b.email && (
                        <div className="admin-mcard-cust-row">
                          <Mail size={14} className="admin-mcard-icon" />
                          <span>{b.email}</span>
                        </div>
                      )}
                    </div>

                    {/* Service & Schedule Details */}
                    <div className="admin-mcard-details">
                      <div className="admin-mcard-detail-item">
                        <span className="admin-mcard-label">Service</span>
                        <span className="admin-mcard-val strong">{b.service_name}</span>
                      </div>
                      <div className="admin-mcard-detail-item">
                        <span className="admin-mcard-label">Date &amp; Time</span>
                        <span className="admin-mcard-val">{b.date} &bull; {b.time}</span>
                      </div>
                      <div className="admin-mcard-detail-item">
                        <span className="admin-mcard-label">Duration</span>
                        <span className="admin-mcard-val">{b.duration}</span>
                      </div>
                      <div className="admin-mcard-detail-item">
                        <span className="admin-mcard-label">Total Amount</span>
                        <span className="admin-mcard-val gold strong">
                          {b.total_amount ? `₹${b.total_amount.toLocaleString('en-IN')}` : b.service_price}
                        </span>
                      </div>
                    </div>

                    {/* Completion Toggle Switch (OFF by default) */}
                    <div className="admin-mcard-footer">
                      <div className="admin-toggle-wrap">
                        <span className="admin-toggle-label">
                          {isCompleted ? 'Completed' : 'Mark Completed'}
                        </span>
                        <label className="admin-switch">
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={(e) => handleToggleCompletion(b, e.target.checked)}
                          />
                          <span className="admin-switch-slider" />
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredSalonBookings.length === 0 && (
                <div className="admin-empty-card">
                  No appointments found matching this filter.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================================
            TAB 2: RIZHEENA SHOP ORDERS
            ====================================================================== */}
        {activeTab === 'shop_orders' && (
          <div className="admin-card">
            <div className="admin-card-header-bar">
              <div>
                <h2 className="admin-section-heading">RIZHEENA Shop Orders</h2>
                <div className="admin-section-sub">
                  Track retail orders, update shipment statuses, and manage delivery charges.
                </div>
              </div>

              {/* Delivery Fee Configuration */}
              <div className="admin-fee-box">
                <span className="admin-fee-label">All-India Delivery Fee:</span>
                {editingDeliveryFee ? (
                  <div className="admin-fee-edit">
                    <input
                      type="number"
                      value={customDeliveryFee}
                      onChange={(e) => setCustomDeliveryFee(Number(e.target.value) || 0)}
                      className="admin-fee-input"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        updateStoreSettings({ deliveryCharge: customDeliveryFee });
                        setEditingDeliveryFee(false);
                      }}
                      className="admin-fee-save-btn"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="admin-fee-display">
                    <span className="admin-fee-val">₹{storeSettings.deliveryCharge}</span>
                    <button
                      type="button"
                      onClick={() => setEditingDeliveryFee(true)}
                      className="admin-fee-change-btn"
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Orders Table */}
            <div className="admin-table-wrap">
              {orders.length === 0 ? (
                <div className="admin-empty-card">
                  No orders have been placed yet. Submit an order through the shop checkout to view it here.
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order No</th>
                      <th>Customer &amp; Phone</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Delivery Address</th>
                      <th>Status &amp; Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .filter((ord) => orderStatusFilter === 'all' || ord.order_status === orderStatusFilter)
                      .map((ord) => (
                        <tr key={ord.order_id}>
                          <td className="admin-id-col">{ord.order_number}</td>
                          <td>
                            <div className="admin-cust-name">{ord.customer_name}</div>
                            <div className="admin-cust-sub">{ord.phone}</div>
                            {ord.email && <div className="admin-cust-sub">{ord.email}</div>}
                          </td>
                          <td>
                            <div className="admin-order-items-list">
                              {ord.items.map((item, i) => (
                                <div key={i} className="admin-order-item-text">
                                  {item.name} &times; {item.quantity} ({item.price})
                                </div>
                              ))}
                            </div>
                          </td>
                          <td>
                            <div className="admin-order-total-val">₹{ord.total.toLocaleString('en-IN')}</div>
                            <div className="admin-order-total-sub">Subtotal ₹{ord.subtotal} + Del ₹{ord.delivery_charge}</div>
                          </td>
                          <td>
                            <span className="admin-status-pill admin-status-confirmed">
                              {ord.payment_status}
                            </span>
                          </td>
                          <td className="admin-order-addr-cell">
                            {ord.delivery_address.formattedAddress}
                          </td>
                          <td>
                            <select
                              value={ord.order_status}
                              onChange={(e) => updateOrderStatus(ord.order_id, e.target.value as OrderStatus)}
                              className="admin-order-status-select"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="out_for_delivery">Out for Delivery</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ======================================================================
            TAB 3: RIZHEENA AT HOME ORDERS
            ====================================================================== */}
        {activeTab === 'home_orders' && (
          <div className="admin-card">
            <div className="admin-card-header-bar">
              <div>
                <h2 className="admin-section-heading">RIZHEENA At Home Bookings</h2>
                <div className="admin-section-sub">
                  Customer doorstep grooming appointments with detected locations and addresses.
                </div>
              </div>
            </div>

            <div className="admin-table-wrap">
              {homeBookings.length === 0 ? (
                <div className="admin-empty-card">
                  No At-Home bookings recorded yet. New requests from the &quot;RIZHEENA At Home&quot; flow will appear here.
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Date &amp; Time</th>
                      <th>Location / Address</th>
                      <th>Total Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {homeBookings.map((b) => (
                      <tr key={b.booking_id}>
                        <td className="admin-id-col">{b.booking_id}</td>
                        <td>
                          <div className="admin-cust-name">{b.customer_name}</div>
                          <div className="admin-cust-sub">{b.phone}</div>
                        </td>
                        <td>
                          <div className="admin-svc-name">{b.service_name}</div>
                          <div className="admin-svc-price">{b.service_price}</div>
                        </td>
                        <td>
                          <div className="admin-date-text">{b.date}</div>
                          <div className="admin-time-text">{b.time}</div>
                        </td>
                        <td style={{ maxWidth: '240px', fontSize: '12px' }}>
                          <div style={{ color: '#E0DAD0' }}>{b.delivery_address || 'Address detected on map'}</div>
                        </td>
                        <td>
                          <div className="admin-order-total-val">
                            ₹{b.total_amount ? b.total_amount.toLocaleString('en-IN') : b.service_price}
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="admin-action-btn"
                            onClick={() => openRescheduleModal(b)}
                          >
                            Reschedule
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* ======================================================================
            TAB 4: MEMBERSHIPS
            ====================================================================== */}
        {activeTab === 'memberships' && (
          <div className="admin-card">
            <div className="admin-card-header-bar">
              <div>
                <h2 className="admin-section-heading">VIP &amp; VVIP Membership Registrations</h2>
                <div className="admin-section-sub">
                  Track concierge memberships, client privileges, and incoming enrollment leads.
                </div>
              </div>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Member ID</th>
                    <th>Client Name</th>
                    <th>Contact</th>
                    <th>Selected Tier</th>
                    <th>Status</th>
                    <th>Enrolled Date</th>
                  </tr>
                </thead>
                <tbody>
                  {memberships.map((m) => (
                    <tr key={m.id}>
                      <td className="admin-id-col">{m.id}</td>
                      <td>
                        <div className="admin-cust-name">{m.name}</div>
                      </td>
                      <td>
                        <div className="admin-cust-sub">{m.phone}</div>
                        <div className="admin-cust-sub">{m.email}</div>
                      </td>
                      <td>
                        <span style={{
                          color: m.plan.includes('VVIP') ? '#D4AF37' : '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '13px',
                        }}>
                          {m.plan}
                        </span>
                      </td>
                      <td>
                        <span className={`admin-status-pill ${m.status === 'Active' ? 'admin-status-confirmed' : 'admin-status-verification'}`}>
                          {m.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '12.5px', color: '#999' }}>{m.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================================
            TAB 5: CARD MODIFICATION (SERVICE CATALOG & PRICING)
            ====================================================================== */}
        {activeTab === 'services' && (
          <div className="admin-card">
            <div className="admin-card-header-bar">
              <div>
                <h2 className="admin-section-heading">Dynamic Service Pricing &amp; Card Modification</h2>
                <div className="admin-section-sub">
                  Modifications here immediately update customer booking cards and summaries in real-time.
                </div>
              </div>
            </div>

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
                      <td>
                        <div className="admin-svc-row">
                          <img src={svc.thumb} alt={svc.name} className="admin-svc-thumb" />
                          <div className="admin-svc-name">{svc.name}</div>
                        </div>
                      </td>
                      <td>{svc.category}</td>
                      <td>{svc.duration}</td>
                      <td className="admin-id-col">
                        {editingPriceId === svc.id ? (
                          <input
                            type="text"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            className="admin-edit-price-input"
                          />
                        ) : (
                          svc.price
                        )}
                      </td>
                      <td>
                        {editingPriceId === svc.id ? (
                          <div className="admin-table-actions">
                            <button
                              type="button"
                              className="admin-action-btn"
                              onClick={() => handleSavePrice(svc.id)}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="admin-action-btn admin-action-cancel"
                              onClick={() => setEditingPriceId(null)}
                            >
                              Cancel
                            </button>
                          </div>
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
      </div>

      {/* ======================================================================
          RESCHEDULE MODAL
          ====================================================================== */}
      {reschedulingBooking && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <div>
                <h3 className="admin-modal-title">Reschedule Appointment</h3>
                <div className="admin-modal-sub">
                  {reschedulingBooking.booking_id} &bull; {reschedulingBooking.customer_name}
                </div>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setReschedulingBooking(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-modal-section">
                <label className="admin-modal-label">Choose New Date</label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="admin-modal-input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="admin-modal-section">
                <label className="admin-modal-label">Select New Time Slot</label>
                <div className="admin-modal-slots-grid">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`admin-modal-slot-btn ${rescheduleTime === slot ? 'active' : ''}`}
                      onClick={() => setRescheduleTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-modal-cancel-btn"
                onClick={() => setReschedulingBooking(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-modal-confirm-btn"
                onClick={handleConfirmReschedule}
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          CANCEL BOOKING CONFIRMATION MODAL
          ====================================================================== */}
      {cancellingBooking && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card admin-modal-card-sm">
            <div className="admin-modal-header">
              <div className="admin-danger-header">
                <AlertTriangle size={22} className="admin-danger-icon" />
                <h3 className="admin-modal-title">Cancel &amp; Remove Booking</h3>
              </div>
              <button
                type="button"
                className="admin-modal-close-btn"
                onClick={() => setCancellingBooking(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal-body">
              <p className="admin-modal-p">
                Are you sure you want to cancel and remove booking{' '}
                <strong style={{ color: '#D4AF37' }}>{cancellingBooking.booking_id}</strong> for{' '}
                <strong>{cancellingBooking.customer_name}</strong> on{' '}
                <strong>{cancellingBooking.date} at {cancellingBooking.time}</strong>?
              </p>
              <div className="admin-modal-note">
                This will delete the reservation and free up the selected appointment slot immediately.
              </div>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-modal-cancel-btn"
                onClick={() => setCancellingBooking(null)}
              >
                Keep Booking
              </button>
              <button
                type="button"
                className="admin-modal-danger-btn"
                onClick={handleConfirmCancel}
              >
                Confirm &amp; Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
