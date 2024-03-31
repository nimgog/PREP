import { CommonModule, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { CartItem, CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-header', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [CommonModule, RouterLink, NgClass, MatIcon, MatToolbar],
  providers: [CartService],
  template: `
    <header
      class="flex justify-center items-center w-full h-[70px] lg:h-[80px] px-4"
      [ngClass]="isTransparent() ? 'bg-transparent' : 'bg-prep-green'"
    >
      <div
        class="flex justify-between items-center w-full max-w-centered-content h-full"
      >
        <div class="flex justify-center items-center w-8 lg:hidden">
          <button
            class="w-6 h-6"
            aria-label="Open side menu"
            (click)="toggleMenu()"
          >
            <img src="/img/main-header/side-menu.svg" alt="Side menu" />
          </button>
        </div>
        <div
          [class.hidden]="!menuOpen"
          class="landscape:hidden absolute top-0 left-0 h-svh w-svw z-50 bg-green-900"
        >
          <div class="flex flex-col w-full h-full p-2">
            <div class="flex flex-row w-full justify-between">
              <div class="w-[10px]"></div>
              <a routerLink="/">
                <!-- <div
            class="w-[133px] lg:w-[112px] h-10 lg:h-[52px] bg-prep-beige"
            [ngClass]="isTransparent() ? 'lg:bg-prep-green' : 'lg:bg-[#A3B18A]'"
          ></div> -->
                <img
                  class="w-[100px]"
                  src="/img/main-header/PREP_logo.png"
                  alt=""
                />
              </a>
              <div class="w-[20px]" (click)="toggleMenu()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                  />
                </svg>
              </div>
            </div>
            <nav class="lg:block">
              <ul
                class="flex flex-col justify-center gap-x-16 text-prep-beige text-base font-medium uppercase"
              >
                <li (click)="closeMenu()" class="mt-5">
                  <a routerLink="/">Home</a>
                </li>
                <li (click)="closeMenu()" class="mt-5">
                  <a routerLink="/survival-kit">Survival Kit</a>
                </li>
                <li (click)="closeMenu()" class="mt-5">
                  <a routerLink="/about-us">About Us</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!-- Cart Overlay -->
        <div
          *ngIf="cartOpen"
          class="cart-overlay absolute top-0 left-0 w-full h-full z-60 bg-black bg-opacity-75 flex justify-center items-center"
        >
          <div
            class="cart-content bg-white w-11/12 md:w-3/4 lg:w-1/2 h-3/4 overflow-auto"
          >
            <div class="flex justify-between items-center p-4">
              <h2 class="text-lg font-bold">Your Cart</h2>
              <button aria-label="Close cart" (click)="toggleCart()">
                <!-- SVG or text to close the cart -->
                Close
              </button>
            </div>
            <!-- Cart Items Placeholder - Dynamically generated based on actual cart items -->
            <div
              *ngFor="let item of cartItems"
              class="cart-item flex items-center p-4 bg-white shadow-md mb-4"
            >
              <!-- Product Image with Fallback -->
              <div
                class="image-container w-24 h-24 bg-gray-200 flex justify-center items-center"
              >
                <img
                  [src]="item.image"
                  alt="{{ item.title }}"
                  class="object-cover w-full h-full"
                  (error)="imageError($event)"
                />
              </div>

              <!-- Product Details -->
              <div class="flex-1 ml-4">
                <div class="font-semibold text-lg">{{ item.title }}</div>
                <div class="text-sm text-gray-500">{{ item.variation }}</div>

                <!-- Stepper for Quantity and Pricing -->
                <div class="flex items-center justify-between mt-2">
                  <div class="stepper flex items-center">
                    <button
                      (click)="decrement(item)"
                      class="text-gray-500 bg-gray-200 h-8 w-8 flex items-center justify-center"
                    >
                      &#8722;
                    </button>
                    <div class="px-3">{{ item.quantity }}</div>
                    <button
                      (click)="increment(item)"
                      class="text-gray-500 bg-gray-200 h-8 w-8 flex items-center justify-center"
                    >
                      &#43;
                    </button>
                  </div>
                  <!-- Pricing -->
                  <div class="text-right">
                    <div class="font-semibold text-lg">{{ item.price }}</div>
                    <div
                      *ngIf="item.compareAtPrice"
                      class="text-sm line-through text-red-500"
                    >
                      {{ item.compareAtPrice }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Remove Button -->
              <button (click)="removeItem(item)" class="ml-4">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
              </button>
            </div>
            <!-- Summary -->
            <div class="summary">
              <div>Total Items: {{ numberOfItems }}</div>
              <div>Total Price: {{ accumulatedPrice }}</div>
            </div>

            <!-- Actions -->
            <div class="actions">
              <button (click)="checkout()">Checkout</button>
              <button (click)="continueShopping()">Continue Shopping</button>
            </div>
          </div>
        </div>

        <!-- TODO: Revisit logo -->
        <a routerLink="/">
          <!-- <div
            class="w-[133px] lg:w-[112px] h-10 lg:h-[52px] bg-prep-beige"
            [ngClass]="isTransparent() ? 'lg:bg-prep-green' : 'lg:bg-[#A3B18A]'"
          ></div> -->
          <img class="w-[100px]" src="/img/main-header/PREP_logo.png" alt="" />
        </a>

        <nav class="hidden lg:block">
          <ul
            class="flex justify-center gap-x-16 text-prep-beige text-base font-medium uppercase"
          >
            <li><a routerLink="/">Home</a></li>
            <li>
              <a routerLink="/survival-kit">Survival Kit</a>
            </li>
            <li>
              <a routerLink="/about-us">About Us</a>
            </li>
          </ul>
        </nav>

        <div class="lg:flex justify-end items-center lg:w-[112px]">
          <button
            class="w-8 h-8 p-[3px]"
            aria-label="Open shopping cart"
            (click)="toggleCart()"
          >
            <img src="/img/main-header/shopping-cart.svg" alt="Shopping cart" />
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
      @tailwind utilities;
      .cart-overlay {
        position: fixed; /* Use fixed to ensure it covers the entire viewport */
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.75); /* Semi-transparent background */
      }

      .cart-content {
        background-color: #fff;
        overflow-y: auto; /* Allows scrolling if the content exceeds the height */
      }

      .cart-item + .cart-item {
        border-top: 1px solid #eee; /* Separates items visually */
      }

      .cart-item {
        display: flex;
        align-items: center;
        padding: 16px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 16px;
        border-radius: 8px;
      }

      .cart-item img {
        width: 96px;
        height: 96px;
        object-fit: cover;
        border-radius: 4px;
      }

      .cart-item .stepper {
        display: flex;
        align-items: center;
        border: 1px solid #e2e8f0;
        border-radius: 9999px;
      }

      .cart-item .stepper button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background-color: #f7fafc;
        color: #4a5568;
      }

      .cart-item .stepper div {
        padding: 0 12px;
      }

      .cart-item .text-right {
        text-align: right;
      }

      .cart-item .text-lg {
        font-size: 1.125rem; /* 18px */
        font-weight: 600;
      }

      .cart-item .text-sm {
        font-size: 0.875rem; /* 14px */
      }

      .cart-item .font-semibold {
        font-weight: 600;
      }

      .cart-item .line-through {
        text-decoration: line-through;
      }

      .cart-item .text-gray-500 {
        color: #6b7280;
      }

      .cart-item .text-red-500 {
        color: #ef4444;
      }

      .cart-item .bg-gray-200 {
        background-color: #e2e8f0;
      }

      .cart-item button {
        background: none;
        border: none;
        cursor: pointer;
      }

      .cart-item button:focus {
        outline: none;
      }

      .image-container {
        width: 96px; /* Width of the image */
        height: 96px; /* Height of the image */
        background-color: #e2e8f0; /* Fallback color */
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        overflow: hidden; /* Ensures the content does not spill out */
      }

      /* Additional styles for summary and actions */
      .summary {
        padding: 16px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 16px;
        border-radius: 8px;
      }

      .actions {
        display: flex;
        justify-content: space-between;
        margin-bottom: 32px;
      }

      .actions button {
        padding: 12px 24px;
        border-radius: 9999px;
        font-weight: 600;
        cursor: pointer;
        border: none;
      }

      /* Add styles for your checkout and continue shopping buttons */
      .actions button.checkout {
        background-color: #10b981; /* Green color */
        color: #fff;
      }

      .actions button.continue-shopping {
        background-color: #e2e8f0; /* Light gray color */
        color: #4a5568;
      }
    `,
  ],
})
export default class MainHeaderComponent {
  isTransparent = input.required<boolean>();
  // State for menu and cart overlay visibility
  menuOpen: boolean = false;
  cartOpen: boolean = false;

  cartItems: CartItem[] = [];
  private cartSubscription: Subscription;

  constructor(private cartService: CartService) {
    this.cartSubscription = this.cartService.cartItems$.subscribe(
      items => this.cartItems = items
    );
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // Computed properties for number of items and accumulated price
  get numberOfItems() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  get accumulatedPrice() {
    return (
      this.cartItems
        .reduce((total, item) => total + parseFloat(item.price), 0)
        .toFixed(2) + ' RON'
    );
  }

  imageError(event: any) {
    event.target.style.display = 'none'; // Hide the broken image icon
  }

  // Component methods
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  toggleCart(): void {
    this.cartOpen = !this.cartOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  increment(item: any): void {
    item.quantity++;
  }

  decrement(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(itemToRemove: any): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.id !== itemToRemove.id
    );
  }

  checkout(): void {
    // Implementation for checkout
  }

  continueShopping(): void {
    this.toggleCart();
  }
}
