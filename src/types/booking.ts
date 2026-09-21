export type BookingStatus =
  | 'pending'
  | 'payment_verification'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export type PaymentStatus =
  | 'unpaid'
  | 'verification_pending'
  | 'advance_paid'
  | 'fully_paid';

export interface ServiceBookingItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  price: string;
  duration: string;
  thumb: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  branch: string;
  gender?: string;
  specialRequest?: string;
  whatsappConsent: boolean;
}

export interface BookingRecord {
  booking_id: string;
  customer_id: string;
  service_id: string;
  service_name: string;
  service_price: string;
  duration: string;
  service_image: string;
  date: string; // Formatted date string, e.g. "Mon, Sep 21, 2026"
  date_iso: string; // YYYY-MM-DD
  time: string; // e.g. "01:30 PM"
  branch: string;
  branch_address: string;
  customer_name: string;
  phone: string;
  email: string;
  gender?: string;
  special_request?: string;
  booking_status: BookingStatus;
  payment_status: PaymentStatus;
  payment_utr?: string;
  created_at: string;
}

export interface TimeSlot {
  time: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  isAvailable: boolean;
  bookedReason?: string;
}
