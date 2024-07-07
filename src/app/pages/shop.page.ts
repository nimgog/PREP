import { RouteMeta } from '@analogjs/router';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getFullPageTitle } from '../utils/page-helpers';
import { createCommonMetaResolver } from '../utils/open-graph-helpers';
import ShopProductCard from '../components/shop/product-card.component';
import { AsyncPipe } from '@angular/common';
import { ShopifyProductService } from '../services/shopify-product.service';

export const routeMeta: RouteMeta = {
  title: getFullPageTitle('Shop'),
  meta: createCommonMetaResolver(
    'Shop',
    'Browse our extensive collection of prepping products.'
  ),
};

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [RouterLink, ShopProductCard, AsyncPipe],
  template: `
    <div class="w-full h-full pt-[100px] pb-5 px-4">
      <h1 class="mb-10 text-[2rem]">Shop</h1>

      <div class="flex flex-wrap justify-center gap-x-14 gap-y-20 p-10">
        @for (product of products$ | async; track product.productId) {
        <app-shop-product-card [product]="product"></app-shop-product-card>
        }
      </div>
    </div>
  `,
})
export default class ShopPageComponent {
  private readonly shopifyProductService = inject(ShopifyProductService);

  products$ = this.shopifyProductService.fetchProducts();
}
