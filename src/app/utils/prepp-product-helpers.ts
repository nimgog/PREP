import { ProductId } from '../models/product.model';

export const parseProductIdFromUrl = (
  relativeUrl: string
): ProductId | null => {
  const productSlug = relativeUrl.replace('/shop/products/', '').split('/')[0];

  if (!productSlug) {
    return null;
  }

  const idSeparator = productSlug.lastIndexOf('-');

  if (idSeparator === -1) {
    return null;
  }

  const rawProductId = productSlug.substring(idSeparator + 1);

  return rawProductId ? new ProductId(rawProductId) : null;
};
