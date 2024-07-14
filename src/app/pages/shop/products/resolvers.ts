import { MetaTag } from '@analogjs/router';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ShopifyProductService } from 'src/app/services/shopify-product.service';
import { createCommonMetaResolver } from 'src/app/utils/open-graph-helpers';
import { getFullPageTitle } from 'src/app/utils/page-helpers';
import { parseProductIdFromUrl } from 'src/app/utils/prepp-product-helpers';

export const titleResolver: ResolveFn<string> = async (_route, state) => {
  const productId = parseProductIdFromUrl(state.url);

  if (!productId) {
    return '';
  }

  const shopifyProductsService = inject(ShopifyProductService);
  const product = await firstValueFrom(
    shopifyProductsService.fetchProductV2(productId)
  );

  if (!product) {
    return '';
  }

  return getFullPageTitle(product.title);
};

export const createProductMetaResolver =
  (
    titleOverride?: string,
    descriptionOverride?: string
  ): ResolveFn<MetaTag[]> =>
  async (route, state) => {
    const productId = parseProductIdFromUrl(state.url);

    if (!productId) {
      return [];
    }

    const shopifyProductsService = inject(ShopifyProductService);
    const product = await firstValueFrom(
      shopifyProductsService.fetchProductV2(productId)
    );

    if (!product) {
      return [];
    }

    let metaTags: MetaTag[] = [
      ...createCommonMetaResolver(
        titleOverride || product.title,
        descriptionOverride || product.summary,
        product.images[0].src,
        'product'
      )(route, state),
      {
        property: 'product:brand',
        content: 'Prepp me',
      },
      // TODO: Fill this later
      // {
      //   property: 'product:category',
      //   content: '',
      // },
      {
        property: 'product:price:amount',
        content: product.price.amount.toFixed(2),
      },
      {
        property: 'product:price:currency',
        content: product.price.currencyCode,
      },
      {
        property: 'product:condition',
        content: 'New',
      },
      {
        property: 'product:availability',
        content: 'In stock',
      },
    ];

    return metaTags;
  };

export const metaResolver = createProductMetaResolver();
