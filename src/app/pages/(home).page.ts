import { RouteMeta } from '@analogjs/router';
import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getFullPageTitle } from '../utils/page-helpers';

// TODO: Fill other metadata
export const routeMeta: RouteMeta = {
  title: getFullPageTitle('Home'),
};

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <div class="flex flex-col w-full h-full items-center">
      <div class="w-full h-screen absolute -z-10 overflow-hidden">
        <img
          class="w-full h-screen object-cover object-[center_top]"
          ngSrc="/img/home-page/home_landing_PREP.jpg"
          alt="A person wearing a survival kit in a forested area"
          fill
          priority
        />
      </div>
      <div
        class="container relative flex flex-col items-center h-screen max-h-screen"
      >
        <div
          class="absolute landscape:mt-[30vh] gap-y-[30px] lg:max-w-[630px] home-page__text-section home-page__text-section--mobile landscape:px-10 lg:px-8 py-[9px] lg:py-4 lg:bg-opacity-80 rounded-lg"
        >
          <div
            class="portrait:p-3 portrait:mx-5 rounded home-page__text-section--mobile-background"
          >
            <h1
              class="header-fixed-32 max-w-[318px] lg:max-w-none uppercase text-left lg:text-left text-white text-[32px] lg:text-[64px] font-normal font-gunplay leading-9 lg:leading-[84px]"
            >
              Are you ready when it happens?
            </h1>

            <p
              class="lg:block text-prep-beige text-base font-normal leading-loose mt-3 portrait:text-sm portrait:leading-6"
            >
              In moments of crisis, we don't rise to the occasion—we fall to our
              level of preparedness. At PREP, we understand that emergencies
              don't send a warning. From the unpredictable weather to the
              unforeseen events, the Scandinavian spirit of resilience has
              always been about being one step ahead. That's why we created
              PREPC—your ultimate companion in preparedness, ensuring that when
              push comes to shove, you're not just surviving; you're thriving.
            </p>
          </div>
          <div class="mt-3 portrait:mx-8 landscape:mt-10">
            <button
              routerLink="/survival-kit"
              class="px-6 py-3.5 bg-[#588157] uppercase lg:rounded-lg"
              aria-label="Navigate to product page"
            >
              <span
                class="whitespace-nowrap text-white text-base lg:text-lg font-semibold portrait:text-sm leading-loose"
                >Discover your PREP Case</span
              >
            </button>
          </div>
        </div>
      </div>

      <div
        id="light-section"
        class="container light-section__container portrait:light-section__container--mobile flex h-[720px] mb-5 bg-white text-orange-700 portrait:flex-col landscape:flex-row-reverse portrait:h-svh justify-between landscape:p-8"
      >
        <div class="image-container w-full relative flex-1 p-5">
          <img
            class="z-0 absolute image-container__image-background"
            ngSrc="/img/home-page/PREP-blob.png"
            alt="A bright red, irregularly shaped blob"
            width="500"
            height="440"
          />
          <img
            class="z-10 absolute image-container__image-foreground"
            ngSrc="/img/home-page/PREPC-2.png"
            alt="The front view of a survival kit"
            width="500"
            height="627"
          />
        </div>
        <div class="flex-1 text-container">
          <div class="portrait:mx-5 flex flex-col">
            <h1
              class="text-pretty header-fixed-32 text-orange-700 portrait:max-w-[318px] landscape:whitespace-nowrap uppercase text-left lg:text-left text-[32px] lg:text-[64px] font-normal font-gunplay leading-9 lg:leading-[84px]"
            >
              Crafted with Scandinavian
            </h1>
            <p class="text-pretty my-3 portrait:text-sm portrait:leading-6">
              ethos of efficiency and reliability, the PREPC is a testament to
              our commitment to emergency readiness. Weighing less than a
              kilogram, this compact case is a powerhouse of preparedness,
              containing 248 meticulously selected articles. From the smallest
              inconvenience to the most critical emergencies, the PREPC ensures
              you have everything you need, wherever you are—be it in your car,
              at home, or on a wilderness adventure.
            </p>
          </div>
          <button
            routerLink="/about-us"
            class="px-6 py-3.5 bg-[#c2410c] uppercase lg:rounded-lg portrait:ml-5 portrait:mt-8"
            aria-label="Navigate to product page"
          >
            <span
              class="text-white text-base lg:text-lg font-semibold leading-loose"
              >Learn more about our mission</span
            >
          </button>
        </div>
      </div>

      <div
        id="dark-section"
        class="w-full text-white bg-gradient-to-b from-black to-prep-green flex flex-col items-center"
      >
        <div class="container items-center">
          <div
            class="flex flex-col items-center justify-center landscape:h-[700px] p-5"
          >
            <div class="flex portrait:flex-col lg:flex-row items-center">
              <div class="flex justify-center portrait:mt-8 landscape:w-1/2">
                <img
                  class="p-5 product-image w-full"
                  ngSrc="/img/home-page/PREPC-Promise.png"
                  alt="An open survival kit showing its contents"
                  width="500"
                  height="624"
                />
              </div>
              <div
                class="text-container portrait:mx-5 portrait:mt-3 flex flex-col justify-center landscape:w-1/2"
              >
                <h1
                  class="text-pretty header-fixed-32 uppercase text-left lg:text-left text-[32px] lg:text-[64px] font-normal font-gunplay leading-9 lg:leading-[84px]"
                >
                  PREPC is not just a product;
                </h1>
                <p class="text-pretty my-3 portrait:text-sm portrait:leading-6">
                  it's a promise — a promise of safety, security, and peace of
                  mind. Designed for the dynamic Scandinavian lifestyle, it's
                  for the households that cherish their peace, the adventurers
                  who seek the unknown, and everyone who believes in the power
                  of preparedness. With PREPC, you're not just prepared for
                  emergencies; you're equipped for life's every adventure.
                </p>
                <button
                  routerLink="/survival-kit"
                  class="w-fit px-6 py-3.5 bg-[#588157] uppercase lg:rounded-lg portrait:mt-8"
                  aria-label="Navigate to product page"
                >
                  <span
                    class="text-white text-base lg:text-lg font-semibold leading-loose"
                    >Shop Now</span
                  >
                </button>
              </div>
            </div>
          </div>
          <div class="divider-container portrait:mt-8">
            <hr class="divider-line" />
            <div class="divider-text">Applications</div>
            <hr class="divider-line" />
          </div>
          <div class="flex flex-col justify-center h-full p-5">
            <div
              class="flex flex-row portrait:flex-col mt-5 justify-evenly items-center"
            >
              <div
                class="flex flex-col justify-between items-center portrait:mt-8 application"
              >
                <img
                  class="w-96 application--image"
                  ngSrc="/img/home-page/home.jpg"
                  alt="A survival kit next to a fire extinguisher, placed on a wooden floor in an indoor setting"
                  width="300"
                  height="300"
                />
                <h3
                  class="whitespace-nowrap header-fixed-20 mt-5 text-white max-w-[318px] lg:max-w-none uppercase text-center lg:text-center portrait:text-[18px] lg:text-[64px] font-normal leading-9 lg:leading-[84px] font-gunplay"
                >
                  In Your Home
                </h3>
                <p
                  class="mt-3 text-center text-container text-sm portrait:leading-6"
                >
                  From power outages to unexpected injuries, the PREPC ensures
                  your home is a fortress of safety and preparedness. Compact
                  yet comprehensive, it's the peace of mind every household
                  deserves.
                </p>
              </div>
              <div
                class="flex flex-col justify-between items-center portrait:mt-8 application"
              >
                <img
                  class="w-96 application--image"
                  ngSrc="/img/home-page/car.jpg"
                  alt="A survival kit inside the open glove compartment of a car"
                  width="300"
                  height="300"
                />
                <h3
                  class="whitespace-nowrap header-fixed-20 mt-5 text-white max-w-[318px] lg:max-w-none uppercase text-center lg:text-center portrait:text-[18px] lg:text-[64px] font-normal leading-9 lg:leading-[84px] font-gunplay"
                >
                  In Your Car
                </h3>
                <p
                  class="mt-3 text-center text-container text-sm portrait:leading-6"
                >
                  Road trips or daily commutes, the PREPC turns your car into a
                  mobile safety hub. Whether it's a flat tire or a first aid
                  necessity, you're always a step ahead
                </p>
              </div>
            </div>
            <div
              class="flex flex-row portrait:flex-col mt-5 justify-evenly items-center"
            >
              <div
                class="flex flex-col justify-between items-center portrait:mt-8 application"
              >
                <img
                  class="w-96 application--image"
                  ngSrc="/img/home-page/adventure.jpg"
                  alt="todo add alt and real image"
                  width="300"
                  height="300"
                />
                <h3
                  class="whitespace-nowrap header-fixed-20 mt-5 text-white max-w-[318px] lg:max-w-none uppercase text-center lg:text-center portrait:text-[18px] lg:text-[64px] font-normal leading-9 lg:leading-[84px] font-gunplay"
                >
                  Out on Adventure
                </h3>
                <p
                  class="mt-3 text-center text-container text-sm portrait:leading-6"
                >
                  Embrace the wild with confidence. The PREPC is your silent
                  guardian in the great outdoors, ensuring you're prepared for
                  any twist your adventure takes.
                </p>
              </div>
              <div
                class="flex flex-col justify-between items-center portrait:mt-8 application"
              >
                <img
                  class="w-96 application--image"
                  ngSrc="/img/home-page/prep.jpg"
                  alt="An open survival kit showing its content, placed next to a fallen tree in a forested area"
                  width="300"
                  height="300"
                />
                <h3
                  class="whitespace-nowrap header-fixed-20 mt-5 text-white max-w-[318px] lg:max-w-none uppercase text-center lg:text-center portrait:text-[18px] lg:text-[64px] font-normal leading-9 lg:leading-[84px] font-gunplay"
                >
                  Everyday Preparedness
                </h3>
                <p
                  class="mt-3 text-center text-container text-sm portrait:leading-6"
                >
                  Life is unpredictable, but with the PREPC, you're always
                  equipped. It's the ultimate companion for the everyday hero,
                  ready for whatever the day may bring
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
        .header-fixed-32 {
          font-size: 32px !important;
        }

        .header-fixed-20 {
          font-size: 20px !important;
        }
        .hero-title-box-portrait {
          margin-top: calc(230px / 683px * 100vh);
        }

        .shop-now-button-box-portrait {
          margin-top: calc(160px / 683px * 100vh);
        }

        .divider-container {
          display: flex;
          align-items: center;
          text-align: center;
        }

        .light-section__container {
          display: flex;
          align-items: center;

          @media screen and (min-width: 1525px) {
            height: 1000px;
          }

          &--mobile {
            padding: 20px 0 60px 0;
          }
        }

        .text-container {
          max-width: 500px;
          min-width: 50%;

          &--product-hero {
            @media screen and (max-width: 905px) {
              width: unset;
            }
          }
        }

        .product-image {
          max-width: 500px;
          min-width: 50%;
          @media screen and (max-width: 1025px) {
            max-height: 400px;
          }
        }

        .application {
          width: 300px;
          &--image {
            width: 300px;
            border-radius: 8px;
          }
        }

        .image-container {
          max-width: 500px;
          min-width: 50%;
          &__image-background {
            rotate: 180deg;
            opacity: 0.7;
            top: 50%;
            left: 50%;
            transform: translate(50%, 50%);
            @media screen and (max-width: 905px) {
              width: 80%;
            }
          }

          &__image-foreground {
            width: 80%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: auto;
            @media screen and (max-width: 905px) {
              width: 60%;
            }
          }
        }

        .divider-line {
          flex: 1;
          border: none;
          height: 1px;
          background-color: #fff; /* Adjust the color to match your screenshot */
          margin: 0 20px; /* Adjust spacing to match your screenshot */
        }

        .divider-text {
          padding: 0 10px; /* Adjust padding to match your screenshot */
        }

        .home-page__text-section {
          right: 20px;
          max-width: 500px;

          @media screen and (max-width: 1200px) {
            margin-top: unset;
            top: 50%;
            transform: translate(0, -50%);
          }

          &--mobile {
            @media screen and (max-width: 600px) {
              right: unset;
              top: unset;
              bottom: 5%;
              max-width: 90%;
              transform: unset;
            }
          }

          background: rgba(0, 0, 0, 0.5);
        }

        #light-section {
          clip-path: polygon(
            0 0,
            100% 0,
            100% calc(100% - #{$section-offset}),
            0 100%
          );
          margin-bottom: -#{$section-offset};
        }

        #dark-section {
          clip-path: polygon(0 #{$section-offset}, 100% 0, 100% 100%, 0 100%);
          padding-top: #{$section-offset};
        }
      }
    `,
  ],
})
export default class HomePageComponent {}
