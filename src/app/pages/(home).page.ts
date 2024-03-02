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
      <div class="flex flex-col justify-center items-center h-[680px]">
        <div class="sm:max-w-[630px] sm:bg-green-900 sm:bg-opacity-25">
          <div class="uppercase !font-gunplay">
            Are you ready when it happens?
          </div>

          <div class="hidden sm:block">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, optio
            consequatur voluptatibus neque laudantium voluptate quae soluta.
          </div>
        </div>

        <div>
          <button routerLink="/survival-kit" class="uppercase">Shop Now</button>
        </div>
      </div>

      <div id="light-section" class="-mb-5 bg-white text-orange-700">
        <div
          class="flex flex-col justify-center items-center sm:flex-row-reverse h-[720px]"
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
        class="text-white bg-gradient-to-b from-black to-green-900"
      >
        <div class="flex flex-col items-center h-[1200px]">
          <div class="flex flex-col sm:flex-row">
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
      $section-offset: 40px;

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
