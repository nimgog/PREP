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
