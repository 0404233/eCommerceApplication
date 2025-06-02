import { ProductProjection } from '@commercetools/platform-sdk';
import { DetailCarData } from '../types/types';

export const extractDetails = (product: ProductProjection): DetailCarData => {
  const name = product.name?.['en-US'] || 'Unnamed car';
  const description = product.description?.['en-US'] || 'No additional info';
  const priceObj = product.masterVariant.prices?.[0];
  const price = priceObj ? priceObj.value.centAmount / 100 : 0;
  let discounted: number | undefined;
  if (priceObj?.discounted) {
    discounted = priceObj.discounted.value.centAmount / 100;
  }
  const images = product.masterVariant.images || [];
  const detailData: DetailCarData = {
    name,
    description,
    price,
    images,
  };
  if (discounted) {
    detailData.discounted = discounted;
  }
  return detailData;
};
