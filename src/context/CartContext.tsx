import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

/* ======================================================================
   CART TYPES
   ====================================================================== */
export interface CartItem {
  id: string;
  name: string;
  size: string;
  price: string;
  image: string;
  category: string;
  description?: string;
  quantity: number;
}

export interface CartNotification {
  id: string;
  product: CartItem;
  timestamp: number;
}

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addItem: (product: Omit<CartItem, 'quantity'>, quantity: number) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  notification: CartNotification | null;
  dismissNotification: () => void;
  badgeAnimating: boolean;
}

const STORAGE_KEY = 'rizheena-cart';

/* ======================================================================
   HELPERS & DEFAULTS
   ====================================================================== */
export const DEFAULT_INITIAL_CART: CartItem[] = [
  {
    id: 'hc-1',
    name: 'Hair Shampoo Wash',
    size: '200ml',
    price: '₹80',
    image: '/images/catalogue/hair-care/hair-shampoo.jpg',
    category: 'Hair Care',
    quantity: 1,
  },
  {
    id: 'bc-1',
    name: 'Beard Oil',
    size: '30ml',
    price: '₹150',
    image: '/images/catalogue/beard-care/beard-oil.jpg',
    category: 'Beard Care',
    quantity: 1,
  },
];

export function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  // Handle ranges like "₹100 – ₹150" → take the first number (or single price)
  const match = priceStr.replace(/,/g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Silently ignore corrupt storage
  }
  return DEFAULT_INITIAL_CART;
}

function saveCart(items: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

/* ======================================================================
   CONTEXT
   ====================================================================== */
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};

/* ======================================================================
   PROVIDER
   ====================================================================== */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notification, setNotification] = useState<CartNotification | null>(null);
  const [badgeAnimating, setBadgeAnimating] = useState(false);
  const notifTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const badgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Persist on every change
  useEffect(() => {
    saveCart(items);
  }, [items]);

  // Computed values
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);

  // Add item — returns a promise so the button can await the "processing" phase
  const addItem = useCallback(async (product: Omit<CartItem, 'quantity'>, quantity: number): Promise<void> => {
    // Simulate a brief processing delay for the animation (400ms)
    await new Promise((resolve) => setTimeout(resolve, 400));

    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });

    // Trigger notification
    const notifItem: CartItem = { ...product, quantity };
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
    setNotification({ id: product.id + '-' + Date.now(), product: notifItem, timestamp: Date.now() });
    notifTimerRef.current = setTimeout(() => {
      setNotification(null);
    }, 4000);

    // Trigger badge bounce
    setBadgeAnimating(true);
    if (badgeTimerRef.current) clearTimeout(badgeTimerRef.current);
    badgeTimerRef.current = setTimeout(() => {
      setBadgeAnimating(false);
    }, 600);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const dismissNotification = useCallback(() => {
    setNotification(null);
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalPrice,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        notification,
        dismissNotification,
        badgeAnimating,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
