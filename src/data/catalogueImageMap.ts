/**
 * RIZHEENA Catalogue Image Manifest
 * Maps product and service IDs to authentic, verified uploaded assets.
 */

export interface ImageManifestEntry {
  id: string;
  name: string;
  category: string;
  image: string;
  images?: string[];
  originalSourceFile: string;
}

export const CATALOGUE_IMAGE_MAP: Record<string, string> = {
  // Hair Care
  'hair-shampoo': '/images/catalogue/hair-care/hair-shampoo.jpg',
  'hair-conditioner': '/images/catalogue/hair-care/hair-conditioner.jpg',
  'hair-oil': '/images/catalogue/hair-care/hair-oil.jpg',
  'hair-gel': '/images/catalogue/hair-care/hair-gel.jpg',
  'hair-dye': '/images/catalogue/hair-care/hair-dye.jpg',
  'hair-coloring': '/images/catalogue/hair-care/hair-coloring.jpg',
  'hair-mehendi': '/images/catalogue/hair-care/hair-mehendi.jpg',
  'hair-straightener': '/images/catalogue/hair-care/hair-straightener.jpg',
  'hair-care-collection': '/images/catalogue/hair-care/hair-care-collection.jpg',

  // Face Care
  'face-wash': '/images/catalogue/face-care/face-wash.jpg',
  'moisturizer': '/images/catalogue/face-care/moisturizer.jpg',
  'cold-cream': '/images/catalogue/face-care/cold-cream.jpg',
  'day-cream': '/images/catalogue/face-care/day-cream.jpg',
  'night-cream': '/images/catalogue/face-care/night-cream.jpg',
  'sunscreen': '/images/catalogue/face-care/sunscreen.jpg',
  'pimple-cream': '/images/catalogue/face-care/pimple-cream.jpg',
  'pimple-cream-alt': '/images/catalogue/face-care/pimple-cream-alt.jpg',
  'detan-cream': '/images/catalogue/face-care/detan-cream.jpg',
  'face-care-collection': '/images/catalogue/face-care/face-care-collection.jpg',

  // Beard Care
  'beard-oil': '/images/catalogue/beard-care/beard-oil.jpg',
  'beard-wash': '/images/catalogue/beard-care/beard-wash.jpg',
  'shaving-cream': '/images/catalogue/beard-care/shaving-cream.jpg',
  'beard-care-collection': '/images/catalogue/beard-care/beard-care-collection.jpg',

  // Professional Kits
  'keratin-kit-full': '/images/catalogue/professional-kits/keratin-kit-full.jpg',
  'instant-glow-kit': '/images/catalogue/professional-kits/instant-glow-kit.jpg',
  'fruit-kit': '/images/catalogue/professional-kits/fruit-kit.jpg',
  'diamond-kit': '/images/catalogue/professional-kits/diamond-kit.jpg',
  'professional-salon-kit': '/images/catalogue/professional-kits/professional-salon-kit.jpg',

  // Special Care
  'anti-hair-fall-shampoo': '/images/catalogue/special-care/anti-hair-fall-shampoo.jpg',
  'hair-tonic': '/images/catalogue/special-care/hair-tonic.jpg',
  'hair-mask': '/images/catalogue/special-care/hair-mask.jpg',
  'hair-serum': '/images/catalogue/special-care/hair-serum.jpg',
  'special-care-collection': '/images/catalogue/special-care/special-care-collection.jpg',

  // Gift Sets
  'essential-grooming-kit': '/images/catalogue/gift-sets/essential-grooming-kit.jpg',
  'premium-care-kit': '/images/catalogue/gift-sets/premium-care-kit.jpg',
  'luxury-grooming-kit': '/images/catalogue/gift-sets/luxury-grooming-kit.jpg',
  'signature-gift-set': '/images/catalogue/gift-sets/signature-gift-set.jpg',
  'gift-set-display': '/images/catalogue/gift-sets/gift-set-display.jpg',
  'luxury-vvip-kit': '/images/catalogue/gift-sets/luxury-vvip-kit.jpg',
  'vip-membership-set': '/images/catalogue/gift-sets/vip-membership-set.jpg',
  'grooming-products-display': '/images/catalogue/gift-sets/grooming-products-display.jpg',

  // Services
  'service-haircut-styling': '/images/services/haircut-styling.jpg',
  'service-hair-cutting': '/images/services/hair-cutting.jpg',
  'service-head-massage': '/images/services/head-massage.jpg',
  'service-hair-spa-treatment': '/images/services/hair-spa-treatment.jpg',
  'service-hair-smoothening': '/images/services/hair-smoothening.jpg',
  'service-beard-grooming': '/images/services/beard-grooming.jpg',
  'service-beard-trimming': '/images/services/beard-trimming.jpg',
  'service-beard-styling': '/images/services/beard-styling.jpg',
  'service-beard-spa': '/images/services/beard-spa.jpg',
  'service-beard-lining': '/images/services/beard-lining.jpg',
  'service-facial-skin-care': '/images/services/facial-skin-care.jpg',
  'service-de-tan-facial': '/images/services/de-tan-facial.jpg',
  'service-gold-facial': '/images/services/gold-facial.jpg',
  'service-charcoal-detox': '/images/services/charcoal-detox.jpg',
  'service-hair-colour-treatment': '/images/services/hair-colour-treatment.jpg',
  'service-beard-colouring': '/images/services/beard-colouring.jpg',
  'service-hair-highlights': '/images/services/hair-highlights.jpg',
  'service-keratin-treatment': '/images/services/keratin-treatment.jpg',
};

export function getCatalogueImage(key: string, fallback = ''): string {
  return CATALOGUE_IMAGE_MAP[key] || fallback;
}
