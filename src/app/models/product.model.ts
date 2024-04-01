export type Image = {
  src: string;
  alt?: string;
};

export type Money = {
  amount: number;
  currencyCode: string;
};

export type Product = {
  slug: string;
  description: string;
};

export type ProductVariant = {
  id: string;
  images: Image[];
  originalPrice?: Money;
  price: Money;
};
