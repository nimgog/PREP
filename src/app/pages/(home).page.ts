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
            class="w-full h-screen object-cover object-[center_top]"
            src="/img/home-page/hero.jpg"
            alt="A human wearing a survival kit"
          />
        </div>

        <div
          class="absolute landscape:mt-[30vh] gap-y-[30px] lg:max-w-[630px] home-page__text-section--mobile landscape:px-10 lg:px-8 py-[9px] lg:py-4 lg:bg-prep-green lg:bg-opacity-80 rounded-lg"
        >
          <div
            class="portrait:p-3 portrait:mx-5 rounded home-page__text-section--mobile-background"
          >
            <h1
              class="max-w-[318px] lg:max-w-none uppercase text-left lg:text-left text-white text-[32px] lg:text-[64px] font-normal font-gunplay leading-9 lg:leading-[84px]"
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
              routerLink="/survival-kit"
              class="px-6 py-3.5 bg-[#588157] uppercase lg:rounded-lg"
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

      <div
        id="light-section"
        style="height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px 0 60px 0;"
        class="mb-5 bg-white text-orange-700"
      >
        <div
          class="flex flex-col justify-center items-center lg:flex-row-reverse h-[720px]"
          style="height: 350px;"
        >
          <div class="relative w-full" style="height: 350px;">
            <img
              class="z-0 absolute"
              src="/img/home-page/PREP-blob.png"
              alt="todo add relevant alt here"
              style="rotate: 180deg;"
            />
            <img
              class="z-10 absolute"
              src="/img/home-page/PREP-survival-kit.png"
              alt="todo add relevant alt here"
              style="height: 250px; left: calc(50% - 82px); top: calc(50% - 125px);"
            />
          </div>
        </div>
        <div>
          <div class="portrait:ml-5 flex portrait:flex-col">
            <span>
              Crafted with the Scandinavian ethos of efficiency and reliability,
              the PREPC is a testament to our commitment to emergency readiness.
              Weighing less than a kilogram, this compact case is a powerhouse
              of preparedness, containing 130 meticulously selected articles.
              From the smallest inconvenience to the most critical emergencies,
              the PREPC ensures you have everything you need, wherever you
              are—be it in your car, at home, or on a wilderness adventure.
            </span>
          </div>
          <button
            routerLink="/survival-kit"
            class="px-6 py-3.5 bg-[#c2410c] uppercase lg:rounded-lg portrait:ml-5 portrait:mt-8"
            aria-label="Navigate to product page"
          >
            <span
              class="text-white text-base lg:text-lg font-semibold leading-loose"
              >Learn more</span
            >
          </button>
        </div>
      </div>

      <div
        id="dark-section"
        class="text-white bg-gradient-to-b from-black to-prep-green"
      >
        <div class="flex flex-col items-center h-[1200px]">
          <div class="flex flex-col lg:flex-row">
            <div>[BACKPACK DETAILED IMAGE]</div>

            <div>
              <div class="uppercase">
                Lorem ipsum dolor sit amet, consectetur
              </div>

              <div>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Incidunt odio unde similique repellat at, nihil eveniet
                assumenda et blanditiis iure omnis laudantium culpa molestiae
                quos provident aut voluptatem quas illum.
              </div>
            </div>
          </div>

          <div class="flex flex-col justify-center h-[380px]">
            [INFO ROW / SLIDER]
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
        .hero-title-box-portrait {
          margin-top: calc(230px / 683px * 100vh);
        }

        .shop-now-button-box-portrait {
          margin-top: calc(160px / 683px * 100vh);
        }

        .home-page__text-section {
          &--mobile {
            @media screen and (max-width: 600px) {
              top: calc(50% - 240px);
            }
          }

          &--mobile-background {
            @media screen and (max-width: 600px) {
              background: rgba(0, 0, 0, 0.5);
            }
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
    `,
  ],
})
export default class HomePageComponent {}
