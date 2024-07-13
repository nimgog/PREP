export type Image = {
  src: string;
  alt?: string;
};

export type Money = {
  amount: number;
  currencyCode: string;
};

export type ProductListItem = {
  productId: string;
  title: string;
  summary: string;
  productPageUrl: string;
  discounted: boolean;
  imageUrl: string; // TODO: Use Image type
  imageAlt?: string;
  price: Money;
};

export type ProductV2 = {
  id: string;
  title: string;
  summary: string;
  productPageUrl: string;
  textDescription: string;
  htmlDescription: string;
  images: Image[];
  price: Money;
};

export type ProductStructuredData = {
  id: string;
  title: string;
  summary: string;
  productPageUrl: string;
  images: Image[];
  price: Money;
};
