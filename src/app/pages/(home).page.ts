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
          class="portrait:hero-title-box-portrait landscape:mt-[30vh] gap-y-[30px] lg:max-w-[630px] px-10 lg:px-8 py-[9px] lg:py-4 lg:bg-prep-green lg:bg-opacity-80 rounded-lg"
        >
          <h1
            class="max-w-[318px] lg:max-w-none uppercase text-center lg:text-left text-white text-[32px] lg:text-[64px] font-normal font-gunplay leading-9 lg:leading-[84px]"
          >
            Are you ready when it happens?
          </h1>

          <p
            class="hidden lg:block text-prep-beige text-base font-normal leading-loose"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, optio
            consequatur voluptatibus neque laudantium voluptate quae soluta.
          </p>
        </div>

        <div class="portrait:shop-now-button-box-portrait landscape:mt-10">
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

      <div id="light-section" class="-mb-5 bg-white text-orange-700">
        <div
          class="flex flex-col justify-center items-center lg:flex-row-reverse h-[720px]"
        >
          <div>[BACKPACK IMAGE]</div>

          <div>
            <div class="uppercase">Lorem ipsum dolor sit amet, consectetur</div>

            <div>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
              odio unde similique repellat at, nihil eveniet assumenda et
              blanditiis iure omnis laudantium culpa molestiae quos provident
              aut voluptatem quas illum.
            </div>
          </div>
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
