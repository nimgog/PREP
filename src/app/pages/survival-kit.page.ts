import { RouteMeta } from '@analogjs/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription, take, tap } from 'rxjs';
import { VideoModalComponent } from '../components/common/video-modal.component';
import { ShopifyProductService } from '../services/shopify-product.service';
import { Money, ProductVariant } from '../models/product.model';
import { ContextService } from '../services/context.service';
import { NotificationService } from '../services/notification.service';
import { getFullPageTitle } from '../utils/page-helpers';
import { createCommonMetaResolver } from '../utils/open-graph-helpers';
import { Meta } from '@angular/platform-browser';

export const routeMeta: RouteMeta = {
  title: getFullPageTitle('Survival Kit'),
  meta: createCommonMetaResolver(
    'Survival Kit',
    'Discover PREP´s Survival Kits, designed to help you face emergencies with confidence. Quality, reliability, and functionality in every kit.'
  ),
};

@Component({
  selector: 'app-survival-kit-page',
  standalone: true,
  imports: [FormsModule, CommonModule, VideoModalComponent, NgOptimizedImage],
  template: `
    <div class="flex flex-col w-full items-center">
      <div class="container">
        <div
          class="w-full h-[230px] landscape:pt-[100px] portrait:pt-[90px] landscape:pl-[40px] portrait:pl-[8px] text-center"
        >
          <h1
            class="product-title portrait:text-3xl landscape:text-4xl font-bold"
          >
            Your Ultimate Prepping Case
          </h1>
          <h3>PREPC - 248 Essentials for Peace of Mind in Any Scenario</h3>
        </div>
        <div class="product-container">
          <div class="flex flex-col h-fit product-creative-column">
            <!-- Main image display -->
            <div class="product-image">
              <img
                [ngSrc]="mainImage"
                alt="Survival Kit"
                width="768"
                height="768"
                ngSrcset="600w, 800w"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div class="w-full relative">
              <button class="scroll-arrow left" (click)="scrollLeft()">
                &lt;
              </button>
              <div class="small-image-row" #imageRow>
                <div
                  class="small-image-container relative"
                  *ngFor="let image of images; let i = index"
                  (click)="setMainImage(image)"
                >
                  <img
                    [ngSrc]="'img/product-page/' + image"
                    [alt]="'Survival Kit Item ' + (i + 1)"
                    sizes="25vw"
                    fill
                    [priority]="i === 0"
                  />
                </div>
              </div>
              <button class="scroll-arrow right" (click)="scrollRight()">
                &gt;
              </button>
            </div>
            <h2 class="pl-2 font-bold text-2xl mt-3">Whats included:</h2>
            <div class="scrollable-row">
              <div *ngFor="let item of itemsWithImages" class="item">
                <img
                  ngSrc="img/product-page/items/{{ item.file }}"
                  [alt]="item.name"
                  width="230"
                  [height]="item.heightFor230w"
                />
                <p>{{ item.name }}</p>
              </div>
            </div>
            <h3 *ngIf="portrait" class="text-center font-bold text-1xl mt-3">
              Full prepping inventory below
            </h3>
            <!-- Video thumbnails container -->
            <div
              class="flex flex-col md:flex-row w-full mt-4 landscape:max-h-[250px] landscape:overflow-hidden	"
            >
              <!-- Landscape video thumbnail with play icon -->
              <div
                class="flex-1 cursor-pointer relative"
                (click)="openModal('landscape')"
              >
                <img
                  ngSrc="img/product-page/landscape_thumbnail.png"
                  alt="Landscape Video"
                  class="w-full h-auto"
                  width="640"
                  height="360"
                  ngSrcset="500w, 767w, 768w"
                  sizes="(max-width: 500px) 100vw, (max-width: 767px) 100vw, 25vw"
                />
                <div class="absolute inset-0 flex justify-center items-center">
                  <div class="p-3 rounded-full bg-emerald-700">
                    <svg
                      class="w-8 h-8 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                      <path
                        fill="#ffffff"
                        d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Portrait video thumbnail with play icon -->
              <div
                class="flex-1 cursor-pointer relative"
                (click)="openModal('portrait')"
              >
                <img
                  ngSrc="img/product-page/portrait_thumbnail.png"
                  alt="Portrait Video"
                  class="w-full h-auto"
                  width="640"
                  height="357"
                  ngSrcset="500w, 767w, 768w"
                  sizes="(max-width: 500px) 100vw, (max-width: 767px) 100vw, 25vw"
                />
                <div class="absolute inset-0 flex justify-center items-center">
                  <div class="p-3 rounded-full bg-emerald-700">
                    <svg
                      class="w-8 h-8 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                      <path
                        fill="#ffffff"
                        d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <app-video-modal></app-video-modal>
          </div>

          <div class="product-details">
            <h1 class="product-title font-bold">Prepping Case - PREPC</h1>
            <div *ngIf="productVariant" class="product-pricing">
              <div class="flex flex-col mr-3">
                <span *ngIf="productVariant" class="sale-price"
                  >{{ productVariant.price.amount | number : '1.0-0' }}{{ ' '
                  }}{{ productVariant.price.currencyCode }}</span
                >
                <span *ngIf="productVariant" class="original-price"
                  >{{ productVariant.price.amount * 1.177 | number : '1.0-0'
                  }}{{ ' ' }}{{ productVariant.price.currencyCode }}</span
                >
              </div>
              <span class="discount-percentage">-15%</span>
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
            <!-- Shipping Policy Summary Section -->
            <div
              class="shipping-policy-summary w-full"
              [class.expanded]="isExpanded"
              (click)="toggleExpand()"
            >
              <h3 class="font-bold">Free Shipping</h3>
              <p>We keep things easy:</p>
              <ul>
                <li>
                  Free shipping on all orders - you might have to enter address
                  on checkout for it to show.
                </li>
                <li>
                  Carrier used:
                  <a
                    style="color: blue;"
                    target="_blank"
                    href="https://www.postnord.se/en/"
                    >Postnord</a
                  >
                </li>
                <li>
                  Items ordered before 17:00 are sent the same day. Shipping
                  time:
                  <ul>
                    <li>Sweden: 1-2 business days</li>
                    <li>Europe: no longer than 7 bussiness days</li>
                  </ul>
                </li>
                <li>Track your order with a provided shipment number.</li>
              </ul>
              <img
                class="chevron w-[20px]"
                src="img/product-page/chevron-down-solid.svg"
                alt="Expand shipping details"
                [ngClass]="{ expanded: isExpanded }"
              />
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
              <button
                *ngIf="!isLoading"
                class="add-to-cart-btn"
                (click)="addToCart()"
              >
                <i class="cart-icon">🛒</i>
                <p>Add to cart</p>
              </button>

              <div *ngIf="isLoading" role="status" class="ml-5">
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
            </div>
            <!-- <h2 class="font-bold mt-3">Whats included:</h2>
            <div class="scrollable-row">
              <div *ngFor="let item of itemsWithImages" class="item">
                <img
                  src="img/product-page/items/{{ item.file }}"
                  [alt]="item.name"
                  height="96"
                />
                <p>{{ item.name }}</p>
              </div>
            </div> -->
            <div class="tldr-container ml-0">
              <h2 class="tldr-title font-bold">Summary</h2>
              <ul class="tldr-list">
                <li>Prepping Case weighs ~700g</li>
                <li>Full first-aid kit (total 248 articles)</li>
                <li>
                  Good to have emergency tools (glowsticks, compass.. etc)
                </li>
                <li>
                  With Moll-e system it is easy to attach & deploy in the field
                </li>
              </ul>
            </div>
            <div class="product-description mt-5 flex flex-col">
              <h2
                (click)="toggleSection('items')"
                class="accordion-toggle items-center justify-between"
              >
                Items specification

                <div
                  class="w-[16px]"
                  [ngClass]="{ rotated: sections['items'] }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
                  </svg>
                </div>
              </h2>
              <div *ngIf="sections['items']" class="accordion-content">
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Specification</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Alcohol prep pad</td>
                        <td>5*5cm</td>
                        <td>40</td>
                      </tr>
                      <tr>
                        <td>medium bandages</td>
                        <td>72*19mm</td>
                        <td>40</td>
                      </tr>
                      <tr>
                        <td>cotton tip</td>
                        <td>7.4cm</td>
                        <td>80</td>
                      </tr>
                      <tr>
                        <td>joint bandage</td>
                        <td>75*38mm</td>
                        <td>5</td>
                      </tr>
                      <tr>
                        <td>butterfly bandages</td>
                        <td>10x46mm</td>
                        <td>5</td>
                      </tr>
                      <tr>
                        <td>Gauze pad</td>
                        <td>7.5x7.5cm-8p</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>adhesive wound dressing</td>
                        <td>6x7cm</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>relief pads</td>
                        <td>5x5cm</td>
                        <td>4</td>
                      </tr>
                      <tr>
                        <td>disposable gloves</td>
                        <td>L</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>first aid tape</td>
                        <td>1.25x450cm</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>burn care</td>
                        <td>3.5g</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>emergency Mylar blanket</td>
                        <td>130x210cm</td>
                        <td>4p - 1</td>
                      </tr>
                      <tr>
                        <td>metal scissor</td>
                        <td>14.5cm</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>PBT bandage</td>
                        <td>5x450cm</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>CPR mask</td>
                        <td>#022</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>Tweezer</td>
                        <td>10.5cm</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>safety pin</td>
                        <td>3.7cm</td>
                        <td>10</td>
                      </tr>
                      <tr>
                        <td>cotton balls</td>
                        <td>N/A</td>
                        <td>20</td>
                      </tr>
                      <tr>
                        <td>soap wipes</td>
                        <td>5x6cm</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>antiseptic wipes</td>
                        <td>6x8cm</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>wound adhesive dressings large</td>
                        <td>40x60cm</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>triangular bandage</td>
                        <td>96x96x136cm</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>mini bandages</td>
                        <td>10x40mm</td>
                        <td>15</td>
                      </tr>
                      <tr>
                        <td>Swedish patch flag</td>
                        <td>8x5.3cm</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>Glow stick 12 hour duration</td>
                        <td>15cm</td>
                        <td>2</td>
                      </tr>
                      <tr>
                        <td>flashlight</td>
                        <td>SK68</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>paracord survival bracelet</td>
                        <td>10inch adjustable</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>multifunctional card tool</td>
                        <td>4.5x7cm</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>carabiner / knife</td>
                        <td>N/A</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>disposable poncho</td>
                        <td>L</td>
                        <td>1</td>
                      </tr>
                      <tr>
                        <td>EMT Molle tactical bag</td>
                        <td>21x14x19cm</td>
                        <td>1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <h2
                (click)="toggleSection('description')"
                class="accordion-toggle items-center justify-between"
              >
                Product description

                <div
                  class="w-[16px]"
                  [ngClass]="{ rotated: sections['description'] }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
                  </svg>
                </div>
              </h2>
              <div *ngIf="sections['description']" class="accordion-content">
                <p>
                  In today's unpredictable world, being prepared is more than a
                  precaution—it's a necessity. Whether it's a natural disaster,
                  a power outage, or an unexpected emergency, having your PREP
                  Case on hand can make all the difference. PREPC is designed
                  not just for the outdoor adventurer but for every household
                  and car - ensuring that you and your loved ones have the
                  necessary tools to navigate any situation safely where ever
                  you are.
                </p>
              </div>
              <!-- Features and Benefits section -->
              <h2
                (click)="toggleSection('features')"
                class="accordion-toggle  items-center justify-between"
              >
                Features
                <div
                  class="w-[16px]"
                  [ngClass]="{ rotated: sections['features'] }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                    <path
                      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                    />
                  </svg>
                </div>
              </h2>
              <div *ngIf="sections['features']" class="accordion-content">
                <h3>Compact and Lightweight:</h3>
                <p>
                  Weighing less than a kilogram, the PREPC is engineered for
                  convenience and portability. Its sleek design allows it to be
                  a discreet yet indispensable addition to your car, home, or
                  backpack.
                </p>

                <h3>Comprehensive Emergency Kit:</h3>
                <p>
                  From medical supplies to survival tools, the PREPC covers all
                  bases. Each of the 248 articles has been meticulously chosen
                  to offer solutions for a wide range of scenarios—ensuring
                  you're always a step ahead.
                </p>

                <h3>Designed for Scandinavian Lifestyles:</h3>
                <p>
                  Whether you're braving the wilderness, navigating the urban
                  jungle, or simply enjoying the comfort of your home, the PREPC
                  is tailored to fit the dynamic Scandinavian way of life. It's
                  the perfect companion for households, nature enthusiasts, and
                  anyone who values preparedness and resilience.
                </p>

                <h3>Quality and Reliability:</h3>
                <p>
                  Crafted with the highest standards of quality and reliability,
                  the PREPC is built to last. Each component is tested to ensure
                  it meets our rigorous requirements, providing you with peace
                  of mind in every situation.
                </p>

                <h3>Easy to Use and Access:</h3>
                <p>
                  The PREPC is designed for efficiency and ease of use. With
                  clearly organized compartments and an intuitive layout,
                  accessing the right tool at the right time is simple and
                  straightforward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @tailwind utilities;

      $section-offset: 40px;

      @layer utilities {
        .tldr-container {
          background-color: #f0f0f0; /* Light gray background */
          border: 2px solid black; /* Black border, 2px */
          border-radius: 10px; /* Rounded corners */
          padding: 20px; /* Space inside the container */
          margin: 20px 20px 0 0; /* Space outside the container */
          max-width: 600px; /* Maximum width, but you can adjust or remove this as needed */
          width: 100%; /* Makes the width responsive to the container */
          box-sizing: border-box; /* Ensures padding and border are included in the total width/height */
        }

        .tldr-title {
          margin-top: 0; /* Removes the default top margin from the title for a tighter look */
          margin-bottom: 16px; /* Space between the title and the bullet points */
        }

        .tldr-list {
          list-style-type: disc; /* Adds bullets to the list */
          padding-left: 20px; /* Indents the list to align with the title text above */
          margin: 0; /* Removes default margin */
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .tldr-container {
            margin: 20px 10px 0 0; /* Less space outside the container on smaller screens */
            padding: 10px; /* Less space inside the container on smaller screens */
          }
          .tldr-title {
            font-size: 18px; /* Smaller font size for the title on smaller screens */
          }
        }

        .scrollable-row {
          display: flex;
          overflow-x: scroll; /* Ensures horizontal scrolling */
          white-space: nowrap; /* Keeps items in a single line */
          padding: 10px 0; /* Adds some vertical padding */
        }

        .item {
          flex: none; /* Prevents items from stretching */
          display: flex;
          flex-direction: column; /* Stacks image and text vertically */
          align-items: center; /* Centers items horizontally within each 'item' */
          margin-right: 20px; /* Adds space between items */
          border: 1px solid #ccc; /* Adds a border around each item */
          border-radius: 8px; /* Rounds the corners of the border */
          padding: 10px; /* Adds some padding inside each item */
        }

        .item img {
          max-height: 96px; /* Ensures images are no larger than 96px in height */
          width: auto; /* Maintains aspect ratio */
          margin-bottom: 10px; /* Adds space between the image and the name */
        }

        .item p {
          margin: 0; /* Removes default paragraph margin */
          text-align: center; /* Centers the name text */
        }

        .accordion-toggle {
          padding: 1rem;
          border: 1px solid black;
          border-radius: 8px;
          margin-top: 5px;
        }
        .table-responsive {
          width: 100%;
          overflow-x: auto; /* Allows table to scroll horizontally on small devices */
        }

        table {
          width: 100%;
          border-collapse: collapse; /* Collapses the border lines between cells */
        }

        th,
        td {
          text-align: left;
          padding: 8px; /* Adjust padding as needed */
          border-bottom: 1px solid #ddd; /* Adds a border line below each row */
        }

        th {
          background-color: #f2f2f2; /* Adds a background color to the header row */
        }

        /* Adds a zebra-striping effect to table rows */
        tbody tr:nth-child(odd) {
          background-color: #f9f9f9;
        }

        tbody tr td:first-child {
          font-weight: bold; /* This will make the text bold for the first td in each tr */
        }

        /* Styling for mobile screens */
        @media screen and (max-width: 600px) {
          th,
          td {
            display: block; /* Makes table cells stack on top of each other */
            width: 100%;
          }
          th {
            position: sticky;
            top: 0;
          }
        }

        .rotated {
          transform: rotate(180deg);
          transition: transform 0.3s ease-in-out;
        }
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

        .price-container {
          width: 104.7px;
          height: 66px;
          background: #ececec; /* Light gray background */
          position: relative;
          overflow: hidden;
          border-radius: 8px;
        }

        .price-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to right,
            #ececec 0%,
            #d4d4d4 50%,
            #ececec 100%
          );
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
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
          display: flex; /* Makes the underline only as wide as the text */
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
          background-color: #2ecc71;
          padding: 20px;
          margin: 20px 0;
          border-radius: 5px;
          max-height: 150px;
          overflow: hidden;
          transition: max-height 0.5s ease;
          border: 2px solid #27ae60;
          cursor: pointer;
          color: white;
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
            #2ecc71
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
          z-index: 9;
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
          color: #fff; /* Bullet color matches the text */
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

        @media (min-width: 768px) {
          .product-creative-column {
            max-width: 50%;
          }
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
            max-width: 50%;
          }

          .small-image-row {
            justify-content: flex-start;
          }
        }
      }
    `,
  ],
})
export default class SurvivalKitPageComponent implements OnInit, OnDestroy {
  static readonly PRODUCT_HANDLE = 'prepc-prep-case';

  @ViewChild('imageRow') imageRow!: ElementRef;
  @ViewChild(VideoModalComponent) videoModal!: VideoModalComponent;
  quantity: number = 1;
  isExpanded: boolean = false;
  images: string[] = [
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
    'PREPC_front.png',
    'PREPC_back.png',
    'PREPC_left.png',
    'PREPC_right.png',
  ];

  itemsWithImages: { name: string; file: string; heightFor230w: number }[] = [
    { name: 'Ignition steel', file: 'ignitor.png', heightFor230w: 230 },
    {
      name: 'Glow stick 12 hour duration',
      file: 'Glow_stick_12_hour_duration.png',
      heightFor230w: 115,
    },
    { name: 'Flashlight', file: 'flashlight.png', heightFor230w: 166 },
    {
      name: 'Paracord survival bracelet',
      file: 'paracord_survival_bracelet.png',
      heightFor230w: 194,
    },
    {
      name: 'Alcohol prep pad',
      file: 'Alcohol_prep_pad.png',
      heightFor230w: 230,
    },
    {
      name: 'Medium bandages',
      file: 'medium_bandages.png',
      heightFor230w: 103,
    },
    { name: 'Cotton tip', file: 'cotton_tip.png', heightFor230w: 158 },
    { name: 'Joint bandage', file: 'joint_bandage.png', heightFor230w: 156 },
    {
      name: 'Butterfly bandages',
      file: 'butterfly_bandages.png',
      heightFor230w: 106,
    },
    { name: 'Gauze pad', file: 'Gauze_pad.png', heightFor230w: 163 },
    {
      name: 'Adhesive wound dressing',
      file: 'adhesive_wound_dressing.png',
      heightFor230w: 167,
    },
    { name: 'Relief pads', file: 'relief_pads.png', heightFor230w: 231 },
    {
      name: 'Disposable gloves',
      file: 'disposable_gloves.png',
      heightFor230w: 348,
    },
    { name: 'First aid tape', file: 'first_aid_tape.png', heightFor230w: 160 },
    { name: 'Burn care', file: 'burn_care.png', heightFor230w: 105 },
    {
      name: 'Emergency Mylar blanket',
      file: 'emergency_Mylar_blanket.png',
      heightFor230w: 160,
    },
    { name: 'Metal scissor', file: 'metal_scissor.png', heightFor230w: 149 },
    { name: 'PBT bandage', file: 'PBT_bandage.png', heightFor230w: 144 },
    { name: 'CPR mask', file: 'CPR_mask.png', heightFor230w: 204 },
    { name: 'Tweezer', file: 'Tweezer.png', heightFor230w: 242 },
    { name: 'Safety pin', file: 'safety_pin.png', heightFor230w: 271 },
    { name: 'Cotton balls', file: 'cotton_balls.png', heightFor230w: 282 },
    { name: 'Soap wipes', file: 'soap_wipes.png', heightFor230w: 247 },
    {
      name: 'Antiseptic wipes',
      file: 'antiseptic_wipes.png',
      heightFor230w: 294,
    },
    {
      name: 'Wound adhesive dressings large',
      file: 'wound_adhesive_dressings_large.png',
      heightFor230w: 284,
    },
    {
      name: 'Triangular bandage',
      file: 'triangular_bandage.png',
      heightFor230w: 250,
    },
    { name: 'Mini bandages', file: 'mini_bandages.png', heightFor230w: 99 },
    {
      name: 'Swedish patch flag',
      file: 'Swedish_patch_flag.jpg',
      heightFor230w: 134,
    },
    {
      name: 'Multifunctional card tool',
      file: 'multifunctional_card_tool.png',
      heightFor230w: 167,
    },
    {
      name: 'Carabiner knife',
      file: 'carabiner_knife.png',
      heightFor230w: 230,
    }, // Note the adjusted name
    {
      name: 'Disposable poncho',
      file: 'disposable_poncho.png',
      heightFor230w: 183,
    },
    {
      name: 'EMT Molle tactical bag',
      file: 'EMT_Molle_tactical_bag.png',
      heightFor230w: 230,
    },
  ];

  sections: Sections = {
    items: false,
    description: false,
    features: false,
  };
  mainImage = 'img/product-page/' + this.images[0]; // Default to the first image
  isLoading = false;
  isFetching = true;
  portrait = false;

  productVariant?: ProductVariant;
  shippingFee?: Money;
  productPriceRefreshSignalSub?: Subscription;

  private readonly shoppingCartService = inject(ShoppingCartService);
  private readonly shopifyProductService = inject(ShopifyProductService);
  private readonly contextService = inject(ContextService);
  private readonly notificationService = inject(NotificationService);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    if (this.contextService.isClientSide) {
      this.fetchProduct();
      this.fetchShippingFee();

      this.productPriceRefreshSignalSub =
        this.shopifyProductService.productPriceRefreshSignal$
          .pipe(tap(this.fetchProduct), tap(this.fetchShippingFee))
          .subscribe();

      if (window.screen.width < 768) {
        this.portrait = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.productPriceRefreshSignalSub?.unsubscribe();
  }

  fetchProduct(): void {
    this.shopifyProductService
      .fetchProduct(SurvivalKitPageComponent.PRODUCT_HANDLE)
      .pipe(take(1))
      .subscribe({
        next: (product) => {
          this.productVariant = product.variants[0];
          this.isFetching = false;

          this.meta.updateTag({
            property: 'og:price:amount',
            content: this.productVariant.price.amount.toFixed(2),
          });

          this.meta.updateTag({
            property: 'og:price:currency',
            content: this.productVariant.price.currencyCode,
          });
        },
      });
  }

  fetchShippingFee(): void {
    this.shopifyProductService
      .fetchShippingFee()
      .subscribe((threshold) => (this.shippingFee = threshold || undefined));
  }

  get shippingFeeText(): string {
    return this.shippingFee
      ? `${this.shippingFee.amount} ${this.shippingFee.currencyCode}`
      : '';
  }

  get freeShippingThresholdText(): string {
    if (!this.shippingFee) {
      return '';
    }

    const thresholdAmount = this.shippingFee.amount * 16.5;
    return `${thresholdAmount} ${this.shippingFee.currencyCode}`;
  }

  toggleSection(section: string): void {
    this.sections[section] = !this.sections[section];
  }

  setMainImage(image: string): void {
    this.mainImage = 'img/product-page/' + image;
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  currentVideoSource: string = '';

  openModal(videoType: 'landscape' | 'portrait'): void {
    this.currentVideoSource =
      videoType === 'landscape'
        ? 'video/Hemsida.mov'
        : 'video/PREPC_voiceover.mov';
    this.videoModal.showModal = true;
    this.videoModal.videoSource = this.currentVideoSource;
  }

  addToCart(): void {
    if (!this.productVariant) {
      this.notificationService.showUnknownErrorMessage();
      return;
    }
    this.shoppingCartService.openCart();
    const quantity = this.quantity > 0 ? this.quantity : 1;
    this.isLoading = true;
    this.shoppingCartService
      .addLineItem(this.productVariant.id, quantity)
      .pipe(take(1))
      .subscribe({
        complete: () => {
          this.isLoading = false;
          this.quantity = 1;
        },
      });
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

interface Sections {
  [key: string]: boolean;
}
