import type { ProductQuery } from 'src/app/graphql/types';
import type { Product, ProductVariant } from 'src/app/models/product.model';

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
