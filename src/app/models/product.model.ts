export type Image = {
  src: string;
  alt?: string;
};

export type Money = {
  amount: number;
  currencyCode: string;
};

export type ProductListItem = {
  id: ProductId;
  title: string;
  summary: string;
  productPageUrl: string;
  discounted: boolean;
  imageUrl: string; // TODO: Use Image type
  imageAlt?: string;
  price: Money;
};

export type ProductV2 = {
  id: ProductId;
  title: string;
  summary: string;
  productPageUrl: string;
  textDescription: string;
  htmlDescription: string;
  images: Image[];
  price: Money;
};

export type ProductStructuredData = {
  id: ProductId;
  title: string;
  summary: string;
  productPageUrl: string;
  images: Image[];
  price: Money;
};

export class ProductId {
  private static readonly SHOPIFY_PRODUCT_ID_PREFIX =
    'gid://shopify/ProductVariant/';

  private readonly normalizedId: string;

  constructor(anyId: string) {
    if (!anyId) {
      throw new Error('ID must be specificed.');
    }

    if (anyId.startsWith(ProductId.SHOPIFY_PRODUCT_ID_PREFIX)) {
      anyId = anyId.replace(ProductId.SHOPIFY_PRODUCT_ID_PREFIX, '');
    }

    this.normalizedId = anyId;
  }

  get preppId() {
    return this.normalizedId;
  }

  get shopifyId() {
    return `${ProductId.SHOPIFY_PRODUCT_ID_PREFIX}${this.normalizedId}`;
  }
}
