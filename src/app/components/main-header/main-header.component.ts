import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit, inject, input } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ContextService } from 'src/app/services/context.service';
import LogoComponent from '../common/logo.component';
import { environment } from 'src/environments/environment';
import CartComponent from '../cart/cart.component';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [RouterLink, NgClass, LogoComponent, CartComponent],
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
            <img
              src="/img/main-header/side-menu.svg"
              alt="Side menu"
              width="24"
              height="24"
            />
          </button>
        </div>
        <div
          [class.hidden]="!menuOpen"
          class="landscape:hidden absolute top-0 left-0 h-svh w-svw z-50 bg-green-900"
        >
          <div class="flex flex-col w-full h-full p-2">
            <div class="flex flex-row w-full justify-between">
              <div class="w-[10px]"></div>
              <app-logo />
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
                  <a routerLink="/shop">Shop</a>
                </li>
                <li (click)="closeMenu()" class="mt-5">
                  <a [routerLink]="survivalKitPageLink"
                    >PREPC | Your Survival Kit</a
                  >
                </li>
                <li (click)="closeMenu()" class="mt-5">
                  <a routerLink="/blog">Becoming Prepared</a>
                </li>
                <li (click)="closeMenu()" class="mt-5">
                  <a routerLink="/about-us">About Us</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        @if (cartLoaded) {
        <div
          [ngClass]="
            cartOpen
              ? 'cart-overlay absolute top-0 left-0 w-full h-full z-60 bg-black bg-opacity-75'
              : 'hidden'
          "
        >
          <app-cart
            class="w-full h-full flex justify-center items-center"
            (onClose)="continueShopping()"
          ></app-cart>
        </div>
        }

        <app-logo />

        <nav class="hidden lg:block">
          <ul
            class="flex justify-center gap-x-16 text-prep-beige text-base font-medium uppercase"
          >
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/shop">Shop</a></li>
            <li>
              <a [routerLink]="survivalKitPageLink"
                >PREPC | Your Survival Kit</a
              >
            </li>
            <li>
              <a routerLink="/blog">Becoming Prepared</a>
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
            (click)="openCart()"
          >
            <img
              src="/img/main-header/shopping-cart.svg"
              alt="Shopping cart"
              width="26"
              height="26"
            />
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [
    `
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
    `,
  ],
})
export default class MainHeaderComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);

  readonly survivalKitPageLink = environment.survivalKitPageLink;

  isTransparent = input.required<boolean>();

  menuOpen = false;
  cartOpen = false;
  cartLoaded = false;

  private subscriptions: Subscription[] = [];

  private readonly shoppingCartService = inject(ShoppingCartService);
  readonly contextService = inject(ContextService);

  ngOnInit(): void {
    if (this.contextService.isClientSide) {
      const sub = this.shoppingCartService.isCartVisible$.subscribe(
        (isCartVisible) => {
          this.cartLoaded = true;
          this.cartOpen = isCartVisible;
        }
      );
      const routerSubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          const body = document.getElementsByTagName('body')[0];
          body.classList.remove('overflow-hidden');
        }
      });

      this.subscriptions.push(routerSubscription);
      this.subscriptions.push(sub);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.setOverflowHidden();
  }

  private setOverflowHidden(): void {
    const body = document.getElementsByTagName('body')[0];

    if (body.classList.contains('overflow-hidden')) {
      body.classList.remove('overflow-hidden');
    } else {
      body.classList.add('overflow-hidden');
    }
  }

  openCart(): void {
    this.cartLoaded = true;
    this.shoppingCartService.openCart();
  }

  closeCart(): void {
    this.shoppingCartService.closeCart();
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  continueShopping(): void {
    this.closeCart();
  }
}
