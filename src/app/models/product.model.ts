export type Image = {
  src: string;
  alt?: string;
};

export type Money = {
  amount: number;
  currencyCode: string;
};

export type Product = {
  // slug: string;
  // description: string;
  variants: ProductVariant[];
};

export type ProductVariant = {
  id: string;
  // images: Image[];
  // originalPrice?: Money;
  price: Money;
};

export type ProductListItem = {
  productId: string;
  title: string;
  summary: string;
  productPageUrl?: string;
  discounted: boolean;
  imageUrl: string; // TODO: Use Image type
  imageAlt?: string;
  price: Money;
};

export type ProductV2 = {
  id: string;
  title: string;
  summary: string;
  textDescription: string;
  htmlDescription: string;
  images: Image[];
  price: Money;
};
