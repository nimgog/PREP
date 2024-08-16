import { DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { LineItem } from 'src/app/models/shopping-cart.model';

@Component({
  selector: 'app-cart-line-item',
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <div class="cart-item flex items-center p-4 bg-white shadow-md mb-4">
      <div
        class="image-container w-24 h-24 bg-gray-200 flex justify-center items-center"
      >
        <img
          [src]="lineItem().product.imageUrl"
          [alt]="lineItem().product.title"
          class="object-cover w-full h-full"
          (error)="imageError($event)"
        />
      </div>

      <div class="flex-1 ml-4">
        <div class="font-semibold text-lg">
          {{ lineItem().product.title }}
        </div>

        <div class="flex items-center justify-between mt-2">
          <div class="stepper flex items-center">
            <button
              (click)="decrement()"
              class="text-gray-500 bg-gray-200 h-8 w-8 flex items-center justify-center"
            >
              &#8722;
            </button>
            <div class="px-3">{{ lineItem().quantity }}</div>
            <button
              (click)="increment()"
              class="text-gray-500 bg-gray-200 h-8 w-8 flex items-center justify-center"
            >
              &#43;
            </button>
          </div>

          <div class="text-right">
            <div class="font-semibold text-lg">
              {{ lineItem().totalPrice.amount | number : '1.0-0' }}
              {{ lineItem().totalPrice.currencyCode }}
            </div>

            @if (lineItem().originalTotalPrice) {
            <div class="text-sm line-through text-red-500">
              {{ lineItem().originalTotalPrice!.amount | number : '1.0-0' }}
              {{ lineItem().originalTotalPrice!.currencyCode }}
            </div>
            }
          </div>
        </div>
      </div>

      <button (click)="remove()" class="ml-4">
        <svg
          class="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
          />
        </svg>
      </button>
    </div>
  `,
  styles: [
    `
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

      .cart-item .stepper button:first-child {
        border-top-left-radius: 9999px;
        border-bottom-left-radius: 9999px;
      }

      .cart-item .stepper button:last-child {
        border-top-right-radius: 9999px;
        border-bottom-right-radius: 9999px;
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
    `,
  ],
})
export default class CartLineItemComponent {
  lineItem = input.required<LineItem>();

  onIncrement = output<LineItem>();
  onDecrement = output<LineItem>();
  onRemove = output<LineItem>();

  imageError(event: any) {
    event.target.style.display = 'none'; // Hide the broken image icon
  }

  increment() {
    this.onIncrement.emit(this.lineItem());
  }

  decrement() {
    this.onDecrement.emit(this.lineItem());
  }

  remove() {
    this.onRemove.emit(this.lineItem());
  }
}
