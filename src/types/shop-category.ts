export interface ShopProductItem {
  id: string;
  name: string;
  size: string;
  price: string;
  image: string;
  category: string;
  description?: string;
  tags?: string[];
}

export interface FeatureItem {
  icon: 'diamond' | 'leaf' | 'beaker' | 'recycle' | 'shield' | 'chart' | 'people' | 'droplet' | 'ribbon' | 'gift' | 'star';
  text: string[];
}

export interface CategoryPageConfig {
  id: string;
  route: string;
  title: string;
  subtitle: string;
  productCountText?: string;
  hasSearch?: boolean;
  searchPlaceholder?: string;
  hasSort?: boolean;
  featureSideBadge?: {
    title: string;
    subtitle: string;
  };
  features: FeatureItem[];
  products: ShopProductItem[];
}
