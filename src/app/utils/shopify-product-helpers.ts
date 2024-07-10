import slugify from 'slugify';
import type {
  ProductQuery,
  ProductsQuery,
  ProductV2Query,
} from 'src/app/graphql/types';
import type {
  Image,
  Product,
  ProductListItem,
  ProductV2,
  ProductVariant,
} from 'src/app/models/product.model';

type ElementType<T> = T extends (infer U)[] ? U : never;

type ShopifyProduct = NonNullable<ProductQuery['product']>;

export const mapShopifyProductToPrepProduct = (
  shopifyProduct: ShopifyProduct
) => {
  const variants = shopifyProduct.variants.nodes.map(
    (shopifyProductVariant) => {
      return <ProductVariant>{
        id: shopifyProductVariant.id,
        price: {
          amount: parseFloat(shopifyProductVariant.price.amount),
          currencyCode: shopifyProductVariant.price.currencyCode,
        },
      };
    }
  );

  return <Product>{
    variants,
  };
};

type ShopifyProductList = ProductsQuery['products'];
type ShopifyProductListItem = ElementType<ShopifyProductList['nodes']>;

export const mapShopifyProductToPrepProductListItem = (
  shopifyProduct: ShopifyProductListItem
): ProductListItem => {
  const variant = shopifyProduct.variants.nodes[0];

  const variantSlugSeoTagOverride = variant.variantSlugSeoTagOverride?.value;
  const variantSlugSeoTags = variantSlugSeoTagOverride
    ? variantSlugSeoTagOverride
    : slugify(shopifyProduct.title.toLowerCase());
  const preppProductId = variant.id.replace(
    'gid://shopify/ProductVariant/',
    ''
  );
  const productPageUrl = `/shop/products/${variantSlugSeoTags}-${preppProductId}`;

  return {
    productId: variant.id,
    title: shopifyProduct.title,
    summary: shopifyProduct.summary?.value || '',
    productPageUrl: productPageUrl,
    discounted:
      (shopifyProduct.discounted?.value || 'false').toLowerCase() === 'true',
    imageUrl: variant.image?.url || '',
    imageAlt: variant.image?.altText || undefined,
    price: {
      amount: variant.price.amount,
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

  // TODO: Restrict image sizes in GQL definition

  return {
    id: shopifyVariant.id,
    title: shopifyVariant.product.title,
    summary: shopifyVariant.product.summary?.value || '',
    textDescription: shopifyVariant.product.description,
    htmlDescription: shopifyVariant.product.descriptionHtml,
    images: shopifyVariant.product.images.nodes.map(
      (shopifyImage) =>
        <Image>{ src: shopifyImage.url, alt: shopifyImage.altText }
    ),
    price: shopifyVariant.price,
  };
};
