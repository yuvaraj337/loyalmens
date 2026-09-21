import React from 'react';
import { ShopCategoryPage } from '../ShopCategoryPage';
import { SHOP_CATEGORIES_DATA } from '../../../data/shop-categories';

export const GiftSetsCategoryPage: React.FC = () => {
  return <ShopCategoryPage config={SHOP_CATEGORIES_DATA['gift-sets']} />;
};
