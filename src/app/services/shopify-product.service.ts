import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import {
  catchError,
  concatMap,
  EMPTY,
  interval,
  map,
  of,
  share,
  switchMap,
  take,
  tap,
} from 'rxjs';
import type {
  Money,
  ProductId,
  ProductListItem,
  ProductV2,
} from '../models/product.model';
import { LocationService } from './location.service';
import {
  ProductsGQL,
  ProductV2GQL,
  ShippingFeeProductGQL,
} from '../graphql/types';
import { NotificationService } from './notification.service';
import { catchAndReportError } from '../utils/catch-and-report-error.operator';
import {
  mapShopifyProductToPrepProductListItem,
  mapShopifyVariantToPrepProduct,
} from '../utils/shopify-product-helpers';
import { LocalStorageService } from './local-storage.service';
import { ContextService } from './context.service';

@Injectable({
  providedIn: 'root',
})
export class ShopifyProductService {
  private static readonly ProductPriceRefreshIntervalInMins = 10;

  private readonly locationService = inject(LocationService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly notificationService = inject(NotificationService);
  private readonly contextService = inject(ContextService);

  private readonly productsGQL = inject(ProductsGQL);
  private readonly productV2GQL = inject(ProductV2GQL);
  private readonly shippingFeeProductGQL = inject(ShippingFeeProductGQL);

  private _productPriceRefreshSignal$ = this.contextService.isClientSide
    ? interval(
        ShopifyProductService.ProductPriceRefreshIntervalInMins * 60 * 1000
      ).pipe(
        share(),
        map(() => undefined)
      )
    : EMPTY;

  get productPriceRefreshSignal$() {
    return this._productPriceRefreshSignal$;
  }

  fetchProducts(): Observable<ProductListItem[]> {
    return this.locationService.getTwoLetterCountryCode().pipe(
      switchMap((countryCode) =>
        this.productsGQL.fetch({
          countryCode,
        })
      ),
      map((response) => {
        if (
          !response.data?.products ||
          response.error ||
          response.errors?.length
        ) {
          throw new Error(
            `Shopify request failed: ${JSON.stringify(response)}`
          );
        }

        return response.data.products;
      }),
      map((shopifyProducts) =>
        shopifyProducts.nodes.map(mapShopifyProductToPrepProductListItem)
      ),
      catchAndReportError(this.notificationService)
    );
  }

  fetchProductV2(productId: ProductId): Observable<ProductV2 | null> {
    return this.locationService.getTwoLetterCountryCode().pipe(
      switchMap((countryCode) =>
        this.productV2GQL.fetch({
          variantId: productId.shopifyId,
          countryCode,
        })
      ),
      map((response) => {
        if (!response.data?.node || response.error || response.errors?.length) {
          throw new Error(
            `Shopify request failed: ${JSON.stringify(response)}`
          );
        }

        return response.data.node;
      }),
      map((shopifyVariant) => {
        if (shopifyVariant.__typename !== 'ProductVariant') {
          throw new Error('Shopify request failed: Invalid product variant');
        }

        return mapShopifyVariantToPrepProduct(shopifyVariant);
      }),
      catchAndReportError(this.notificationService)
    );
  }

  fetchShippingFee(): Observable<Money | null> {
    const localStorageKey = 'free_shipping_threshold';

    const shippingFee = this.localStorageService.get<Money>(localStorageKey);

    if (shippingFee) {
      return of(shippingFee);
    }

    return this.locationService.getTwoLetterCountryCode().pipe(
      switchMap((countryCode) =>
        this.shippingFeeProductGQL.fetch({ countryCode }).pipe(
          concatMap((response) => {
            if (response.error || response.errors) {
              return of(null).pipe(take(1));
            }

            if (!response.data.product) {
              return of(null).pipe(take(1));
            }

            return of(response.data.product);
          }),
          map((shopifyProduct) => {
            if (!shopifyProduct) {
              throw new Error(
                'Product at this stage should never be null or undefined'
              );
            }

            const price = shopifyProduct.priceRange.minVariantPrice;

            return <Money>{
              amount: parseFloat(price.amount),
              currencyCode: price.currencyCode,
            };
          }),
          tap((threshold) =>
            this.localStorageService.set(localStorageKey, threshold)
          ),
          catchError(() => of(null))
        )
      ),
      catchAndReportError(this.notificationService)
    );
  }
}
