import { RouteMeta } from '@analogjs/router';
import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getFullPageTitle } from '../utils/page-helpers';
import { createCommonMetaResolver } from '../utils/open-graph-helpers';
import { TranslocoPipe } from '@jsverse/transloco';

export const routeMeta: RouteMeta = {
  title: getFullPageTitle('Home'),
  meta: createCommonMetaResolver(
    'Your Source for Survival Kits and Emergency Preparedness',
    'Explore PREP for high-quality survival kits and emergency preparedness solutions. Equip yourself to handle any challenge with confidence.'
  ),
};

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, TranslocoPipe],
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
  <div class="container relative flex flex-col items-center h-screen max-h-screen">
    <div class="absolute landscape:mt-[30vh] gap-y-[30px] lg:max-w-[630px] home-page__text-section home-page__text-section--mobile landscape:px-10 lg:px-8 py-[9px] lg:py-4 lg:bg-opacity-80 rounded-lg">
      <div class="portrait:p-3 portrait:mx-5 rounded home-page__text-section--mobile-background">
        <h1
          class="header-fixed-32 max-w-[318px] lg:max-w-none uppercase text-left lg:text-left text-white text-[32px] lg:text-[64px] font-normal font-gunplay leading-9 lg:leading-[84px]"
        >
          {{ 'homepage-first-section-title' | transloco }}
        </h1>
        <p
          class="lg:block text-prep-beige text-base font-normal leading-loose mt-3 portrait:text-sm portrait:leading-6"
        >
          {{ 'homepage-first-section-description' | transloco }}
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
            >{{ 'homepage-dark-section-button' | transloco }}</span
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
          {{ 'homepage-light-section-title' | transloco }}
        </h1>
        <p class="text-pretty my-3 portrait:text-sm portrait:leading-6">
          {{ 'homepage-light-section-description' | transloco }}
        </p>
      </div>
      <button
        routerLink="/about-us"
        class="px-6 py-3.5 bg-[#c2410c] uppercase lg:rounded-lg portrait:ml-5 portrait:mt-8"
        aria-label="Navigate to product page"
      >
        <span
          class="text-white text-base lg:text-lg font-semibold leading-loose"
          >{{ 'homepage-light-section-button' | transloco }}</span
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
              {{ 'homepage-dark-section-title' | transloco }}
            </h1>
            <p class="text-pretty my-3 portrait:text-sm portrait:leading-6">
              {{ 'homepage-dark-section-description' | transloco }}
            </p>
            <button
              routerLink="/survival-kit"
              class="w-fit px-6 py-3.5 bg-[#588157] uppercase lg:rounded-lg portrait:mt-8"
              aria-label="Navigate to product page"
            >
              <span
                class="text-white text-base lg:text-lg font-semibold leading-loose"
                >{{ 'homepage-dark-section-button' | transloco }}</span
              >
            </button>
          </div>
        </div>
      </div>
      <div class="divider-container portrait:mt-8">
        <hr class="divider-line" />
        <div class="divider-text">{{ 'homepage-applications-divider' | transloco }}</div>
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
              {{ 'homepage-application-home-title' | transloco }}
            </h3>
            <p
              class="mt-3 text-center text-container text-sm portrait:leading-6"
            >
              {{ 'homepage-application-home-description' | transloco }}
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
              {{ 'homepage-application-car-title' | transloco }}
            </h3>
            <p
              class="mt-3 text-center text-container text-sm portrait:leading-6"
            >
              {{ 'homepage-application-car-description' | transloco }}
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
              {{ 'homepage-application-adventure-title' | transloco }}
            </h3>
            <p
              class="mt-3 text-center text-container text-sm portrait:leading-6"
            >
              {{ 'homepage-application-adventure-description' | transloco }}
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
              {{ 'homepage-application-everyday-title' | transloco }}
            </h3>
            <p
              class="mt-3 text-center text-container text-sm portrait:leading-6"
            >
              {{ 'homepage-application-everyday-description' | transloco }}
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
          background: rgba(0, 0, 0, 0.5);

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
