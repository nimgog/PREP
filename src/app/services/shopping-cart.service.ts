import type { OnDestroy, OnInit } from '@angular/core';
import { Injectable, inject } from '@angular/core';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, of, switchMap, tap } from 'rxjs';
import { ShopifyCartService } from './shopify-cart.service';
import { ShopifyProductService } from './shopify-product.service';
import { LocalStorageService } from './local-storage.service';
import type { ShoppingCart } from '../models/shopping-cart.model';
import { NotificationService } from './notification.service';
import { ContextService } from './context.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService implements OnInit, OnDestroy {
  private cartSubject = new BehaviorSubject<ShoppingCart | null>(null);
  private productPriceRefreshSignalSub?: Subscription;

  private readonly shopifyCartService = inject(ShopifyCartService);
  private readonly shopifyProductService = inject(ShopifyProductService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly notificationService = inject(NotificationService);
  private readonly contextService = inject(ContextService);

  ngOnInit(): void {
    if (this.contextService.isClientSide) {
      this.productPriceRefreshSignalSub =
        this.shopifyProductService.productPriceRefreshSignal$.subscribe(() =>
          this.cartSubject.next(null)
        );
    }
  }

  ngOnDestroy(): void {
    this.productPriceRefreshSignalSub?.unsubscribe();
  }

  get cart$() {
    return this.cartSubject.asObservable().pipe(
      switchMap((cart) => {
        if (!cart) {
          const cartId =
            this.localStorageService.get<string>('shopify:cart_id');

          if (!cartId) {
            return of(null);
          }

          return this.shopifyCartService.fetchCart(cartId).pipe(
            tap((cart) => {
              if (!cart) {
                this.localStorageService.remove('shopify:cart_id');
              }
            }),
            tap((cart) => this.cartSubject.next(cart))
          );
        }

        return of(cart);
      })
    );
  }

  addLineItem(productId: string, quantity = 1) {
    return of(this.cartSubject.value).pipe(
      switchMap((cart) => {
        if (!cart) {
          const cartId =
            this.localStorageService.get<string>('shopify:cart_id');

          if (cartId) {
            return this.shopifyCartService.fetchCart(cartId);
          }
        }

        return of(cart);
      }),
      switchMap((cart) => {
        if (cart) {
          return this.shopifyCartService.addLineItem(
            cart.id,
            productId,
            quantity
          );
        }

        return this.shopifyCartService
          .createCart(productId)
          .pipe(
            tap((cart) =>
              this.localStorageService.set('shopify:cart_id', cart.id)
            )
          );
      }),
      tap((cart) => this.cartSubject.next(cart))
    );
  }

  removeLineItem(itemId: string) {
    const cart = this.cartSubject.value;

    if (!cart) {
      this.notificationService.showUnknownErrorMessage();
      throw new Error('Could not remove line item - cart is unavailable');
    }

    return this.shopifyCartService
      .removeLineItem(cart.id, itemId)
      .pipe(tap((cart) => this.cartSubject.next(cart)));
  }

  setQuantity(itemId: string, quantity: number) {
    if (quantity === 0) {
      return this.removeLineItem(itemId);
    }

    const cart = this.cartSubject.value;

    if (!cart) {
      this.notificationService.showUnknownErrorMessage();
      throw new Error('Could not remove line item - cart is unavailable');
    }

    return this.shopifyCartService
      .setLineItemQuantity(cart.id, itemId, quantity)
      .pipe(tap((cart) => this.cartSubject.next(cart)));
  }
}
