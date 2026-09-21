import { CartItem } from '../context/CartContext';

export interface CustomerDeliveryDetails {
  fullName: string;
  phone: string;
  email?: string;
}

export interface DeliveryAddress {
  addressMode: 'manual' | 'detected';
  houseFlat: string;
  streetArea: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  formattedAddress?: string;
  latitude?: number;
  longitude?: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'cod' | 'online';

export type PaymentStatus =
  | 'pending'
  | 'verification_required'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'cod';

export interface ShopOrderRecord {
  order_id: string;
  order_number: string;
  customer_id: string;
  customer_name: string;
  phone: string;
  email: string;
  delivery_address: DeliveryAddress;
  items: CartItem[];
  subtotal: number;
  delivery_charge: number;
  tax: number;
  total: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  created_at: string;
}

export interface StoreSettings {
  deliveryCharge: number;
  taxRate: number; // e.g. 0 or 0.08 for 8%
}
