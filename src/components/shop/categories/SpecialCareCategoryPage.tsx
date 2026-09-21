import React from 'react';
import { ShopCategoryPage } from '../ShopCategoryPage';
import { SHOP_CATEGORIES_DATA } from '../../../data/shop-categories';

export const SpecialCareCategoryPage: React.FC = () => {
  return <ShopCategoryPage config={SHOP_CATEGORIES_DATA['special-care']} />;
};
