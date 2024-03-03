import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { SsrExcludeDirective } from '../decorators/ssr-exclude.decorator';

// TODO: Fill other metadata
export const routeMeta: RouteMeta = {
  title: 'About Us | PREP',
};

// TODO: HTML semantics
@Component({
  selector: 'app-about-us-page', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [SsrExcludeDirective],
  template: `
    <div class="w-full h-full pt-24 px-4 pb-[72px]">
      <div class="flex flex-col sm:flex-row-reverse">
        <div class="h-[284px]">
          <!-- TODO: Downscale image -->
          <img
            class="h-[284px] object-cover object-[top_center]"
            src="/img/about-us-page/survival-kit.jpg"
            alt="A human wearing a survival kit"
          />
        </div>

        <section class="flex flex-col gap-y-6 pt-10 pb-4">
          <h1
            class="text-gray-700 text-[28px] font-semibold uppercase leading-9"
          >
            Our Purpose
          </h1>

          <p class="text-gray-700 text-sm font-normal leading-normal">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea esse
            atque asperiores similique nostrum quas nulla blanditiis sint optio
            corporis! Eos sint ea officiis delectus vel ipsum ipsam blanditiis
            amet. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea
            esse atque asperiores similique nostrum quas nulla blanditiis sint
            optio corporis! Eos sint ea officiis delectus vel ipsum ipsam
            blanditiis amet.<br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea esse
            atque asperiores similique nostrum quas nulla blanditiis sint optio
            corporis! Eos sint ea officiis delectus vel ipsum ipsam blanditiis
            amet. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea
            esse atque asperiores similique nostrum quas nulla blanditiis sint
            optio corporis! Eos sint ea officiis delectus vel ipsum ipsam
            blanditiis amet.
          </p>
        </section>
      </div>

      <section class="flex flex-col sm:flex-row gap-y-[95px]">
        <div class="flex flex-col gap-y-5">
          <h1 class="text-gray-700 text-2xl font-semibold uppercase leading-9">
            Let's Talk
          </h1>

          <p class="text-gray-700 text-sm font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            esse qui sequi rerum ducimus at libero hic beatae in iste?
          </p>

          <div class="p-2">
            <div
              class="flex flex-col gap-y-8 p-2 rounded border border-gray-700"
            >
              <div>
                <iframe
                  class="w-full h-[168px] lg:h-[282px]"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2254.5468453694803!2d13.006067477125288!3d55.5924959043268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a15b639bc3bf%3A0xd4cf76906ff34ba3!2sKristianstadsgatan%2010%2C%20214%2023%20Malm%C3%B6%2C%20Sv%C3%A9dorsz%C3%A1g!5e0!3m2!1shu!2shu!4v1695578555306!5m2!1shu!2shu"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <p class="text-gray-700 text-sm font-normal leading-tight">
                Shadida Trading Company AB<br />559356-9345<br />Kristianstadsgatan
                10,<br />214 23 Malmö,<br />Sweden
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-y-2">
          <div>
            <div class="text-gray-700 text-base font-medium leading-normal">
              Full Name *
            </div>

            <input class="w-full min-w-0 h-9 bg-white border border-gray-200" />
          </div>

          <div>
            <div class="text-gray-700 text-base font-medium leading-normal">
              Email Address *
            </div>

            <input
              class="w-full min-w-0 h-9 bg-white border border-gray-200"
              type="email"
            />
          </div>

          <div>
            <div class="text-gray-700 text-base font-medium leading-normal">
              Message *
            </div>

            <textarea
              class="w-full min-w-0 h-[106px] bg-white border border-gray-200"
            ></textarea>
          </div>

          <!-- TODO: Add verification -->
          <div *ssrExclude>[TURNSTILE]</div>

          <!-- TODO: Submit logic: form validation, backend request -->
          <div
            class="flex justify-center items-center w-[100px] h-[52px] px-6 py-4 bg-prep-green"
          >
            <button
              class="text-white text-sm font-semibold"
              aria-label="Submit contact form"
            >
              Submit
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
})
export default class AboutUsPageComponent {}
