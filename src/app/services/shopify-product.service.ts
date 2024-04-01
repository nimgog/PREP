import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { interval, map, share, switchMap } from 'rxjs';
import type { Product } from '../models/product.model';
import { LocationService } from './location.service';
import { ProductGQL } from '../graphql/types';
import { NotificationService } from './notification.service';
import { catchAndReportError } from '../common/utils/catch-and-report-error.operator';
import { mapShopifyProductsToCocoProduct } from '../common/utils/shopify-product-helpers';

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

  fetchProduct(productSlug: string): Observable<Product> {
    const collectionHandle = `new-${productSlug}`;

    return this.locationService.getTwoLetterCountryCode().pipe(
      switchMap((countryCode) =>
        this.productGQL.fetch({
          collectionHandle,
          countryCode,
        })
      ),
      map((response) => {
        if (
          !response.data?.collection?.products.nodes.length ||
          response.error ||
          response.errors?.length
        ) {
          throw new Error(
            `Shopify request failed: ${JSON.stringify(response)}`
          );
        }

        return response.data.collection;
      }),
      map((shopifyCollection) =>
        mapShopifyProductsToCocoProduct(
          shopifyCollection.products.nodes,
          productSlug,
          shopifyCollection.descriptionHtml
        )
      ),
      catchAndReportError(this.notificationService)
    );
  }
}
