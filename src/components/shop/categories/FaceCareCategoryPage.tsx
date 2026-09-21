import React from 'react';
import { ShopCategoryPage } from '../ShopCategoryPage';
import { SHOP_CATEGORIES_DATA } from '../../../data/shop-categories';

export const FaceCareCategoryPage: React.FC = () => {
  return <ShopCategoryPage config={SHOP_CATEGORIES_DATA['face-care']} />;
};
