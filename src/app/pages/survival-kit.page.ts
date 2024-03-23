import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// TODO: Fill other metadata
export const routeMeta: RouteMeta = {
  title: 'Survival Kit | PREP',
};

@Component({
  selector: 'app-survival-kit-page', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="product-container landscape:pt-[80px] portrait:pt-[70px]">
      <div class="product-image p-5">
        <img src="path_to_survival_kit_main_image" alt="Survival Kit" />
        <div class="small-image-row">
          <div class="small-image-container">
            <img
              src="path_to_survival_kit_small_image_1"
              alt="Survival Kit Item 1"
            />
          </div>
          <div class="small-image-container">
            <img
              src="path_to_survival_kit_small_image_2"
              alt="Survival Kit Item 2"
            />
          </div>
          <div class="small-image-container">
            <img
              src="path_to_survival_kit_small_image_3"
              alt="Survival Kit Item 3"
            />
          </div>
          <!-- Add more small image containers as needed -->
        </div>
      </div>
      <div class="product-details">
        <h1 class="product-title">Survival Kit</h1>
        <div class="product-pricing">
          <span class="sale-price">$29.99</span>
          <span class="original-price">$59.99</span>
          <span class="discount-percentage">-50%</span>
        </div>
        <div class="klarna-info">
          <!-- Klarna logo here if applicable -->
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
          <button class="add-to-cart-btn">
            <i class="cart-icon">🛒</i> Add to cart
          </button>
        </div>

        <div class="product-description">
          <h2>Description</h2>
          <p>
            A survival kit should be considered mandatory equipment for all
            outdoor enthusiasts...
          </p>
          <ul class="product-contents">
            <li><strong>Whistle:</strong> 2</li>
            <li><strong>Compass:</strong> 1</li>
            <li><strong>Knives:</strong> 4</li>
            <!-- More items here -->
          </ul>
        </div>
        <div class="shipping-info">
          <h2>Shipping</h2>
          <p>
            When you shop with us, we want to make sure your experience is
            smooth and delightful...
          </p>
          <!-- More shipping details -->
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @tailwind utilities;

      $section-offset: 40px;

      @layer utilities {
        .product-container {
          min-height: 100vh;
          display: flex;
          flex-direction: row;
          max-width: 100%;
          margin: auto;
          background: #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .product-image {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #ccc; /* Gray background for the image container */
        }

        .product-image img {
          max-width: 100%;
          height: auto;
        }

        .small-image-row {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          justify-content: center;
          overflow-x: auto;
        }

        .small-image-container {
          background-color: #eee; /* Lighter gray background for the smaller images */
          width: 80px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .small-image-container img {
          max-width: 100%;
          max-height: 100%;
        }

        .product-details {
          display: flex;
          flex-direction: column;
          padding: 20px;
        }

        .product-title {
          font-size: 28px;
          color: #333;
          margin: 0;
        }

        .product-pricing {
          display: flex;
          align-items: center;
          font-size: 22px;
          margin: 10px 0;
        }

        .sale-price {
          color: #e44d26;
          font-weight: bold;
          margin-right: 10px;
        }

        .original-price {
          text-decoration: line-through;
          color: #757575;
        }

        .discount-percentage {
          background-color: #e44d26;
          color: white;
          padding: 2px 5px;
          border-radius: 3px;
          font-size: 18px;
          margin-left: 10px;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .add-to-cart-btn {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          cursor: pointer;
        }

        .product-description,
        .shipping-info {
          margin-top: 20px;
        }

        .quantity-add-to-cart {
          display: flex;
          align-items: center;
        }

        .quantity-selector {
          display: flex;
          align-items: stretch; /* Ensures the children stretch to fill the container */
          border: 1px solid #ddd;
          margin-right: 10px;
          height:44px;
        }

        .quantity-input {
          width:50px;
          text-align: center;
          border: none;
          padding: 10px; /* Adjust padding to match the height of the add-to-cart button */
          margin: 0;
          -webkit-appearance: none;
          -moz-appearance: textfield;
        }

        .quantity-arrows {
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: #f9f9f9;
        }

        .quantity-arrow-up,
        .quantity-arrow-down {
          background-color: transparent;
          border: none;
          padding: 0 5px;
          cursor: pointer;
          height:18px;
        }

        .add-to-cart-btn {
          background-color: #4caf50;
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

        /* Hide the browser's default arrows from the number input */
        .quantity-input::-webkit-inner-spin-button,
        .quantity-input::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .quantity-input[type='number'] {
          -moz-appearance: textfield; /* Firefox */
        }

        @media (max-width: 768px) {
          .product-container,
          .product-image-details {
            flex-direction: column;
          }

          .product-image,
          .product-details {
            width: 100%;
          }

          .small-image-row {
            overflow-x: scroll;
          }

          .small-image-container {
            flex: 0 0 auto; /* Prevents flex items from growing but allows them to shrink */
          }
        }

        /* Additional responsive consideration */
        @media (min-width: 769px) {
          .product-image-details {
            display: flex;
            flex-direction: row;
          }

          .product-image {
            flex: 3;
          }

          .product-details {
            flex: 2;
          }

          .small-image-row {
            justify-content: flex-start;
          }
        }
      }
    `,
  ],
})
export default class SurvivalKitPageComponent {
  constructor() {}
  quantity: number = 1;

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
