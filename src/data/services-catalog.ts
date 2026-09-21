import { ServiceBookingItem } from '../types/booking';

export const SALON_BRANCH_INFO = {
  name: "Loyal Professional Men's Parlour - Main Branch",
  shortName: 'Moodbidri Main Branch',
  address: 'Kotebagilu, Moodbidri Road, Moodbidri S.O., Moodbidri Taluk, Dakshina Kannada District, Karnataka - 574227',
  phone: '+91 97315 42050',
  rawPhone: '9731542050',
  upiId: 'loyalmens@upi',
  hours: '09:00 AM – 08:00 PM',
};

export const BASE_SERVICES_CATALOG: ServiceBookingItem[] = [
  // --- Haircut & Styling ---
  {
    id: 'haircut-styling',
    name: 'Haircut & Styling',
    category: 'Haircut & Styling',
    desc: 'Precision cuts, modern styles and expert finishing tailored to your facial structure.',
    price: '₹110 – ₹130',
    duration: '45 mins',
    thumb: '/images/services/haircut-styling.jpg',
  },
  {
    id: 'hair-cutting',
    name: 'Hair Cutting',
    category: 'Haircut & Styling',
    desc: 'Custom gentleman haircut with straight-razor nape clean-up and styling finish.',
    price: '₹120',
    duration: '45 mins',
    thumb: '/images/services/hair-cutting.jpg',
  },
  {
    id: 'head-massage',
    name: 'Head Massage',
    category: 'Haircut & Styling',
    desc: 'Deep relaxing pressure point massage with revitalizing herbal essential oils.',
    price: '₹399',
    duration: '30 mins',
    thumb: '/images/services/head-massage.jpg',
  },
  {
    id: 'hair-spa-treatment',
    name: 'Hair Spa Treatment',
    category: 'Haircut & Styling',
    desc: 'Intensive botanical mask treatment for deep hydration and scalpel rejuvenation.',
    price: '₹799',
    duration: '60 mins',
    thumb: '/images/services/hair-spa-treatment.jpg',
  },
  {
    id: 'hair-smoothening',
    name: 'Hair Smoothening',
    category: 'Haircut & Styling',
    desc: 'Long-lasting salon grade smoothing for silkier, easily manageable hair.',
    price: '₹1,999',
    duration: '90 mins',
    thumb: '/images/services/hair-smoothening.jpg',
  },

  // --- Beard Grooming ---
  {
    id: 'beard-grooming',
    name: 'Beard Grooming',
    category: 'Beard Grooming',
    desc: 'Complete beard care regimen: hot towel soften, sculpting, line-up and organic beard oil.',
    price: '₹199 – ₹399',
    duration: '30 mins',
    thumb: '/images/services/beard-grooming.jpg',
  },
  {
    id: 'beard-trimming',
    name: 'Beard Trimming',
    category: 'Beard Grooming',
    desc: 'Neat and defined trimming with symmetry check, always on point.',
    price: '₹99',
    duration: '20 mins',
    thumb: '/images/services/beard-trimming.jpg',
  },
  {
    id: 'beard-styling',
    name: 'Beard Styling',
    category: 'Beard Grooming',
    desc: 'Shape your beard with bespoke fading and clipper precision to match your look.',
    price: '₹199',
    duration: '30 mins',
    thumb: '/images/services/beard-styling.jpg',
  },
  {
    id: 'beard-spa',
    name: 'Beard Spa',
    category: 'Beard Grooming',
    desc: 'Deep conditioning steam, botanical scrub and argan balm for a healthier, stronger beard.',
    price: '₹299',
    duration: '40 mins',
    thumb: '/images/services/beard-spa.jpg',
  },
  {
    id: 'beard-lining',
    name: 'Beard Lining',
    category: 'Beard Grooming',
    desc: 'Clean, razor-sharp edges along cheeks and neckline for a sharp, confident profile.',
    price: '₹149',
    duration: '20 mins',
    thumb: '/images/services/beard-lining.jpg',
  },

  // --- Facial & Skin Care ---
  {
    id: 'facial-skin-care',
    name: 'Facial & Skin Care',
    category: 'Facial & Skin Care',
    desc: 'Revitalizing facial ritual using gentle exfoliation, pore clearing and cold hydration.',
    price: '₹599',
    duration: '45 mins',
    thumb: '/images/services/facial-skin-care.jpg',
  },
  {
    id: 'de-tan-facial',
    name: 'De-Tan Facial',
    category: 'Facial & Skin Care',
    desc: 'Natural fruit AHA peel and sun-damage reversal mask for instant brightening.',
    price: '₹499',
    duration: '40 mins',
    thumb: '/images/services/de-tan-facial.jpg',
  },
  {
    id: 'gold-facial',
    name: 'Gold Glow Facial',
    category: 'Facial & Skin Care',
    desc: '24K colloidal gold infused therapy for luminous texture and deep hydration.',
    price: '₹899',
    duration: '60 mins',
    thumb: '/images/services/gold-facial.jpg',
  },
  {
    id: 'charcoal-detox',
    name: 'Charcoal Detox',
    category: 'Facial & Skin Care',
    desc: 'Activated carbon mask pulls micro-pollutants and unclogs deep facial pores.',
    price: '₹649',
    duration: '45 mins',
    thumb: '/images/services/charcoal-detox.jpg',
  },

  // --- Hair Colour & Treatment ---
  {
    id: 'hair-colour-treatment',
    name: 'Hair Colour & Treatment',
    category: 'Hair Colour & Treatment',
    desc: 'Ammonia-free premium gloss colour matched specifically to your undertone.',
    price: '₹999',
    duration: '60 mins',
    thumb: '/images/services/hair-colour-treatment.jpg',
  },
  {
    id: 'beard-colouring',
    name: 'Beard Colouring',
    category: 'Hair Colour & Treatment',
    desc: 'Natural black or subtle espresso brown root coverage with sensitive skin protection.',
    price: '₹349',
    duration: '25 mins',
    thumb: '/images/services/beard-colouring.jpg',
  },
  {
    id: 'hair-highlights',
    name: 'Hair Highlights',
    category: 'Hair Colour & Treatment',
    desc: 'Subtle sun-kissed streaks or bold metallic streaks with bond-building plex.',
    price: '₹1,299',
    duration: '75 mins',
    thumb: '/images/services/hair-highlights.jpg',
  },
  {
    id: 'keratin-treatment',
    name: 'Keratin Protein Treatment',
    category: 'Hair Colour & Treatment',
    desc: 'Intense keratin infusion restores damaged hair shafts, creating smooth mirror shine.',
    price: '₹2,499',
    duration: '120 mins',
    thumb: '/images/services/keratin-treatment.jpg',
  },
];

const STORAGE_OVERRIDE_KEY = 'rizheena_services_override';

export function getServicesCatalog(): ServiceBookingItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_OVERRIDE_KEY);
    if (saved) {
      const overrides: Record<string, Partial<ServiceBookingItem>> = JSON.parse(saved);
      return BASE_SERVICES_CATALOG.map((svc) => {
        if (overrides[svc.id]) {
          return { ...svc, ...overrides[svc.id] };
        }
        return svc;
      });
    }
  } catch {
    // ignore
  }
  return BASE_SERVICES_CATALOG;
}

export function saveServiceOverride(serviceId: string, updates: Partial<ServiceBookingItem>): void {
  try {
    const saved = localStorage.getItem(STORAGE_OVERRIDE_KEY);
    const overrides: Record<string, Partial<ServiceBookingItem>> = saved ? JSON.parse(saved) : {};
    overrides[serviceId] = { ...(overrides[serviceId] || {}), ...updates };
    localStorage.setItem(STORAGE_OVERRIDE_KEY, JSON.stringify(overrides));
  } catch {
    // ignore
  }
}

export function findServiceByNameOrId(query: string): ServiceBookingItem {
  const catalog = getServicesCatalog();
  const clean = query.trim().toLowerCase();

  // Exact ID match
  const byId = catalog.find((s) => s.id.toLowerCase() === clean);
  if (byId) return byId;

  // Exact Name match
  const byName = catalog.find((s) => s.name.toLowerCase() === clean);
  if (byName) return byName;

  // Partial match
  const byPartial = catalog.find(
    (s) => s.name.toLowerCase().includes(clean) || clean.includes(s.name.toLowerCase())
  );
  if (byPartial) return byPartial;

  // Default fallback to Haircut & Styling
  return catalog[0];
}
