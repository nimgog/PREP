import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { interval, map, share, switchMap } from 'rxjs';
import type { Product } from '../models/product.model';
import { LocationService } from './location.service';
import { ProductGQL } from '../graphql/types';
import { NotificationService } from './notification.service';
import { catchAndReportError } from '../common/utils/catch-and-report-error.operator';
import { mapShopifyProductToPrepProduct } from '../common/utils/shopify-product-helpers';

@Injectable({
  providedIn: 'root',
})
export class ShopifyProductService {
  private static readonly ProductPriceRefreshIntervalInMins = 10;

  private _productPriceRefreshSignal$ = interval(
    ShopifyProductService.ProductPriceRefreshIntervalInMins * 60 * 1000
  ).pipe(
    share(),
    map(() => undefined)
  );

  private readonly locationService = inject(LocationService);
  private readonly notificationService = inject(NotificationService);
  private readonly productGQL = inject(ProductGQL);

  get productPriceRefreshSignal$() {
    return this._productPriceRefreshSignal$;
  }

  fetchProduct(productHandle: string): Observable<Product> {
    return this.locationService.getTwoLetterCountryCode().pipe(
      switchMap((countryCode) =>
        this.productGQL.fetch({
          productHandle,
          countryCode,
        })
      ),
      map((response) => {
        if (
          !response.data?.product ||
          response.error ||
          response.errors?.length
        ) {
          throw new Error(
            `Shopify request failed: ${JSON.stringify(response)}`
          );
        }

        return response.data.product;
      }),
      map((shopifyProduct) => mapShopifyProductToPrepProduct(shopifyProduct)),
      catchAndReportError(this.notificationService)
    );
  }
}
