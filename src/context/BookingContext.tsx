import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  BookingRecord,
  BookingStatus,
  CustomerDetails,
  PaymentStatus,
  ServiceBookingItem,
  TimeSlot,
} from '../types/booking';
import {
  BASE_SERVICES_CATALOG,
  SALON_BRANCH_INFO,
  findServiceByNameOrId,
} from '../data/services-catalog';

interface BookingContextType {
  // Current in-progress booking state
  service: ServiceBookingItem;
  setService: (svc: ServiceBookingItem) => void;
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
  selectedTime: string;
  setSelectedTime: (t: string) => void;
  customerDetails: CustomerDetails;
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>;
  specialRequest: string;
  setSpecialRequest: (req: string) => void;
  step: 1 | 2 | 3 | 4;
  setStep: (step: 1 | 2 | 3 | 4) => void;

  // Bookings list & latest confirmed
  bookings: BookingRecord[];
  latestBooking: BookingRecord | null;

  // Actions
  getTimeSlotsForDate: (d: Date) => TimeSlot[];
  isSlotBooked: (dateStr: string, timeStr: string) => boolean;
  createBooking: () => Promise<BookingRecord>;
  updateBookingStatus: (id: string, status: BookingStatus, paymentStatus?: PaymentStatus) => void;
  submitUtrPayment: (bookingId: string, utr: string) => void;
  resetBookingFlow: () => void;
}

const STORAGE_BOOKINGS_KEY = 'rizheena_bookings_list';

const INITIAL_DETAILS: CustomerDetails = {
  fullName: '',
  phone: '',
  email: '',
  branch: SALON_BRANCH_INFO.name,
  whatsappConsent: true,
};

// Standard Salon Slot Generator (9:00 AM to 7:30 PM, 30m steps)
const STANDARD_SLOTS: { time: string; period: 'Morning' | 'Afternoon' | 'Evening' }[] = [
  // Morning
  { time: '09:00 AM', period: 'Morning' },
  { time: '09:30 AM', period: 'Morning' },
  { time: '10:00 AM', period: 'Morning' },
  { time: '10:30 AM', period: 'Morning' },
  { time: '11:00 AM', period: 'Morning' },
  { time: '11:30 AM', period: 'Morning' },
  { time: '12:00 PM', period: 'Morning' },
  { time: '12:30 PM', period: 'Morning' },
  // Afternoon
  { time: '01:00 PM', period: 'Afternoon' },
  { time: '01:30 PM', period: 'Afternoon' },
  { time: '02:00 PM', period: 'Afternoon' },
  { time: '02:30 PM', period: 'Afternoon' },
  { time: '03:00 PM', period: 'Afternoon' },
  { time: '03:30 PM', period: 'Afternoon' },
  // Evening
  { time: '04:00 PM', period: 'Evening' },
  { time: '04:30 PM', period: 'Evening' },
  { time: '05:00 PM', period: 'Evening' },
  { time: '05:30 PM', period: 'Evening' },
  { time: '06:00 PM', period: 'Evening' },
  { time: '06:30 PM', period: 'Evening' },
  { time: '07:00 PM', period: 'Evening' },
  { time: '07:30 PM', period: 'Evening' },
];

export function formatDateToIso(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatHumanDate(d: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return d.toLocaleDateString('en-US', options);
}

// Initial demo bookings to demonstrate double-booking slot protection
function getInitialBookings(): BookingRecord[] {
  try {
    const stored = localStorage.getItem(STORAGE_BOOKINGS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }

  // Pre-book 1 slot on today and tomorrow for demonstration of double-booking prevention
  const today = new Date();
  const todayIso = formatDateToIso(today);
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowIso = formatDateToIso(tomorrow);

  return [
    {
      booking_id: 'RZ-2026-1082',
      customer_id: 'cust-1',
      service_id: 'haircut-styling',
      service_name: 'Haircut & Styling',
      service_price: '₹120',
      duration: '45 mins',
      service_image: '/images/services/haircut-styling.jpg',
      date: formatHumanDate(today),
      date_iso: todayIso,
      time: '10:00 AM',
      branch: SALON_BRANCH_INFO.name,
      branch_address: SALON_BRANCH_INFO.address,
      customer_name: 'Karthik Rao',
      phone: '+91 98450 12345',
      email: 'karthik.rao@example.com',
      special_request: 'Skin fade with beard trim',
      booking_status: 'confirmed',
      payment_status: 'advance_paid',
      created_at: new Date().toISOString(),
    },
    {
      booking_id: 'RZ-2026-1083',
      customer_id: 'cust-2',
      service_id: 'beard-trimming',
      service_name: 'Beard Trimming',
      service_price: '₹99',
      duration: '20 mins',
      service_image: '/images/services/beard-trimming.jpg',
      date: formatHumanDate(tomorrow),
      date_iso: tomorrowIso,
      time: '02:00 PM',
      branch: SALON_BRANCH_INFO.name,
      branch_address: SALON_BRANCH_INFO.address,
      customer_name: 'Mohammed Suhail',
      phone: '+91 98860 54321',
      email: 'suhail.m@example.com',
      special_request: '',
      booking_status: 'confirmed',
      payment_status: 'advance_paid',
      created_at: new Date().toISOString(),
    },
  ];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [service, setService] = useState<ServiceBookingItem>(() => BASE_SERVICES_CATALOG[0]);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    // Default to today
    return d;
  });
  const [selectedTime, setSelectedTime] = useState<string>('11:30 AM');
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(INITIAL_DETAILS);
  const [specialRequest, setSpecialRequest] = useState<string>('');
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [bookings, setBookings] = useState<BookingRecord[]>(() => getInitialBookings());
  const [latestBooking, setLatestBooking] = useState<BookingRecord | null>(null);

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
    } catch {
      // storage full or disabled
    }
  }, [bookings]);

  // Check if a slot is already booked for date + time
  const isSlotBooked = useCallback(
    (dateStr: string, timeStr: string): boolean => {
      return bookings.some(
        (b) =>
          b.date_iso === dateStr &&
          b.time === timeStr &&
          (b.booking_status === 'confirmed' || b.booking_status === 'payment_verification')
      );
    },
    [bookings]
  );

  // Time slots for a given date with live availability
  const getTimeSlotsForDate = useCallback(
    (d: Date): TimeSlot[] => {
      const dateIso = formatDateToIso(d);
      return STANDARD_SLOTS.map((slot) => {
        const booked = isSlotBooked(dateIso, slot.time);
        return {
          time: slot.time,
          period: slot.period,
          isAvailable: !booked,
          bookedReason: booked ? 'Already reserved by another customer' : undefined,
        };
      });
    },
    [isSlotBooked]
  );

  // Create new booking record
  const createBooking = useCallback(async (): Promise<BookingRecord> => {
    const dateIso = formatDateToIso(selectedDate);
    const humanDate = formatHumanDate(selectedDate);

    // Double-booking check
    if (isSlotBooked(dateIso, selectedTime)) {
      throw new Error(`Slot ${selectedTime} on ${humanDate} is no longer available. Please select another slot.`);
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newRecord: BookingRecord = {
      booking_id: `RZ-${new Date().getFullYear()}-${randomSuffix}`,
      customer_id: `cust-${Date.now()}`,
      service_id: service.id,
      service_name: service.name,
      service_price: service.price,
      duration: service.duration,
      service_image: service.thumb,
      date: humanDate,
      date_iso: dateIso,
      time: selectedTime,
      branch: customerDetails.branch || SALON_BRANCH_INFO.name,
      branch_address: SALON_BRANCH_INFO.address,
      customer_name: customerDetails.fullName.trim() || 'Valued Guest',
      phone: customerDetails.phone.trim(),
      email: customerDetails.email.trim(),
      special_request: specialRequest.trim(),
      booking_status: 'confirmed',
      payment_status: 'unpaid',
      created_at: new Date().toISOString(),
    };

    setBookings((prev) => [newRecord, ...prev]);
    setLatestBooking(newRecord);
    setStep(4);
    return newRecord;
  }, [selectedDate, selectedTime, isSlotBooked, service, customerDetails, specialRequest]);

  const updateBookingStatus = useCallback(
    (id: string, status: BookingStatus, paymentStatus?: PaymentStatus) => {
      setBookings((prev) =>
        prev.map((b) =>
          b.booking_id === id
            ? {
                ...b,
                booking_status: status,
                ...(paymentStatus ? { payment_status: paymentStatus } : {}),
              }
            : b
        )
      );
    },
    []
  );

  const submitUtrPayment = useCallback((bookingId: string, utr: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.booking_id === bookingId
          ? {
              ...b,
              booking_status: 'payment_verification',
              payment_status: 'verification_pending',
              payment_utr: utr,
            }
          : b
      )
    );
  }, []);

  const resetBookingFlow = useCallback(() => {
    setStep(1);
    setSelectedTime('11:30 AM');
    setCustomerDetails(INITIAL_DETAILS);
    setSpecialRequest('');
    setLatestBooking(null);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        service,
        setService,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        customerDetails,
        setCustomerDetails,
        specialRequest,
        setSpecialRequest,
        step,
        setStep,
        bookings,
        latestBooking,
        getTimeSlotsForDate,
        isSlotBooked,
        createBooking,
        updateBookingStatus,
        submitUtrPayment,
        resetBookingFlow,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider');
  return ctx;
};
