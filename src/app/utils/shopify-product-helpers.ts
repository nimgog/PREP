import slugify from 'slugify';
import type { ProductsQuery, ProductV2Query } from '../graphql/types';
import {
  Image,
  ProductId,
  ProductListItem,
  ProductV2,
} from '../models/product.model';

type ElementType<T> = T extends (infer U)[] ? U : never;

export const buildPreppProductUrl = (
  productId: ProductId,
  productTitle: string,
  variantSlugSeoTagOverride?: string
) => {
  const variantSlugSeoTags = variantSlugSeoTagOverride
    ? variantSlugSeoTagOverride
    : slugify(productTitle.toLowerCase());

  return `/shop/products/${variantSlugSeoTags}-${productId.preppId}`;
};

type ShopifyProductList = ProductsQuery['products'];
type ShopifyProductListItem = ElementType<ShopifyProductList['nodes']>;

export const mapShopifyProductToPrepProductListItem = (
  shopifyProduct: ShopifyProductListItem
): ProductListItem => {
  const variant = shopifyProduct.variants.nodes[0];
  const productId = new ProductId(variant.id);

  const productPageUrl = buildPreppProductUrl(
    productId,
    shopifyProduct.title,
    variant.variantSlugSeoTagOverride?.value
  );

  return {
    id: productId,
    title: shopifyProduct.title,
    summary: shopifyProduct.summary?.value || '',
    productPageUrl: productPageUrl,
    discounted:
      (shopifyProduct.discounted?.value || 'false').toLowerCase() === 'true',
    imageUrl: variant.image?.url || '',
    imageAlt: variant.image?.altText || undefined,
    price: {
      amount: +variant.price.amount,
      currencyCode: variant.price.currencyCode,
    },
  };
};

type ShopifyProductV2 = NonNullable<ProductV2Query['node']> & {
  __typename: 'ProductVariant' | undefined;
};

export const mapShopifyVariantToPrepProduct = (
  shopifyVariant: ShopifyProductV2
): ProductV2 | null => {
  if (shopifyVariant.__typename === undefined) {
    return null;
  }

  const productId = new ProductId(shopifyVariant.id);

  const productPageUrl = buildPreppProductUrl(
    productId,
    shopifyVariant.product.title,
    shopifyVariant.variantSlugSeoTagOverride?.value
  );

  // TODO: Restrict image sizes in GQL definition

  return {
    id: productId,
    title: shopifyVariant.product.title,
    summary: shopifyVariant.product.summary?.value || '',
    productPageUrl: productPageUrl,
    textDescription: shopifyVariant.product.description,
    htmlDescription: shopifyVariant.product.descriptionHtml,
    images: shopifyVariant.product.images.nodes.map(
      (shopifyImage) =>
        <Image>{ src: shopifyImage.url, alt: shopifyImage.altText }
    ),
    price: {
      amount: +shopifyVariant.price.amount,
      currencyCode: shopifyVariant.price.currencyCode,
    },
  };
};
