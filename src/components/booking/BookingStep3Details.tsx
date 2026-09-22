import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { BookingProgressBar } from './BookingProgressBar';
import {
  User,
  Phone,
  Mail,
  FileText,
  ArrowLeft,
  ArrowRight,
  Navigation,
  Loader2,
  Check,
  Edit2,
  AlertCircle,
  Home,
} from 'lucide-react';

export const BookingStep3Details: React.FC = () => {
  const {
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

  // Real device Geolocation Detection + Reverse Geocoding (Part 24, 25, 26)
  const handleDetectLocation = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setErrorMessage('Geolocation is not supported by your browser. Please enter your address manually.');
      setLocationState('manual');
      setIsEditingAddress(true);
      return;
    }

    setLocationState('detecting');
    setErrorMessage('');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let formattedAddr = '';

        // 1. Try BigDataCloud reverse geocode client (open, fast, CORS-friendly, no API key required)
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);
          const bdcRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
            { signal: controller.signal }
          );
          clearTimeout(timeoutId);

          if (bdcRes.ok) {
            const bdcData = await bdcRes.json();
            const parts = [
              bdcData.locality,
              bdcData.city || bdcData.principalSubdivision,
              bdcData.postcode,
              bdcData.countryName,
            ].filter(Boolean);
            if (parts.length > 0) {
              formattedAddr = parts.join(', ');
            }
          }
        } catch {
          // Fall through to Nominatim
        }

        // 2. Fallback to OpenStreetMap Nominatim if needed
        if (!formattedAddr) {
          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);
            const nomRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
              {
                signal: controller.signal,
                headers: { 'Accept-Language': 'en' },
              }
            );
            clearTimeout(timeoutId);

            if (nomRes.ok) {
              const nomData = await nomRes.json();
              if (nomData.display_name) {
                formattedAddr = nomData.display_name;
              }
            }
          } catch {
            // Geocoder offline
          }
        }

        // 3. Fallback to exact GPS coordinates if network reverse geocoding is unavailable
        if (!formattedAddr) {
          formattedAddr = `Detected Location (GPS: ${latitude.toFixed(5)}, ${longitude.toFixed(5)})`;
        }

        setCustomerDetails((prev) => ({
          ...prev,
          deliveryAddress: formattedAddr,
          locationCoords: { lat: latitude, lng: longitude },
          locationStatus: 'detected',
        }));
        setManualAddress(formattedAddr);
        setIsEditingAddress(false);
        setLocationState('detected');
      },
      (err) => {
        let msg = 'Could not retrieve your location. Please enter your address manually.';
        if (err.code === 1) {
          msg = 'Location permission was denied. Please allow location access or type your address manually.';
        } else if (err.code === 2) {
          msg = 'Location is unavailable. Please type your address manually.';
        } else if (err.code === 3) {
          msg = 'Location request timed out. Please try again or type your address manually.';
        }
        setErrorMessage(msg);
        setLocationState('manual');
        setIsEditingAddress(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0, // Never use cached stale coordinates
      }
    );
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

    if (customerDetails.email.trim() && !customerDetails.email.includes('@')) {
      setErrorMessage('Please enter a valid email address or leave it blank.');
      return;
    }

    // For At-Home bookings, delivery address is required
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
    <div className="booking-container booking-step3-container">
      {/* Main Title & Subtitle */}
      <div className="booking-header-area">
        <h1 className="booking-main-title">Your Details</h1>
        <p className="booking-main-subtitle">Please provide your details to confirm your appointment.</p>
      </div>

      {/* 5-Step Progress Indicator: Step 3 active */}
      <BookingProgressBar currentStep={3} />

      {/* Single Unified Customer Details Wrap (Entire 'Your Appointment' Card is Completely Removed) */}
      <div className="booking-single-card-wrap">
        <form onSubmit={handleContinue} className="booking-card details-form-card">
          {errorMessage && (
            <div className="details-error-alert" role="alert">
              <AlertCircle size={18} className="alert-icon" />
              <span>{errorMessage}</span>
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
                  autoComplete="name"
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
                    autoComplete="tel"
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
                    autoComplete="email"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: RIZHEENA At Home Address (Only shown when bookingType === 'home') */}
          {bookingType === 'home' && (
            <div className="details-section at-home-address-section">
              <div className="section-title-with-badge">
                <h2 className="details-section-title">Home Service Address</h2>
                <span className="at-home-badge">RIZHEENA AT HOME</span>
              </div>
              <p className="at-home-address-subtitle">
                Where would you like our professional stylist to visit?
              </p>

              {/* Location Action Buttons */}
              <div className="location-selection-buttons">
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={locationState === 'detecting'}
                  className={`detect-location-btn ${locationState === 'detecting' ? 'loading' : ''}`}
                >
                  {locationState === 'detecting' ? (
                    <>
                      <Loader2 size={16} className="btn-spinner animate-spin" />
                      <span>Detecting location...</span>
                    </>
                  ) : (
                    <>
                      <Navigation size={16} />
                      <span>Detect My Location</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleEnterManually}
                  className={`enter-manual-btn ${locationState === 'manual' ? 'active' : ''}`}
                >
                  <Home size={16} />
                  <span>Enter Address Manually</span>
                </button>
              </div>

              {/* Detected Address Display Box */}
              {customerDetails.deliveryAddress && !isEditingAddress && (
                <div className="detected-address-display-box">
                  <div className="detected-address-content">
                    <div className="detected-address-header">
                      <span className="address-status-pill">
                        <Check size={13} />
                        Service Location
                      </span>
                    </div>
                    <p className="detected-address-text">{customerDetails.deliveryAddress}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleEditAddress}
                    className="address-edit-link"
                    aria-label="Edit detected address"
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
                    placeholder="Flat No, Building, Street, Area, City, Pincode"
                    className="manual-address-textarea"
                    rows={3}
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

          {/* Bottom Actions Row placed below Customer Details */}
          <div className="booking-step-action-wrap">
            <button
              type="submit"
              className="booking-primary-btn w-full"
            >
              <span>Continue</span>
              <ArrowRight size={18} className="btn-arrow-icon" />
            </button>
            <div className="booking-btn-subtext">Review your appointment in the next step.</div>

            <button
              type="button"
              className="booking-back-link-btn"
              onClick={handleBack}
            >
              <ArrowLeft size={16} />
              <span>Back to Time Selection</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
