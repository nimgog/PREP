import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import ContactFormComponent from '../components/about-us-page/contact-form.component';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { getFullPageTitle } from '../utils/page-helpers';

// TODO: Fill other metadata
export const routeMeta: RouteMeta = {
  title: getFullPageTitle('About Us'),
};

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [ContactFormComponent, RouterLink, NgOptimizedImage],
  template: `
    <div
      class="flex justify-center w-full h-full pt-24 lg:pt-[182px] px-4 pb-[72px] lg:pb-[283px]"
    >
      <div
        class="flex flex-col items-center gap-y-14 lg:gap-y-[177px] w-full max-w-centered-content h-full"
      >
        <section
          class="flex flex-col lg:flex-row-reverse items-center lg:items-start gap-x-10"
        >
          <div class="lg:w-1/2 h-[284px] lg:h-[420px] lg:mt-10">
            <img
              class="h-[284px] lg:h-[420px] object-cover object-[top_center]"
              ngSrc="/img/about-us-page/about_us.jpg"
              alt="A person wearing a survival kit in a forested area"
              width="580"
              height="386"
              priority
            />
            <button
              routerLink="/survival-kit"
              class="w-fit px-6 py-3.5 bg-[#588157] uppercase mt-6"
              aria-label="Navigate to product page"
            >
              <span
                class="text-white text-base lg:text-lg font-semibold leading-loose"
                >Shop Now</span
              >
            </button>
          </div>
          <div class="flex flex-col lg:w-1/2 portrait:mt-16">
            <div class="flex flex-col gap-y-6 pt-10 ">
              <h1
                class="text-gray-700 text-[28px] lg:text-3xl font-semibold uppercase leading-9"
              >
                Our Story:
              </h1>

              <p
                class="text-gray-700 text-sm lg:text-base font-normal leading-normal"
              >
                At PREP - Preparedness Readiness Emergency Provisioning, our
                journey began with a simple yet profound realization: in the
                face of emergencies, preparedness is our most reliable ally.
                Born from the rugged landscapes and resilient spirit of
                Scandinavia, our mission is to empower households and nature
                enthusiasts with the tools and knowledge to face any challenge
                with confidence. We believe in a world where everyone is
                equipped to handle the unexpected, turning potential crises into
                manageable situations.
              </p>
            </div>
            <div class="flex flex-col gap-y-6  pt-10 ">
              <h1
                class="text-gray-700 text-[28px] lg:text-3xl font-semibold uppercase leading-9"
              >
                Our Mission:
              </h1>

              <p
                class="text-gray-700 text-sm lg:text-base font-normal leading-normal"
              >
                To redefine emergency preparedness, making it accessible,
                practical, and an integral part of every Scandinavian home and
                adventure. We're not just selling a product; we're fostering a
                community of readiness, where being prepared is a lifestyle
                embraced by all. Through innovation, education, and dedication,
                we aim to ensure that when emergencies arise, the PREP community
                stands tall, ready, and resilient.
              </p>
            </div>
            <div class="flex flex-col gap-y-6 pt-10 ">
              <h1
                class="text-gray-700 text-[28px] lg:text-3xl font-semibold uppercase leading-9"
              >
                Our Promise:
              </h1>

              <p
                class="text-gray-700 text-sm lg:text-base font-normal leading-normal"
              >
                With every PREPC case, we pledge unwavering quality,
                reliability, and functionality. We're committed to providing
                solutions that are not only effective but also sustainable and
                ethical. Our vision is a future where preparedness is synonymous
                with peace of mind, and with PREP, that future is already here.
              </p>
            </div>
          </div>
        </section>

        <section
          class="flex flex-col lg:flex-row gap-x-[120px] gap-y-[95px] w-full"
        >
          <div class="flex flex-col gap-y-5 w-full max-w-[583px]">
            <h1
              class="text-gray-700 text-2xl lg:text-3xl font-semibold uppercase leading-9"
            >
              Let's Talk
            </h1>

            <p
              class="lg:mb-[34px] text-gray-700 text-sm lg:text-2xl font-normal"
            >
              Do you need something answered? Then reach out we'd love to hear
              about your question and provide help!
            </p>

            <div class="w-full max-w-[484px] p-2 bg-gray-50 rounded">
              <div
                class="flex flex-col lg:flex-row gap-8 p-2 bg-white rounded border border-gray-700"
              >
                <div class="lg:w-1/2">
                  <iframe
                    class="w-full h-[168px] lg:h-[282px]"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2254.5468453694803!2d13.006067477125288!3d55.5924959043268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a15b639bc3bf%3A0xd4cf76906ff34ba3!2sKristianstadsgatan%2010%2C%20214%2023%20Malm%C3%B6%2C%20Sv%C3%A9dorsz%C3%A1g!5e0!3m2!1shu!2shu!4v1695578555306!5m2!1shu!2shu"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <div class="flex lg:items-center lg:w-1/2">
                  <p
                    class="text-gray-700 text-sm lg:text-base font-normal leading-tight lg:leading-normal"
                  >
                    Shadida Trading Company AB<br />559356-9345<br />Kristianstadsgatan
                    10,<br />214 23 Malmö,<br />Sweden
                  </p>
                </div>
              </div>
            </div>
          </div>

          <app-contact-form id="contact" class="w-full" />
        </section>
      </div>
    </div>
  `,
})
export default class AboutUsPageComponent {}
