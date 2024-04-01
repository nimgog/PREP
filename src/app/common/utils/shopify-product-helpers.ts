import type { ProductQuery } from 'src/app/graphql/types';
import type {
  Money,
  Product,
  ProductVariant,
} from 'src/app/models/product.model';

type ShopifyCollection = NonNullable<ProductQuery['collection']>;
type ShopifyProductConnection = NonNullable<ShopifyCollection['products']>;
type ShopifyProductNodes = NonNullable<ShopifyProductConnection['nodes']>;
type ShopifyProduct = ShopifyProductNodes[number];

export const mapShopifyProductsToCocoProduct = (
  shopifyProducts: ShopifyProduct[],
  productSlug: string,
  productDescription: string
) => {
  const variants = shopifyProducts.flatMap((shopifyProduct) => {
    const validShopifyProductVariants = shopifyProduct.variants.nodes.filter(
      (shopifyProductVariant) => {
        const selectedModels = shopifyProductVariant.selectedOptions
          .filter((option) => option.name.toLocaleLowerCase().includes('model'))
          .map((option) => option.value);

        return selectedModels.every((model) => model === selectedModels[0]);
      }
    );

    const productVariants = validShopifyProductVariants.map(
      (shopifyProductVariant) => {
        const productVariant: ProductVariant = {
          id: shopifyProductVariant.id,
          images: shopifyProduct.images.nodes.map((shopifyImage) => ({
            src: shopifyImage.url,
            alt: shopifyImage.altText || undefined,
          })),
          price: {
            amount: parseFloat(shopifyProductVariant.price.amount),
            currencyCode: shopifyProductVariant.price.currencyCode,
          },
        };

        return productVariant;
      }
    );

    return productVariants;
  });

  return <Product>{
    slug: productSlug,
    description: productDescription,
    variants,
  };
};
