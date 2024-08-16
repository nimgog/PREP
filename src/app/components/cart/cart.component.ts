import { DecimalPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, output } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { LineItem, ShoppingCart } from 'src/app/models/shopping-cart.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import CartLineItemComponent from './cart-line-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe, CartLineItemComponent],
  template: `
    <div
      class="cart-content bg-white w-11/12 md:w-3/4 lg:w-1/2 h-3/4 overflow-auto"
    >
      <div class="flex justify-between items-center p-4">
        <h2 class="text-lg font-bold">Your Cart</h2>
        <button aria-label="Close cart" (click)="closeCart()">Close</button>
      </div>

      @for (lineItem of cart?.lines || []; track lineItem.id) {
      <app-cart-line-item
        [lineItem]="lineItem"
        (onDecrement)="decrementItemQuantity(lineItem)"
        (onIncrement)="incrementItemQuantity(lineItem)"
        (onRemove)="removeItem(lineItem)"
      ></app-cart-line-item>
      }

      <!-- Fallback -->
      @if (!cart?.totalQuantity) {
      <div class="cart-empty__description">
        <p>Your cart is empty.</p>
      </div>
      }

      <!-- Summary -->
      @if (cart && cart.totalQuantity) {
      <div class="summary">
        <div>Total Items: {{ cart.totalQuantity }}</div>
        <div>
          Total Price: {{ cart.totalPrice.amount | number : '1.0-0' }}
          {{ cart.totalPrice.currencyCode }}
        </div>
      </div>
      }

      <!-- Actions -->
      @if (cart && cart.totalQuantity) {
      <div class="actions">
        <button (click)="closeCart()">Back</button>
        <a
          class="button-checkout"
          [href]="cart.checkoutUrl"
          rel="noopener noreferrer"
          >Checkout</a
        >
      </div>
      }
    </div>
  `,
  styles: [
    `
      .cart-content {
        background-color: #fff;
        height: fit-content;
        overflow-y: auto; /* Allows scrolling if the content exceeds the height */
        border-radius: 4px;
      }

      .summary {
        padding: 16px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 16px;
        border-radius: 8px;
      }

      .actions {
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 32px;
      }

      .actions > .button-checkout {
        background-color: #10b981;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
        padding: 12px 24px;
        border-radius: 4px;
      }

      .cart-empty__description {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
      }
    `,
  ],
})
export default class CartComponent implements OnInit, OnDestroy {
  private readonly shoppingCartService = inject(ShoppingCartService);

  cartSubscription?: Subscription;
  cart: ShoppingCart | null = null;

  onClose = output();

  ngOnInit(): void {
    this.cartSubscription = this.shoppingCartService.cart$.subscribe({
      next: (cart) => {
        this.cart = cart;
      },
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  incrementItemQuantity(item: LineItem): void {
    this.shoppingCartService
      .addLineItem(item.product.id)
      .pipe(take(1))
      .subscribe();
  }

  decrementItemQuantity(item: LineItem): void {
    if (item.quantity > 1) {
      this.shoppingCartService
        .setQuantity(item.id, item.quantity - 1)
        .pipe(take(1))
        .subscribe();
    } else {
      this.shoppingCartService
        .removeLineItem(item.id)
        .pipe(take(1))
        .subscribe();
    }
  }

  removeItem(item: LineItem): void {
    this.shoppingCartService.removeLineItem(item.id).pipe(take(1)).subscribe();
  }

  closeCart() {
    this.onClose.emit();
  }
}
