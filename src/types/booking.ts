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
  date: string; // Formatted date string, e.g. "Wed, 16 Oct 2024"
  date_iso: string; // YYYY-MM-DD
  time: string; // e.g. "11:30 AM"
  branch: string;
  branch_address: string;
  customer_name: string;
  phone: string;
  email: string;
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
