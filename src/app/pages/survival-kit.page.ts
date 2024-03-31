import { RouteMeta } from '@analogjs/router';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

// TODO: Fill other metadata
export const routeMeta: RouteMeta = {
  title: 'Survival Kit | PREP',
};

@Component({
  selector: 'app-survival-kit-page', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div
      class="w-full h-[200px] landscape:pt-[100px] portrait:pt-[90px] landscape:pl-[40px] portrait:pl-[8px]"
    >
      <h1 class="product-title portrait:text-2xl landscape:text-5xl">
        PREPC: Your Compact Lifeline
      </h1>
      <h3>130 Essentials for Peace of Mind in Any Scenario</h3>
    </div>
    <div class="product-container">
      <div class="flex flex-col h-fit">
        <!-- Main image display -->
        <div class="product-image">
          <img [src]="mainImage" alt="Survival Kit" />
        </div>
        <div class="w-full relative">
          <button class="scroll-arrow left" (click)="scrollLeft()">&lt;</button>
          <div class="small-image-row" #imageRow>
            <div
              class="small-image-container"
              *ngFor="let image of images; let i = index"
              (click)="setMainImage(image)"
            >
              <img
                [src]="'img/product-page/' + image"
                [alt]="'Survival Kit Item ' + (i + 1)"
              />
            </div>
          </div>
          <button class="scroll-arrow right" (click)="scrollRight()">
            &gt;
          </button>
        </div>
      </div>

      <div class="product-details">
        <h1 class="product-title">PREPC (PREP - Case)</h1>
        <div class="product-pricing">
          <span class="sale-price">€79.99</span>
          <span class="original-price">€99.99</span>
          <span class="discount-percentage">-20%</span>
        </div>
        <div class="klarna-info flex items-center">
          <h2 class="mr-2 whitespace-nowrap">Pay with:</h2>
          <img
            class="w-[160px]"
            src="img/product-page/Marketing_Badge_With_Clear_Space.png"
            alt="pay with Klarna"
          />
        </div>
        <!-- Shipping Policy Summary Section -->
        <div
          class="shipping-policy-summary"
          [class.expanded]="isExpanded"
          (click)="toggleExpand()"
        >
          <h3>Shipping</h3>
          <p>We keep things easy:</p>
          <ul>
            <li>Free shipping on orders over €99.</li>
            <li>Flat fee of €5</li>
            <li>Items are typically dispatched within 1-2 business days.</li>
            <li>Track your order with a provided shipment number.</li>
          </ul>
          <img class="chevron w-[20px]" src="img/product-page/chevron-down-solid.svg" [ngClass]="{ expanded: isExpanded }">
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

        <div class="product-description mt-5">
          <h2>Product description</h2>
          <p>
            A survival kit should be considered mandatory equipment for all
            outdoor enthusiasts. You never know when something will go wrong,
            placing your life will be in danger. But if you have a
            well-developed survival kit with you, your survival odds will be
            greatly improved. Discover our latest survival kit with the
            necessary survival gadgets. Box contains the following.
          </p>
          <!-- Features and Benefits section -->
          <h2>Features and Benefits:</h2>

          <h3>Compact and Lightweight:</h3>
          <p>
            Weighing less than a kilogram, the PREPC is engineered for
            convenience and portability. Its sleek design allows it to be a
            discreet yet indispensable addition to your car, home, or backpack.
          </p>

          <h3>Comprehensive Emergency Kit:</h3>
          <p>
            From medical supplies to survival tools, the PREPC covers all bases.
            Each of the 130 articles has been meticulously chosen to offer
            solutions for a wide range of scenarios—ensuring you're always a
            step ahead.
          </p>

          <h3>Designed for Scandinavian Lifestyles:</h3>
          <p>
            Whether you're braving the wilderness, navigating the urban jungle,
            or simply enjoying the comfort of your home, the PREPC is tailored
            to fit the dynamic Scandinavian way of life. It's the perfect
            companion for households, nature enthusiasts, and anyone who values
            preparedness and resilience.
          </p>

          <h3>Quality and Reliability:</h3>
          <p>
            Crafted with the highest standards of quality and reliability, the
            PREPC is built to last. Each component is tested to ensure it meets
            our rigorous requirements, providing you with peace of mind in every
            situation.
          </p>

          <h3>Easy to Use and Access:</h3>
          <p>
            The PREPC is designed for efficiency and ease of use. With clearly
            organized compartments and an intuitive layout, accessing the right
            tool at the right time is simple and straightforward.
          </p>
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
          overflow-x: auto;
          padding: 10px 0;
          scroll-behavior: smooth;
          max-width: 900px;
        }

        .small-image-container {
          flex: 0 0 auto; /* Flex items won't grow but can shrink, fixing width */
          background-color: #eee; /* Lighter gray background for the smaller images */
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer; /* Indicates the item is clickable */
          border: 1px solid #ddd; /* Optional: adds a border around the small images */
          width: 160px;
          height: 160px;
        }

        .small-image-container img {
          max-width: 100%;
          max-height: 100%;
          display: block; /* Ensures that the image fills the container */
        }

        .klarna-info {
          max-width: 200px;
          margin-bottom: 14px;
        }

        /* Style for the arrow indicators, if needed */
        .scroll-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          background-color: #ffffffcc;
          border: none;
          padding: 10px;
          z-index: 9;
        }

        .scroll-arrow.left {
          left: 0;
        }

        .scroll-arrow.right {
          right: 0;
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
          background-color: rgb(52 78 65);
          color: white;
          border: none;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          cursor: pointer;
        }

        .product-description {
          font-family: 'Arial', sans-serif; /* This should match the font in the image */
          color: #333; /* A standard dark gray text color */
          line-height: 1.6; /* This increases readability */
          margin-bottom: 20px; /* Add space below the description */
        }

        .product-description h2 {
          font-size: 18px; /* Adjust size to match the image */
          font-weight: bold; /* Normal weight for the title */
          margin-bottom: 0.5em; /* Space after the title */
          display: inline-block; /* Makes the underline only as wide as the text */
          padding-bottom: 5px; /* Space between text and underline */
        }
        .product-description h3 {
          font-size: 16px; /* Slightly smaller than the main title */
          font-weight: bold; /* To distinguish the subheadings */
          margin-top: 1em; /* Space above the subheading */
          margin-bottom: 0.3em; /* Space below the subheading */
        }

        .product-description p {
          margin-top: 0; /* No space above the paragraph to keep the title close */
          margin-bottom: 1em; /* Space after the paragraph for separation */
          font-size: 14px; /* Adjust size to match the image */
          padding-left: 1em; /* Indent the paragraph text for better readability */
        }

        /* If there's a list of items, style them here */
        .product-description ul {
          list-style-type: none; /* Removes default list styling */
          padding-left: 0; /* Aligns list with the rest of the content */
          /* Style for list items goes here */
        }

        .product-description li::before {
          content: '— '; /* Adds a dash before each list item */
          color: #333; /* Same color as the text for consistency */
          font-weight: bold; /* Makes the dash slightly more prominent */
        }

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

        .quantity-arrows {
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: #f9f9f9;
        }

        .shipping-policy-summary {
          position: relative; /* Required for absolute positioning of pseudo-element */
          background-color: #f2f2f2;
          padding: 20px;
          margin: 20px 0;
          border-radius: 5px;
          max-height: 150px;
          overflow: hidden;
          transition: max-height 0.5s ease;
          cursor: pointer;
        }

        /* Gradient fade effect */
        .shipping-policy-summary::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100px; /* Height of the gradient effect */
          background: linear-gradient(
            to bottom,
            transparent,
            #f2f2f2
          ); /* Adjust the color to match the background */
          pointer-events: none; /* Allows click events to pass through */
        }

        /* Chevron icon */
        .chevron {
          position: absolute;
          bottom: 10px; /* Positioned near the bottom of the container */
          left: 50%; /* Horizontally centered */
          transform: translateX(-50%); /* Center align the icon */
          font-size: 20px; /* Size of the chevron */
          color: #333; /* Chevron color */
          pointer-events: none;
          z-index: 10;
        }

        /* Rotate chevron when expanded */
        .shipping-policy-summary.expanded .chevron {
          transform: translateX(-50%) rotate(180deg); /* Rotate the chevron */
        }

        /* Remove gradient when expanded */
        .shipping-policy-summary.expanded::after {
          display: none;
        }

        .shipping-policy-summary.expanded {
          max-height: 1000px; /* Set to a max-height that can contain all content */
        }

        .shipping-policy-summary h3 {
          font-size: 20px; /* A moderate size for the section title */
          margin-bottom: 0.5em; /* Space below the title */
        }

        .shipping-policy-summary p {
          font-size: 16px; /* A comfortable reading size for the summary */
          margin-bottom: 1em; /* Space below the paragraph before the list */
        }

        .shipping-policy-summary ul {
          list-style-type: none; /* No bullets for a cleaner look */
          padding-left: 20px; /* Indent the list for hierarchy */
        }

        .shipping-policy-summary li {
          padding-left: 1em; /* Further indent list items */
          text-indent: -1em; /* Align the first line of list items with the text above */
          margin-bottom: 0.5em; /* Space between list items */
        }

        .shipping-policy-summary li::before {
          content: '• '; /* Add a custom bullet */
          color: #333; /* Bullet color matches the text */
          font-weight: bold; /* Bold bullet for emphasis */
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

          .small-image-container {
            width: 25%; /* Adjust width of images for smaller screens */
          }

          .small-image-container {
            flex: 0 0 auto; /* Prevents flex items from growing but allows them to shrink */
            width: 80px;
            height: 80px;
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
  @ViewChild('imageRow') imageRow!: ElementRef;
  quantity: number = 1;
  isExpanded: boolean = false;
  images: string[] = [
    'PREPC_front.png',
    'PREPC_back.png',
    'PREPC_left.png',
    'PREPC_right.png',
    'PREPC-open__top.png',
    'PREPC-open__mid.png',
    'PREPC-open__pouch.png',
    'PREPC-display.png',
    'PREPC-paracord-compass-bracelet.png',
    'PREPC-poncho.png',
    'PREPC-poncho-open.png',
    'PREPC-rescue.png',
    'PREPC-thermal.png',
    'PREPC-carbin-knife.png',
    'PREPC-flash.png',
    'PREPC-ignitor.png',
    'PREPC-multitool-compact.png',
    'PREPC-scissor.png',
    'PREPC-tweezer.png',
    'PREPC-bandage.png',
  ];

  constructor() {}

  mainImage = 'img/product-page/' + this.images[0]; // Default to the first image

  setMainImage(image: string): void {
    this.mainImage = 'img/product-page/' + image;
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  scrollLeft(): void {
    this.imageRow.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.imageRow.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }
}
