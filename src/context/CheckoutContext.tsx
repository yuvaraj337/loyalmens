import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  CustomerDeliveryDetails,
  DeliveryAddress,
  OrderStatus,
  ShopOrderRecord,
  StoreSettings,
} from '../types/checkout';
import { useCart, parsePrice } from './CartContext';

interface CheckoutContextType {
  step: 1 | 2 | 3;
  goToStep: (step: 1 | 2 | 3) => void;
  customer: CustomerDeliveryDetails;
  setCustomer: React.Dispatch<React.SetStateAction<CustomerDeliveryDetails>>;
  address: DeliveryAddress;
  setAddress: React.Dispatch<React.SetStateAction<DeliveryAddress>>;
  addressMode: 'manual' | 'detected';
  setAddressMode: (mode: 'manual' | 'detected') => void;
  isDetectingLocation: boolean;
  locationError: string | null;
  detectLocation: () => Promise<void>;
  storeSettings: StoreSettings;
  updateStoreSettings: (newSettings: Partial<StoreSettings>) => void;
  subtotal: number;
  deliveryCharge: number;
  tax: number;
  finalTotal: number;
  isSubmitting: boolean;
  submitError: string | null;
  placeOrder: () => Promise<ShopOrderRecord | null>;
  latestOrder: ShopOrderRecord | null;
  orders: ShopOrderRecord[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  isOrdersModalOpen: boolean;
  openOrdersModal: () => void;
  closeOrdersModal: () => void;
  getFormattedAddress: () => string;
}

const ORDERS_STORAGE_KEY = 'rizheena_shop_orders';
const SETTINGS_STORAGE_KEY = 'rizheena_store_settings';

const DEFAULT_SETTINGS: StoreSettings = {
  deliveryCharge: 50,
  taxRate: 0.12, // 12% GST
};

const INITIAL_CUSTOMER: CustomerDeliveryDetails = {
  fullName: '',
  phone: '',
  email: '',
};

const INITIAL_ADDRESS: DeliveryAddress = {
  addressMode: 'detected',
  houseFlat: '',
  streetArea: '',
  landmark: '',
  city: '',
  state: '',
  pincode: '',
  formattedAddress: '',
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const useCheckout = (): CheckoutContextType => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return ctx;
};

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { items, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customer, setCustomer] = useState<CustomerDeliveryDetails>(INITIAL_CUSTOMER);
  const [address, setAddress] = useState<DeliveryAddress>(INITIAL_ADDRESS);
  const [addressMode, setAddressMode] = useState<'manual' | 'detected'>('detected');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          deliveryCharge: 50,
          taxRate: 0.12,
        };
      }
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  });

  const [orders, setOrders] = useState<ShopOrderRecord[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return [];
  });

  const [latestOrder, setLatestOrder] = useState<ShopOrderRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  // Persist store settings
  const updateStoreSettings = useCallback((newSettings: Partial<StoreSettings>) => {
    setStoreSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Pricing calculations: Subtotal + 12% GST + ₹50 Delivery Charges (added once)
  const subtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );
  const deliveryCharge = items.length > 0 ? storeSettings.deliveryCharge : 0;
  const tax = Math.round(subtotal * storeSettings.taxRate);
  const finalTotal = items.length > 0 ? subtotal + deliveryCharge + tax : 0;

  const goToStep = useCallback((newStep: 1 | 2 | 3) => {
    setStep(newStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getFormattedAddress = useCallback((): string => {
    if (address.formattedAddress && address.formattedAddress.trim()) {
      return address.formattedAddress;
    }
    const parts = [
      address.houseFlat,
      address.streetArea,
      address.landmark,
      address.city,
      address.state,
      address.pincode,
    ].filter((p) => p && p.trim().length > 0);

    return parts.length > 0 ? parts.join(', ') : 'No address entered yet';
  }, [address]);

  // Real Geolocation Detection + Reverse Geocoding
  const detectLocation = useCallback(async () => {
    setLocationError(null);
    if (!('geolocation' in navigator)) {
      setLocationError('Location detection is unavailable. Please enter your address manually.');
      setAddressMode('manual');
      return;
    }

    setIsDetectingLocation(true);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 12000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;

      // Reverse geocode via OpenStreetMap Nominatim
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'en',
            },
          }
        );

        if (!res.ok) throw new Error('Geocoding service unavailable');

        const data = await res.json();
        const addr = data.address || {};

        const houseFlat = addr.house_number || addr.building || addr.suburb || '';
        const streetArea = addr.road || addr.neighbourhood || addr.residential || '';
        const landmark = addr.attraction || addr.amenity || '';
        const city = addr.city || addr.town || addr.village || addr.county || 'Moodbidri';
        const state = addr.state || 'Karnataka';
        const pincode = addr.postcode || '';
        const formatted =
          data.display_name ||
          [houseFlat, streetArea, landmark, city, state, pincode].filter(Boolean).join(', ');

        setAddress({
          addressMode: 'detected',
          houseFlat: houseFlat || 'Near Detected Location',
          streetArea: streetArea || 'Moodbidri Road',
          landmark,
          city: city || 'Moodbidri',
          state: state || 'Karnataka',
          pincode: pincode || '574227',
          formattedAddress: formatted,
          latitude,
          longitude,
        });
      } catch {
        // Fallback with coordinates if reverse geocode is blocked/slow
        setAddress({
          addressMode: 'detected',
          houseFlat: 'Current Location',
          streetArea: 'Kotebagilu, Moodbidri Road',
          landmark: 'Moodbidri Taluk',
          city: 'Moodbidri',
          state: 'Karnataka',
          pincode: '574227',
          formattedAddress: `Kotebagilu, Moodbidri Road, Moodbidri, Karnataka - 574227 (GPS: ${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
          latitude,
          longitude,
        });
      }
    } catch (err: unknown) {
      const error = err as GeolocationPositionError;
      if (error && error.code === 1) {
        setLocationError('Location access was denied. Please enter your address manually.');
      } else {
        setLocationError('Location detection is unavailable. Please enter your address manually.');
      }
      setAddressMode('manual');
    } finally {
      setIsDetectingLocation(false);
    }
  }, []);

  // Place Order handler
  const placeOrder = useCallback(async (): Promise<ShopOrderRecord | null> => {
    if (isSubmitting) return null;
    setSubmitError(null);

    // Validation
    if (!customer.fullName.trim()) {
      setSubmitError('Please enter your full name');
      return null;
    }
    const cleanPhone = customer.phone.replace(/[\s\-\+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setSubmitError('Please enter a valid 10-digit phone number');
      return null;
    }
    if (items.length === 0) {
      setSubmitError('Your cart is empty. Please add items before placing an order.');
      return null;
    }

    const fullAddr = getFormattedAddress();
    if (!fullAddr || fullAddr === 'No address entered yet') {
      setSubmitError('Please provide a valid delivery address');
      return null;
    }

    setIsSubmitting(true);

    try {
      // Simulate network / server-side order calculation & persistence
      await new Promise((resolve) => setTimeout(resolve, 800));

      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const orderNumber = `RZ-ORD-${randomSuffix}`;
      const orderId = `order_${Date.now()}_${randomSuffix}`;

      const newOrder: ShopOrderRecord = {
        order_id: orderId,
        order_number: orderNumber,
        customer_id: `cust_${cleanPhone.slice(-6)}`,
        customer_name: customer.fullName.trim(),
        phone: customer.phone.trim(),
        email: customer.email?.trim() || '',
        delivery_address: {
          ...address,
          formattedAddress: fullAddr,
        },
        items: [...items],
        subtotal,
        delivery_charge: deliveryCharge,
        tax,
        total: finalTotal,
        payment_method: 'cod',
        payment_status: 'cod',
        order_status: 'pending',
        created_at: new Date().toISOString(),
      };

      // Save order
      setOrders((prev) => [newOrder, ...prev]);
      setLatestOrder(newOrder);

      // Clear cart only after successful order creation
      clearCart();

      // Advance to Screen 3 Confirmation
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      return newOrder;
    } catch {
      setSubmitError('Failed to place order. Please try again.');
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [
    isSubmitting,
    customer,
    items,
    address,
    getFormattedAddress,
    subtotal,
    deliveryCharge,
    tax,
    finalTotal,
    clearCart,
  ]);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.order_id === orderId ? { ...ord, order_status: status } : ord))
    );
  }, []);

  const openOrdersModal = useCallback(() => setIsOrdersModalOpen(true), []);
  const closeOrdersModal = useCallback(() => setIsOrdersModalOpen(false), []);

  return (
    <CheckoutContext.Provider
      value={{
        step,
        goToStep,
        customer,
        setCustomer,
        address,
        setAddress,
        addressMode,
        setAddressMode,
        isDetectingLocation,
        locationError,
        detectLocation,
        storeSettings,
        updateStoreSettings,
        subtotal,
        deliveryCharge,
        tax,
        finalTotal,
        isSubmitting,
        submitError,
        placeOrder,
        latestOrder,
        orders,
        updateOrderStatus,
        isOrdersModalOpen,
        openOrdersModal,
        closeOrdersModal,
        getFormattedAddress,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
