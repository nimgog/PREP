import slugify from 'slugify';
import type {
  ProductQuery,
  ProductsQuery,
  ProductV2Query,
} from 'src/app/graphql/types';
import type {
  Image,
  ProductListItem,
  ProductV2,
} from 'src/app/models/product.model';

type ElementType<T> = T extends (infer U)[] ? U : never;

const parseProductSku = (variantId: string) =>
  variantId.replace('gid://shopify/ProductVariant/', '');

export const buildPreppProductUrl = (
  variantId: string,
  productTitle: string,
  variantSlugSeoTagOverride?: string
) => {
  const variantSlugSeoTags = variantSlugSeoTagOverride
    ? variantSlugSeoTagOverride
    : slugify(productTitle.toLowerCase());

  const preppProductId = parseProductSku(variantId);

  return `/shop/products/${variantSlugSeoTags}-${preppProductId}`;
};

type ShopifyProductList = ProductsQuery['products'];
type ShopifyProductListItem = ElementType<ShopifyProductList['nodes']>;

export const mapShopifyProductToPrepProductListItem = (
  shopifyProduct: ShopifyProductListItem
): ProductListItem => {
  const variant = shopifyProduct.variants.nodes[0];
  const preppProductId = parseProductSku(variant.id);

  const productPageUrl = buildPreppProductUrl(
    preppProductId,
    shopifyProduct.title,
    variant.variantSlugSeoTagOverride?.value
  );

  return {
    productId: preppProductId,
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

  const preppProductId = parseProductSku(shopifyVariant.id);

  const productPageUrl = buildPreppProductUrl(
    preppProductId,
    shopifyVariant.product.title,
    shopifyVariant.variantSlugSeoTagOverride?.value
  );

  // TODO: Restrict image sizes in GQL definition

  return {
    id: preppProductId,
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
