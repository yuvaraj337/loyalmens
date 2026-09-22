import React, { useState } from 'react';
import { useCheckout } from '../../../context/CheckoutContext';
import { useCart } from '../../../context/CartContext';
import { User, Phone, Mail, MapPin, Home, AlertCircle, Loader2 } from 'lucide-react';

export const CheckoutStep1Delivery: React.FC = () => {
  const {
    customer,
    setCustomer,
    address,
    setAddress,
    addressMode,
    setAddressMode,
    detectLocation,
    isDetectingLocation,
    locationError,
    goToStep,
    getFormattedAddress,
  } = useCheckout();

  const { items } = useCart();
  const [formError, setFormError] = useState<string | null>(null);
  const [isEditingDetected, setIsEditingDetected] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 10) val = val.slice(0, 10);
    setCustomer((prev) => ({ ...prev, phone: val }));
  };

  const handleDetectLocationClick = async () => {
    setAddressMode('detected');
    await detectLocation();
  };

  const handleManualLocationClick = () => {
    setAddressMode('manual');
    setIsEditingDetected(false);
  };

  const handleContinue = () => {
    setFormError(null);

    // Validate Customer Info
    if (!customer.fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    const phoneDigits = customer.phone.replace(/\D/g, '');
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(phoneDigits)) {
      setFormError('Please enter a valid 10-digit Indian mobile number.');
      const phoneEl = document.getElementById('checkout-phone');
      if (phoneEl) {
        phoneEl.focus();
        phoneEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (customer.email && customer.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customer.email.trim())) {
        setFormError('Please enter a valid email address.');
        return;
      }
    }

    // Validate Cart
    if (items.length === 0) {
      setFormError('Your cart is empty. Please add items to proceed.');
      return;
    }

    // Validate Address
    if (addressMode === 'manual' || isEditingDetected) {
      if (!address.houseFlat.trim()) {
        setFormError('Please enter your House / Flat / Building details.');
        return;
      }
      if (!address.streetArea.trim()) {
        setFormError('Please enter your Street / Area.');
        return;
      }
      if (!address.city.trim()) {
        setFormError('Please enter your City.');
        return;
      }
      if (!address.state.trim()) {
        setFormError('Please enter your State.');
        return;
      }
      if (!address.pincode.trim() || address.pincode.trim().length < 6) {
        setFormError('Please enter a valid 6-digit Pincode.');
        return;
      }
    } else {
      // Detected mode
      const formatted = getFormattedAddress();
      if (!formatted || formatted === 'No address entered yet') {
        setFormError('Please click "Detect My Location" or select "Enter Address Manually".');
        return;
      }
    }

    // All valid -> Go to Step 2 (Review)
    goToStep(2);
  };

  const formattedDetected = getFormattedAddress();

  return (
    <div className="checkout-delivery-layout">
      {/* Form & Inputs */}
      <section className="checkout-main-form" aria-label="Customer & Delivery Details Form">
        <h1 className="checkout-page-title">Delivery Details</h1>
        <p className="checkout-page-subtitle">Tell us where to deliver your order.</p>

        {formError && (
          <div className="checkout-location-error" role="alert">
            <AlertCircle size={18} />
            <span>{formError}</span>
          </div>
        )}

        {/* Customer Information */}
        <div className="checkout-form-group">
          <label htmlFor="checkout-fullName" className="checkout-form-label">
            Full Name *
          </label>
          <div className="checkout-input-card">
            <User className="checkout-input-icon" size={18} />
            <input
              id="checkout-fullName"
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={customer.fullName}
              onChange={(e) => setCustomer((prev) => ({ ...prev, fullName: e.target.value }))}
              autoComplete="name"
              required
            />
          </div>
        </div>

        <div className="checkout-form-group">
          <label htmlFor="checkout-phone" className="checkout-form-label">
            Phone Number *
          </label>
          <div className="checkout-input-card">
            <Phone className="checkout-input-icon" size={18} />
            <input
              id="checkout-phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="e.g. 9876543210"
              value={customer.phone}
              onChange={handlePhoneChange}
              autoComplete="tel"
              required
            />
          </div>
        </div>

        <div className="checkout-form-group">
          <label htmlFor="checkout-email" className="checkout-form-label">
            Email (Optional)
          </label>
          <div className="checkout-input-card">
            <Mail className="checkout-input-icon" size={18} />
            <input
              id="checkout-email"
              type="email"
              placeholder="e.g. rahul@example.com"
              value={customer.email || ''}
              onChange={(e) => setCustomer((prev) => ({ ...prev, email: e.target.value }))}
              autoComplete="email"
            />
          </div>
        </div>

        {/* Delivery Location Section */}
        <div className="checkout-form-group" style={{ marginTop: '32px' }}>
          <label className="checkout-form-label">Delivery Location *</label>

          {/* Option Pills */}
          <div className="checkout-location-pills">
            <button
              type="button"
              className={`checkout-location-pill ${
                addressMode === 'detected' ? 'active' : 'inactive'
              }`}
              onClick={handleDetectLocationClick}
              disabled={isDetectingLocation}
            >
              {isDetectingLocation ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <MapPin size={18} />
              )}
              <span>{isDetectingLocation ? 'Detecting Location...' : 'Detect My Location'}</span>
            </button>

            <button
              type="button"
              className={`checkout-location-pill ${
                addressMode === 'manual' ? 'active' : 'inactive'
              }`}
              onClick={handleManualLocationClick}
            >
              <Home size={18} />
              <span>Enter Address Manually</span>
            </button>
          </div>

          <span className="checkout-location-helper">
            Allow location access to fetch your address using Google Maps.
          </span>

          {locationError && (
            <div className="checkout-location-error" role="alert">
              <AlertCircle size={18} />
              <span>{locationError}</span>
            </div>
          )}

          {/* Detected Address Display & Quick Edit */}
          {addressMode === 'detected' && formattedDetected !== 'No address entered yet' && !isEditingDetected && (
            <div className="checkout-detected-box">
              <div>
                <strong style={{ fontSize: '13px', color: '#141210', display: 'block', marginBottom: '4px' }}>
                  Detected Delivery Address:
                </strong>
                <p className="checkout-detected-address-text">{formattedDetected}</p>
              </div>
              <button
                type="button"
                className="checkout-edit-btn-inline"
                onClick={() => setIsEditingDetected(true)}
              >
                Edit Address
              </button>
            </div>
          )}

          {/* Manual Address Fields or Editing Detected Address */}
          {(addressMode === 'manual' || isEditingDetected) && (
            <div className="checkout-manual-address-card">
              <div className="checkout-address-fullwidth">
                <label className="checkout-field-label-sm">House / Flat / Building *</label>
                <input
                  type="text"
                  className="checkout-text-input"
                  placeholder="e.g. Flat 302, Royal Residency"
                  value={address.houseFlat}
                  onChange={(e) => setAddress((prev) => ({ ...prev, houseFlat: e.target.value }))}
                />
              </div>

              <div className="checkout-address-fullwidth">
                <label className="checkout-field-label-sm">Street / Area *</label>
                <input
                  type="text"
                  className="checkout-text-input"
                  placeholder="e.g. Kotebagilu, Moodbidri Road"
                  value={address.streetArea}
                  onChange={(e) => setAddress((prev) => ({ ...prev, streetArea: e.target.value }))}
                />
              </div>

              <div>
                <label className="checkout-field-label-sm">Landmark (Optional)</label>
                <input
                  type="text"
                  className="checkout-text-input"
                  placeholder="e.g. Near Bus Stand"
                  value={address.landmark || ''}
                  onChange={(e) => setAddress((prev) => ({ ...prev, landmark: e.target.value }))}
                />
              </div>

              <div>
                <label className="checkout-field-label-sm">City *</label>
                <input
                  type="text"
                  className="checkout-text-input"
                  placeholder="e.g. Moodbidri"
                  value={address.city}
                  onChange={(e) => setAddress((prev) => ({ ...prev, city: e.target.value }))}
                />
              </div>

              <div>
                <label className="checkout-field-label-sm">State *</label>
                <input
                  type="text"
                  className="checkout-text-input"
                  placeholder="e.g. Karnataka"
                  value={address.state}
                  onChange={(e) => setAddress((prev) => ({ ...prev, state: e.target.value }))}
                />
              </div>

              <div>
                <label className="checkout-field-label-sm">Pincode *</label>
                <input
                  type="text"
                  maxLength={6}
                  className="checkout-text-input"
                  placeholder="574227"
                  value={address.pincode}
                  onChange={(e) =>
                    setAddress((prev) => ({
                      ...prev,
                      pincode: e.target.value.replace(/\D/g, ''),
                    }))
                  }
                />
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <button
          type="button"
          className="checkout-btn-gold"
          onClick={handleContinue}
          id="checkout-continue-btn"
        >
          <span>Continue</span>
          <span aria-hidden="true">&rarr;</span>
        </button>
      </section>
    </div>
  );
};
