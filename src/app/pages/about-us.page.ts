import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import ContactFormComponent from '../components/about-us-page/contact-form.component';

// TODO: Fill other metadata
export const routeMeta: RouteMeta = {
  title: 'About Us | PREP',
};

// TODO: HTML semantics
@Component({
  selector: 'app-about-us-page', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [ContactFormComponent],
  template: `
    <div
      class="flex justify-center w-full h-full pt-24 sm:pt-[182px] px-4 pb-[72px] sm:pb-[283px]"
    >
      <div
        class="flex flex-col items-center gap-y-14 sm:gap-y-[177px] w-full max-w-centered-content h-full"
      >
        <section
          class="flex flex-col sm:flex-row-reverse items-center sm:items-start gap-x-10"
        >
          <div class="sm:w-1/2 h-[284px] sm:h-[420px]">
            <!-- TODO: Downscale image -->
            <img
              class="h-[284px] sm:h-[420px] object-cover object-[top_center]"
              src="/img/about-us-page/survival-kit.jpg"
              alt="A human wearing a survival kit"
            />
          </div>

          <div class="flex flex-col gap-y-6 sm:w-1/2 pt-10 sm:pt-0">
            <h1
              class="text-gray-700 text-[28px] sm:text-3xl font-semibold uppercase leading-9"
            >
              Our Purpose
            </h1>

            <p
              class="text-gray-700 text-sm sm:text-base font-normal leading-normal"
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea esse
              atque asperiores similique nostrum quas nulla blanditiis sint
              optio corporis! Eos sint ea officiis delectus vel ipsum ipsam
              blanditiis amet. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Ea esse atque asperiores similique nostrum quas
              nulla blanditiis sint optio corporis! Eos sint ea officiis
              delectus vel ipsum ipsam blanditiis amet.<br />
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea esse
              atque asperiores similique nostrum quas nulla blanditiis sint
              optio corporis! Eos sint ea officiis delectus vel ipsum ipsam
              blanditiis amet. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Ea esse atque asperiores similique nostrum quas
              nulla blanditiis sint optio corporis! Eos sint ea officiis
              delectus vel ipsum ipsam blanditiis amet.
            </p>
          </div>
        </section>

        <section
          class="flex flex-col sm:flex-row gap-x-[120px] gap-y-[95px] w-full"
        >
          <div class="flex flex-col gap-y-5 w-full max-w-[583px]">
            <h1
              class="text-gray-700 text-2xl sm:text-3xl font-semibold uppercase leading-9"
            >
              Let's Talk
            </h1>

            <p
              class="sm:mb-[34px] text-gray-700 text-sm sm:text-2xl font-normal"
            >
              Do you need something answered? Then reach out we'd love to hear
              about your question and provide help!
            </p>

            <div class="w-full max-w-[484px] p-2 bg-gray-50 rounded">
              <div
                class="flex flex-col sm:flex-row gap-8 p-2 bg-white rounded border border-gray-700"
              >
                <div class="sm:w-1/2">
                  <iframe
                    class="w-full h-[168px] sm:h-[282px]"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2254.5468453694803!2d13.006067477125288!3d55.5924959043268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a15b639bc3bf%3A0xd4cf76906ff34ba3!2sKristianstadsgatan%2010%2C%20214%2023%20Malm%C3%B6%2C%20Sv%C3%A9dorsz%C3%A1g!5e0!3m2!1shu!2shu!4v1695578555306!5m2!1shu!2shu"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <div class="flex sm:items-center sm:w-1/2">
                  <p
                    class="text-gray-700 text-sm sm:text-base font-normal leading-tight sm:leading-normal"
                  >
                    Shadida Trading Company AB<br />559356-9345<br />Kristianstadsgatan
                    10,<br />214 23 Malmö,<br />Sweden
                  </p>
                </div>
              </div>
            </div>
          </div>

          <app-contact-form class="w-full" />
        </section>
      </div>
    </div>
  `,
})
export default class AboutUsPageComponent {}
