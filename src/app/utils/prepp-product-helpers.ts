export const parseProductIdFromUrl = (relativeUrl: string): string | null => {
  const productSlug = relativeUrl.replace('/shop/products/', '').split('/')[0];

  if (!productSlug) {
    return null;
  }

  const idSeparator = productSlug.lastIndexOf('-');

  if (idSeparator === -1) {
    return null;
  }

  const productId = productSlug.substring(idSeparator + 1);

  return productId || null;
};
