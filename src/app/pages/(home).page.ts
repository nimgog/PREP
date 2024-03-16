import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// TODO: Fill other metadata
export const routeMeta: RouteMeta = {
  title: 'Home | PREP',
};

@Component({
  selector: 'app-home-page', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col w-full h-full">
      <div class="relative flex flex-col items-center h-screen max-h-screen">
        <div class="absolute inset-0 -z-10 overflow-hidden">
          <!-- TODO: Create smaller variants of the hero image -->
          <img
            class="portrait:hidden w-full h-screen object-cover object-[center_top]"
            src="/img/home-page/home_landing_PREP.jpg"
            alt="A human wearing a survival kit"
          />
          <img
            class="landscape:hidden w-full h-screen object-cover object-[center_top]"
            src="/img/home-page/home_landing_PREP_mobile.jpg"
            alt="A human wearing a survival kit"
          />
        </div>

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
          <div class="mt-3 portrait:mx-5 landscape:mt-10">
            <button
              routerLink="/about-us"
              class="px-6 py-3.5 bg-[#588157] uppercase lg:rounded-lg"
              aria-label="Navigate to product page"
            >
              <span
                class="text-white text-base lg:text-lg font-semibold leading-loose"
                >Learn More About Our Mission</span
              >
            </button>
          </div>
        </div>
      </div>

      <div
        id="light-section"
        class="light-section__container portrait:light-section__container--mobile mb-5 bg-white text-orange-700 landscape:flex-row-reverse portrait:flex-col landscape:flex-row-reverse portrait:h-svh portrait:justify-between landscape:p-8"
      >
        <div
          class="flex flex-col justify-center items-center h-[720px] landscape:w-1/2 portrait:w-full"
        >
          <div class="relative w-full h-[350px]">
            <img
              class="z-0 absolute"
              src="/img/home-page/PREP-blob.png"
              alt="todo add relevant alt here"
              style="rotate: 180deg; opacity:0.7;"
            />
            <img
              class="z-10 absolute"
              src="/img/home-page/PREPC-2.png"
              alt="todo add relevant alt here"
              style="height: 350px; left: calc(50% - 135px); top: calc(50% - 175px);"
            />
          </div>
        </div>
        <div class="landscape:w-1/2">
          <div class="portrait:mx-5 flex flex-col">
            <h1
              class="header-fixed-32 text-orange-700 portrait:max-w-[318px] landscape:whitespace-nowrap text-[32px] uppercase text-left lg:text-left text-[32px] lg:text-[64px] font-normal font-gunplay leading-9 lg:leading-[84px]"
            >
              Crafted with Scandinavian
            </h1>
            <p class="my-3">
              ethos of efficiency and reliability, the PREPC is a testament to
              our commitment to emergency readiness. Weighing less than a
              kilogram, this compact case is a powerhouse of preparedness,
              containing 130 meticulously selected articles. From the smallest
              inconvenience to the most critical emergencies, the PREPC ensures
              you have everything you need, wherever you are—be it in your car,
              at home, or on a wilderness adventure.
            </p>
          </div>
          <button
            routerLink="/survival-kit"
            class="px-6 py-3.5 bg-[#c2410c] uppercase lg:rounded-lg portrait:ml-5 portrait:mt-8"
            aria-label="Navigate to product page"
          >
            <span
              class="text-white text-base lg:text-lg font-semibold leading-loose"
              >Discover PREPC</span
            >
          </button>
        </div>
      </div>

      <div
        id="dark-section"
        class="text-white bg-gradient-to-b from-black to-prep-green"
      >
        <div
          class="flex flex-col items-center justify-center landscape:h-[700px]"
        >
          <div class="flex flex-col lg:flex-row landscape:h-[500px]">
            <div class="flex justify-center portrait:mt-8 landscape:w-1/2">
              <img
                src="img/home-page/PREPC-Promise.png"
                alt="todo better alt"
              />
            </div>
            <div class="portrait:mx-5 landscape:w-1/2 portrait:mt-3">
              <h1
                class="header-fixed-32 portrait:max-w-[318px] landscape:whitespace-nowrap text-[32px] uppercase text-left lg:text-left text-[32px] lg:text-[64px] font-normal font-gunplay leading-9 lg:leading-[84px]"
              >
                PREPC is not just a product;
              </h1>
              <p class="my-3">
                it's a promise — a promise of safety, security, and peace of
                mind. Designed for the dynamic Scandinavian lifestyle, it's for
                the households that cherish their peace, the adventurers who
                seek the unknown, and everyone who believes in the power of
                preparedness. With PREPC, you're not just prepared for
                emergencies; you're equipped for life's every adventure.
              </p>
              <button
                routerLink="/survival-kit"
                class="portrait:hidden px-6 py-3.5 bg-[#588157] uppercase lg:rounded-lg portrait:ml-5 portrait:mt-8"
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
        <button
          routerLink="/survival-kit"
          class=" landscape:hidden px-6 py-3.5 bg-[#588157] uppercase lg:rounded-lg portrait:ml-5 portrait:mt-8"
          aria-label="Navigate to product page"
        >
          <span
            class="text-white text-base lg:text-lg font-semibold leading-loose"
            >Shop Now</span
          >
        </button>

        <div class="divider-container portrait:mt-8">
          <hr class="divider-line" />
          <div class="divider-text">Applications</div>
          <hr class="divider-line" />
        </div>

        <div
          class="flex portrait:flex-col landscape:flex-row justify-center h-[380px] h-full p-5"
        >
          <div class="flex flex-col justify-between items-center portrait:mt-8">
            <img
              class="w-24"
              src="/img/home-page/placeholder_info.png"
              alt="todo add alt and real image"
            />
            <h3
              class="whitespace-nowrap header-fixed-20 mt-5 text-white max-w-[318px] lg:max-w-none uppercase text-center lg:text-center portrait:text-[18px] lg:text-[64px] font-normal leading-9 lg:leading-[84px]"
            >
              In Your Home
            </h3>
            <p class="mt-3 text-center">
              From power outages to unexpected injuries, the PREPC ensures your
              home is a fortress of safety and preparedness. Compact yet
              comprehensive, it's the peace of mind every household deserves.
            </p>
          </div>
          <div class="flex flex-col justify-between items-center portrait:mt-8">
            <img
              class="w-24"
              src="/img/home-page/placeholder_info.png"
              alt="todo add alt and real image"
            />
            <h3
              class="whitespace-nowrap header-fixed-20 mt-5 text-white max-w-[318px] lg:max-w-none uppercase text-center lg:text-center portrait:text-[18px] lg:text-[64px] font-normal leading-9 lg:leading-[84px]"
            >
              In Your Car
            </h3>
            <p class="mt-3 text-center">
              Road trips or daily commutes, the PREPC turns your car into a
              mobile safety hub. Whether it's a flat tire or a first aid
              necessity, you're always a step ahead
            </p>
          </div>
          <div class="flex flex-col justify-between items-center portrait:mt-8">
            <img
              class="w-24"
              src="/img/home-page/placeholder_info.png"
              alt="todo add alt and real image"
            />
            <h3
              class="whitespace-nowrap header-fixed-20 mt-5 text-white max-w-[318px] lg:max-w-none uppercase text-center lg:text-center portrait:text-[18px] lg:text-[64px] font-normal leading-9 lg:leading-[84px]"
            >
              Out on Adventure
            </h3>
            <p class="mt-3 text-center">
              Embrace the wild with confidence. The PREPC is your silent
              guardian in the great outdoors, ensuring you're prepared for any
              twist your adventure takes.
            </p>
          </div>
          <div class="flex flex-col justify-between items-center portrait:mt-8">
            <img
              class="w-24"
              src="/img/home-page/placeholder_info.png"
              alt="todo add alt and real image"
            />
            <h3
              class="whitespace-nowrap header-fixed-20 mt-5 text-white max-w-[318px] lg:max-w-none uppercase text-center lg:text-center portrait:text-[18px] lg:text-[64px] font-normal leading-9 lg:leading-[84px]"
            >
              Everyday Preparedness
            </h3>
            <p class="mt-3 text-center">
              Life is unpredictable, but with the PREPC, you're always equipped.
              It's the ultimate companion for the everyday hero, ready for
              whatever the day may bring
            </p>
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
          font-size: 32px;
        }

        .header-fixed-20 {
          font-size: 20px;
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

          &--mobile {
            padding: 20px 0 60px 0;
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
          &--mobile {
            @media screen and (max-width: 600px) {
              bottom: 40px;
              right: 5px;
              left: 5px;
            }
          }

          background: rgba(0, 0, 0, 0.5);
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
    `,
  ],
})
export default class HomePageComponent {}
