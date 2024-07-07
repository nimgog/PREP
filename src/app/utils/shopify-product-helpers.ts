import type { ProductQuery, ProductsQuery } from 'src/app/graphql/types';
import type {
  Product,
  ProductListItem,
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

  return {
    productId: variant.id,
    title: shopifyProduct.title,
    summary: shopifyProduct.summary?.value || '',
    productPageUrl: shopifyProduct.productPageUrl?.value,
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
