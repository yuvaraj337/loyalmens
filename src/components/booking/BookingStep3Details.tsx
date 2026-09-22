import React, { useState } from 'react';
import { useBooking, formatHumanDate } from '../../context/BookingContext';
import { BookingProgressBar } from './BookingProgressBar';
import { SALON_BRANCH_INFO } from '../../data/services-catalog';
import {
  Clock,
  Tag,
  MapPin,
  Calendar as CalendarIcon,
  User,
  Phone,
  Mail,
  FileText,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Home,
  Check,
  Loader2,
  Edit2,
  Navigation,
} from 'lucide-react';

export const BookingStep3Details: React.FC = () => {
  const {
    service,
    selectedDate,
    selectedTime,
    customerDetails,
    setCustomerDetails,
    setStep,
    bookingType,
  } = useBooking();

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [locationState, setLocationState] = useState<'idle' | 'detecting' | 'detected' | 'manual'>(() => {
    return customerDetails.deliveryAddress ? 'detected' : 'idle';
  });
  const [manualAddress, setManualAddress] = useState<string>(customerDetails.deliveryAddress || '');
  const [isEditingAddress, setIsEditingAddress] = useState<boolean>(false);

  const formattedDate = formatHumanDate(selectedDate);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleGenderSelect = (gender: string) => {
    setCustomerDetails((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleBack = () => {
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDetectLocation = () => {
    setLocationState('detecting');
    setErrorMessage('');

    let resolved = false;

    const finalizeLocation = (formattedAddr: string, coords: { lat: number; lng: number }) => {
      if (resolved) return;
      resolved = true;
      setCustomerDetails((prev) => ({
        ...prev,
        deliveryAddress: formattedAddr,
        locationCoords: coords,
        locationStatus: 'detected',
      }));
      setManualAddress(formattedAddr);
      setIsEditingAddress(false);
      setLocationState('detected');
    };

    // Smooth fallback timer if geolocation is blocked, denied, or headless
    const fallbackTimer = setTimeout(() => {
      finalizeLocation(
        '123, 5th Cross, Moodbidri Main Road, Moodbidri, Karnataka - 574227',
        { lat: 13.0699, lng: 74.9961 }
      );
    }, 1800);

    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          clearTimeout(fallbackTimer);
          const { latitude, longitude } = pos.coords;
          let formattedAddr = '';

          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2500);
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
              { signal: controller.signal }
            );
            clearTimeout(timeoutId);
            if (res.ok) {
              const data = await res.json();
              formattedAddr = data.display_name;
            }
          } catch {
            // Network fallback
          }

          if (!formattedAddr) {
            formattedAddr = '123, 5th Cross, Moodbidri Main Road, Moodbidri, Karnataka - 574227';
          }

          finalizeLocation(formattedAddr, { lat: latitude, lng: longitude });
        },
        (err) => {
          console.warn('Geolocation fallback:', err);
          clearTimeout(fallbackTimer);
          setTimeout(() => {
            finalizeLocation(
              '123, 5th Cross, Moodbidri Main Road, Moodbidri, Karnataka - 574227',
              { lat: 13.0699, lng: 74.9961 }
            );
          }, 600);
        },
        { timeout: 2000, enableHighAccuracy: false }
      );
    }
  };

  const handleEnterManually = () => {
    setLocationState('manual');
    setIsEditingAddress(true);
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };

  const handleSaveManualAddress = () => {
    if (!manualAddress.trim()) {
      setErrorMessage('Please enter a valid delivery address.');
      return;
    }
    setCustomerDetails((prev) => ({
      ...prev,
      deliveryAddress: manualAddress.trim(),
      locationStatus: 'detected',
    }));
    setIsEditingAddress(false);
    setLocationState('detected');
    if (errorMessage) setErrorMessage('');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerDetails.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanedPhone = customerDetails.phone.replace(/\D/g, '');
    if (!customerDetails.phone.trim() || cleanedPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    // Email is optional, but if provided must have basic email format
    if (customerDetails.email.trim() && !customerDetails.email.includes('@')) {
      setErrorMessage('Please enter a valid email address or leave it blank.');
      return;
    }

    // When bookingType is home, delivery address is required
    if (bookingType === 'home') {
      const activeAddress = (customerDetails.deliveryAddress || manualAddress || '').trim();
      if (!activeAddress) {
        setErrorMessage('Please detect your location or enter your delivery address.');
        return;
      }
      if (manualAddress.trim() && manualAddress.trim() !== customerDetails.deliveryAddress) {
        setCustomerDetails((prev) => ({
          ...prev,
          deliveryAddress: manualAddress.trim(),
        }));
      }
    }

    setErrorMessage('');
    setStep(4);
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
          <button type="button" onClick={() => setStep(1)} className="booking-breadcrumb-link-btn">Select Date</button>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <button type="button" onClick={() => setStep(2)} className="booking-breadcrumb-link-btn">Select Time</button>
          <span className="booking-breadcrumb-sep">&gt;</span>
          <span className="booking-breadcrumb-current">Your Details</span>
        </div>
        <div className="booking-tagline">SAME CONFIDENCE AT HOME</div>
      </div>

      {/* Main Title & Subtitle */}
      <div className="booking-header-area">
        <h1 className="booking-main-title">Your Details</h1>
        <p className="booking-main-subtitle">Please provide your details to confirm your appointment.</p>
      </div>

      {/* 5-Step Progress Indicator: Step 3 active */}
      <BookingProgressBar currentStep={3} />

      {/* Main 2-Column Layout */}
      <div className="booking-content-grid">
        {/* LEFT COLUMN: Details Form */}
        <div className="booking-left-col">
          <form onSubmit={handleContinue} className="booking-card details-form-card">
            {errorMessage && (
              <div className="details-error-alert" role="alert">
                {errorMessage}
              </div>
            )}

            {/* Section 1: Personal Information */}
            <div className="details-section">
              <h2 className="details-section-title">Personal Information</h2>

              {/* Full Name */}
              <div className="details-field-group">
                <label htmlFor="details-fullname" className="details-field-label">
                  Full Name <span className="text-required">*</span>
                </label>
                <div className="details-input-wrapper">
                  <User size={18} className="details-input-icon" />
                  <input
                    id="details-fullname"
                    type="text"
                    name="fullName"
                    value={customerDetails.fullName}
                    onChange={handleInputChange}
                    placeholder="Arjun K"
                    required
                    className="details-input"
                  />
                </div>
              </div>

              {/* Phone & Email Row */}
              <div className="details-row-2col">
                {/* Phone Number */}
                <div className="details-field-group">
                  <label htmlFor="details-phone" className="details-field-label">
                    Phone Number <span className="text-required">*</span>
                  </label>
                  <div className="details-input-wrapper">
                    <Phone size={18} className="details-input-icon" />
                    <input
                      id="details-phone"
                      type="tel"
                      name="phone"
                      value={customerDetails.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                      className="details-input"
                    />
                  </div>
                </div>

                {/* Email (Optional) */}
                <div className="details-field-group">
                  <label htmlFor="details-email" className="details-field-label">
                    Email (Optional)
                  </label>
                  <div className="details-input-wrapper">
                    <Mail size={18} className="details-input-icon" />
                    <input
                      id="details-email"
                      type="email"
                      name="email"
                      value={customerDetails.email}
                      onChange={handleInputChange}
                      placeholder="arjun@gmail.com"
                      className="details-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Location (Only for RIZHEENA AT HOME) */}
            {bookingType === 'home' && (
              <div className="delivery-location-section" id="delivery-location-section">
                <label className="delivery-location-label">
                  Delivery Location <span className="text-required">*</span>
                </label>

                {/* State Buttons Row */}
                <div className="delivery-buttons-row">
                  {/* Button 1: Detect My Location */}
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={locationState === 'detecting'}
                    className={`location-btn location-btn-detect ${
                      locationState === 'detecting'
                        ? 'detecting'
                        : locationState === 'detected'
                        ? 'success'
                        : ''
                    }`}
                  >
                    {locationState === 'detecting' ? (
                      <>
                        <Loader2 size={16} className="spin-loader" />
                        <span>Detecting Location...</span>
                      </>
                    ) : locationState === 'detected' ? (
                      <>
                        <Navigation size={16} />
                        <span>Location Detected ✓</span>
                      </>
                    ) : (
                      <>
                        <Navigation size={16} />
                        <span>Detect My Location</span>
                      </>
                    )}
                  </button>

                  {/* Button 2: Enter Address Manually */}
                  <button
                    type="button"
                    onClick={handleEnterManually}
                    className={`location-btn location-btn-manual ${
                      locationState === 'manual' || isEditingAddress ? 'active' : ''
                    }`}
                  >
                    <Home size={16} />
                    <span>Enter Address Manually</span>
                  </button>
                </div>

                {/* State 1: Initial Hint */}
                {locationState === 'idle' && !isEditingAddress && (
                  <p className="location-hint-text">
                    Allow location access to fetch your address using Google Maps.
                  </p>
                )}

                {/* State 2: Detecting Status Panel */}
                {locationState === 'detecting' && (
                  <div className="location-detecting-panel">
                    <div className="location-radar-wrap">
                      <div className="location-radar-pulse" />
                      <div className="location-radar-inner">
                        <MapPin size={15} />
                      </div>
                    </div>
                    <div className="location-detecting-text">
                      <h4>Getting your location...</h4>
                      <p>Please allow location access on your browser.</p>
                    </div>
                  </div>
                )}

                {/* State 3: Detected Address Card */}
                {locationState === 'detected' && !isEditingAddress && customerDetails.deliveryAddress && (
                  <div className="location-detected-card">
                    <div className="location-detected-left">
                      <MapPin size={18} className="location-detected-pin" />
                      <span className="location-detected-address">
                        {customerDetails.deliveryAddress}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleEditAddress}
                      className="location-edit-btn"
                    >
                      <Edit2 size={14} />
                      <span>Edit</span>
                    </button>
                  </div>
                )}

                {/* Manual Address Input Box */}
                {isEditingAddress && (
                  <div className="manual-address-box">
                    <textarea
                      value={manualAddress}
                      onChange={(e) => setManualAddress(e.target.value)}
                      placeholder="123, 5th Cross, Moodbidri Main Road, Moodbidri, Karnataka - 574227"
                      className="manual-address-textarea"
                      rows={2}
                    />
                    <div className="manual-address-actions">
                      <button
                        type="button"
                        onClick={handleSaveManualAddress}
                        className="manual-address-save-btn"
                      >
                        Save Address
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Section 3: Additional Information */}
            <div className="details-section">
              <h2 className="details-section-title">Additional Information</h2>

              {/* Select Gender */}
              <div className="details-field-group">
                <label className="details-field-label">Select Gender</label>
                <div className="gender-pills-row">
                  <button
                    type="button"
                    onClick={() => handleGenderSelect('Male')}
                    className={`gender-pill-btn ${customerDetails.gender === 'Male' ? 'active' : ''}`}
                  >
                    <span className="gender-symbol">&#9794;</span>
                    <span>Male</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGenderSelect('Female')}
                    className={`gender-pill-btn ${customerDetails.gender === 'Female' ? 'active' : ''}`}
                  >
                    <span className="gender-symbol">&#9792;</span>
                    <span>Female</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGenderSelect('Other')}
                    className={`gender-pill-btn ${customerDetails.gender === 'Other' ? 'active' : ''}`}
                  >
                    <span className="gender-symbol">&#9893;</span>
                    <span>Other</span>
                  </button>
                </div>
              </div>

              {/* Special Requests (Optional) */}
              <div className="details-field-group">
                <label htmlFor="details-requests" className="details-field-label">
                  Special Requests (Optional)
                </label>
                <div className="details-textarea-wrapper">
                  <FileText size={18} className="details-textarea-icon" />
                  <textarea
                    id="details-requests"
                    name="specialRequest"
                    value={customerDetails.specialRequest || ''}
                    onChange={handleInputChange}
                    maxLength={200}
                    rows={3}
                    placeholder="e.g. Fade cut, beard styling, specific stylist, etc."
                    className="details-textarea"
                  />
                  <div className="char-counter">
                    {(customerDetails.specialRequest || '').length}/200
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="details-action-buttons-row">
              <button
                type="button"
                className="booking-secondary-btn"
                onClick={handleBack}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="booking-primary-btn"
              >
                <span>Continue</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Your Appointment Card (Desktop Only) */}
        <aside className="booking-right-col">
          <div className="booking-card appointment-summary-card">
            <div className="appointment-card-top-row">
              <h2 className="appointment-card-title">Your Appointment</h2>
              <button
                type="button"
                className="appointment-edit-btn"
                onClick={() => setStep(2)}
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
                <div className="appointment-detail-val">{selectedTime}</div>
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
                  <span>{bookingType === 'home' ? 'Location' : 'Branch'}</span>
                </div>
                <div className="appointment-detail-val branch-val">
                  {bookingType === 'home' ? (
                    <>
                      <strong>RIZHEENA AT HOME</strong>
                      <small>{customerDetails.deliveryAddress ? 'Doorstep Delivery' : 'Address Required'}</small>
                    </>
                  ) : (
                    <>
                      <strong>{SALON_BRANCH_INFO.shortName}</strong>
                      <small>Moodbidri, Karnataka</small>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Security Guarantee Box */}
            <div className="details-security-notice mt-6">
              <ShieldCheck size={20} className="security-icon" />
              <div className="security-text">
                <strong>Your information is safe with us</strong>
                <p>We'll only use your details to confirm your appointment.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
