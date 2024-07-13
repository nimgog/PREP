import { RouteMeta } from '@analogjs/router';
import { AsyncPipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, of, switchMap, take, tap } from 'rxjs';
import { ContextService } from 'src/app/services/context.service';
import { ShopifyProductService } from 'src/app/services/shopify-product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { parseProductIdFromUrl } from 'src/app/utils/prepp-product-helpers';
import { metaResolver, titleResolver } from './resolvers';
import ProductDescription from '../../../components/shop/product-description.component';
import ProductStructuredDataComponent from '../../../components/shop/product-structured-data.component';

export const routeMeta: RouteMeta = {
  providers: [ShopifyProductService],
  title: titleResolver,
  meta: metaResolver,
};

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    AsyncPipe,
    DecimalPipe,
    FormsModule,
    ProductDescription,
    NgOptimizedImage,
    ProductStructuredDataComponent,
  ],
  template: `
    <div class="flex flex-col items-center w-full h-full pt-[100px] pb-5 px-4">
      <div class="container text-center">
        @if (product$ | async; as product) {
        <h1 class="mb-10 text-[2rem]">{{ product.title }}</h1>
        <h2>{{ product.summary }}</h2>

        <div
          class="flex flex-col items-center justify-between lg:flex-row lg:items-start"
        >
          <div>
            @for (image of product.images; track image.src; let i = $index) {
            <div class="flex justify-center items-center w-[400px] h-[400px]">
              <img
                class="w-full max-w-[400px] h-auto max-h-[400px] object-contain object-center"
                [src]="image.src"
                [alt]="image.alt || product.title + ' #' + (i + 1)"
                loading="eager"
              />
            </div>
            }
          </div>

          <div class="max-w-[400px] text-left">
            <div class="flex justify-center items-center">
              <div class="product-pricing">
                <div class="flex flex-col justify-center mr-3">
                  <span class="sale-price"
                    >{{ product.price.amount | number : '1.0-0' }}{{ ' '
                    }}{{ product.price.currencyCode }}</span
                  >
                </div>
              </div>

              <div class="klarna-info flex items-center">
                <h2 class="mr-2 whitespace-nowrap">Pay with:</h2>
                <img
                  class="w-[160px]"
                  ngSrc="img/product-page/Marketing_Badge_With_Clear_Space.png"
                  alt="Pay with Klarna"
                  width="160"
                  height="74"
                />
              </div>
            </div>

            <div class="quantity-add-to-cart">
              <div class="quantity-selector">
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  [(ngModel)]="quantity"
                  min="1"
                  class="quantity-input"
                />
                <div class="quantity-arrows">
                  <button
                    type="button"
                    class="quantity-arrow-up"
                    (click)="increaseQuantity()"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    class="quantity-arrow-down"
                    (click)="decreaseQuantity()"
                  >
                    ▼
                  </button>
                </div>
              </div>

              @if (!isLoading()) {
              <button class="add-to-cart-btn" (click)="addToCart()">
                <i class="cart-icon">🛒</i>
                <p>Add to Cart</p>
              </button>
              } @else {
              <div role="status" class="ml-5">
                <svg
                  aria-hidden="true"
                  class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              }
            </div>

            <app-product-description
              [htmlDescription]="product.htmlDescription"
            >
            </app-product-description>
          </div>
        </div>

        <app-product-structured-data [product]="product">
        </app-product-structured-data>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .product-pricing {
        display: flex;
        align-items: center;
        font-size: 22px;
        margin: 10px 0;
      }

      .sale-price {
        // color: #e44d26;
        font-weight: bold;
        margin-right: 10px;
      }

      .klarna-info {
        max-width: 200px;
        margin-bottom: 14px;
      }

      .quantity-add-to-cart {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
      }

      .quantity-selector {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .quantity-selector {
        display: flex;
        align-items: stretch; /* Ensures the children stretch to fill the container */
        border: 1px solid #ddd;
        margin-right: 10px;
        height: 44px;
      }

      .quantity-input {
        width: 50px;
        text-align: center;
        border: none;
        padding: 10px; /* Adjust padding to match the height of the add-to-cart button */
        margin: 0;
        -webkit-appearance: none;
        -moz-appearance: textfield;
      }

      .quantity-input::-webkit-inner-spin-button,
      .quantity-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .quantity-input[type='number'] {
        -moz-appearance: textfield; /* Firefox */
      }

      .quantity-arrow-up,
      .quantity-arrow-down {
        background-color: transparent;
        border: none;
        padding: 0 5px;
        cursor: pointer;
        height: 18px;
      }

      .add-to-cart-btn {
        width: 100%;
        display: flex;
        justify-content: center;
        background-color: #00bc5e !important;
        color: white;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
      }

      .add-to-cart-btn {
        background-color: rgb(52 78 65);
        color: white;
        border: none;
        padding: 10px 20px; /* Adjusted padding to vertically center the text */
        text-align: center;
        text-decoration: none;
        display: inline-flex; /* changed from inline-block for better centering */
        align-items: center; /* Vertically centers the icon and text */
        font-size: 16px;
        cursor: pointer;
        white-space: nowrap; /* Prevents wrapping on small screens */
      }

      .cart-icon {
        margin-right: 5px;
        display: inline-block; /* Helps with vertical alignment */
      }
    `,
  ],
})
export default class ProductPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly shopifyProductService = inject(ShopifyProductService);
  private readonly shoppingCartService = inject(ShoppingCartService);

  readonly contextService = inject(ContextService);

  readonly productSlug$ = this.route.paramMap.pipe(
    map(() => parseProductIdFromUrl(this.router.url))
  );

  readonly product$ = combineLatest([
    this.productSlug$,
    this.shopifyProductService.productPriceRefreshSignal$,
  ]).pipe(
    switchMap(([productId]) => {
      if (!productId) {
        this.router.navigate(['/not-found'], { replaceUrl: true });
        return of(null);
      }

      return this.shopifyProductService.fetchProductV2(productId);
    }),
    tap((product) => {
      if (!product) {
        this.router.navigate(['/not-found'], { replaceUrl: true });
        return of(null);
      }

      this.productId.set(product.id);

      return product;
    })
  );

  quantity = signal(1);
  isLoading = signal(false);
  productId = signal('');

  addToCart(): void {
    const quantity = this.quantity() > 0 ? this.quantity() : 1;
    this.isLoading.set(true);
    this.shoppingCartService
      .addLineItem(this.productId(), quantity)
      .pipe(take(1))
      .subscribe({
        complete: () => {
          this.shoppingCartService.openCart();
          this.isLoading.set(false);
          this.quantity.set(1);
        },
      });
  }

  increaseQuantity(): void {
    this.quantity.update((prevQuantity) => prevQuantity + 1);
  }

  decreaseQuantity(): void {
    this.quantity.update((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  }
}
