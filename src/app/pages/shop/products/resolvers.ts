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

export const metaResolver: ResolveFn<MetaTag[]> = async (route, state) => {
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

  // TODO: Use product meta type
  return createCommonMetaResolver(product.title, product.summary)(route, state);
};
