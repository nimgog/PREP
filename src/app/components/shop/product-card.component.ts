import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { ProductListItem } from 'src/app/models/product.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-shop-product-card',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  template: `
    <div class="flex flex-col w-[220px] h-[380px] rounded-lg">
      <a
        [routerLink]="product().productPageUrl"
        class="grow relative flex justify-center items-center w-[220px] h-[220px] rounded-lg"
      >
        <img
          class="w-full max-w-[220px] h-auto max-h-[220px] rounded-lg object-contain object-center"
          [src]="product().imageUrl"
          [alt]="product().imageAlt || product().title"
          loading="eager"
        />

        @if (product().discounted) {
        <div
          class="absolute top-4 -right-4 px-2 py-0.5 rounded-lg bg-[#13b981] text-white font-light uppercase drop-shadow-sm"
        >
          DISCOUNT
        </div>
        }
      </a>

      <div>
        <a
          [routerLink]="product().productPageUrl"
          class="flex flex-col mt-2.5 mb-6 gap-y-1"
        >
          <h2 class="text-sm font-semibold line-clamp-2 min-lines-2">
            {{ product().title }}
          </h2>

          <p
            class="text-sm text-gray-500 text-ellipsis line-clamp-3 min-lines-3"
          >
            {{ product().summary }}
          </p>
        </a>

        <div class="flex justify-between items-center">
          <span class="font-semibold text-lg">
            {{ product().price.amount | number : '1.0-0' }}
            {{ ' ' }}
            {{ product().price.currencyCode }}
          </span>

          <button
            class="p-2 text-sm font-medium bg-gray-300 hover:bg-gray-200 rounded-lg"
            (click)="addToCart()"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .min-lines-2 {
        height: calc(2 * 1.25rem);
      }

      .min-lines-3 {
        height: calc(3 * 1.25rem);
      }
    `,
  ],
})
export default class ShopProductCard {
  readonly product = input.required<ProductListItem>();

  readonly shoppingCartService = inject(ShoppingCartService);

  addToCart(): void {
    this.shoppingCartService
      .addLineItem(this.product().productId, 1)
      .pipe(take(1))
      .subscribe({
        complete: () => this.shoppingCartService.openCart(),
      });
  }
}
