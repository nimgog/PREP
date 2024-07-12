import { RouteMeta } from '@analogjs/router';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getFullPageTitle } from '../../utils/page-helpers';
import { createCommonMetaResolver } from '../../utils/open-graph-helpers';
import ShopProductCard from './product-card.component';
import { AsyncPipe } from '@angular/common';
import { ShopifyProductService } from '../../services/shopify-product.service';

export const sharedRouteMeta: RouteMeta = {
  title: getFullPageTitle('Shop'),
  meta: createCommonMetaResolver(
    'Shop',
    'Explore our exclusive range of preparedness gear to face any challenge with confidence.'
  ),
};

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, ShopProductCard, AsyncPipe],
  template: `
    <div
      class="relative w-full h-full pt-[100px] pb-5 px-4 flex justify-center bg-white"
    >
      <div
        class="container relative z-0 flex items-center justify-between bg-opacity-75 bg-green-800 p-10 rounded-2xl portrait:flex-col"
      >
        <div class="flex-1">
          <div class="w-full h-full flex items-center justify-center">
            <img
              loading="eager"
              src="/img/product-page/PREPC-display-no-background.png"
              alt="emergency survival kit"
            />
          </div>
        </div>
        <div
          class="flex-1 text-left text-white portrait:text-center portrait:mt-3 flex flex-col items-baseline portrait:items-center"
        >
          <h1 class="text-4xl font-bold mb-4">Preparedness Starts Here</h1>
          <p class="text-xl">
            Explore our exclusive range of preparedness gear to face any
            challenge with confidence.
          </p>
          <div class="flex justify-center my-10">
            <a
              routerLink="/survival-kit"
              role="button"
              aria-label="Get your emergency kit"
              class="px-4 py-2 border-2 border-black rounded-[10px] bg-[#f5f5f5] text-black"
            >
              Get your emergency kit
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-full pt-[100px] pb-5 px-4 flex justify-center">
      <div class="container">
        <div class="flex flex-wrap justify-center gap-x-14 gap-y-20 p-10">
          @for (product of products$ | async; track product.productId) {
          <app-shop-product-card [product]="product"></app-shop-product-card>
          }
        </div>
      </div>
    </div>
  `,
})
export default class ProductListComponent {
  private readonly shopifyProductService = inject(ShopifyProductService);

  products$ = this.shopifyProductService.fetchProducts();
}
