import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import MainFooterSocialMediaComponent from './social-media.component';
import MainFooterCompanyInfoComponent from './company-info.component';
import MainFooterLinksComponent from './links.component';
import MainFooterPaymentMethodsComponent from './payment-methods.component';
import MainFooterCopyrightComponent from './copyright.component';

// TODO: Lazy-load all images in the footer (or maybe the whole footer component)
@Component({
  selector: 'app-main-footer',
  standalone: true,
  imports: [
    RouterLink,
    MainFooterSocialMediaComponent,
    MainFooterCompanyInfoComponent,
    MainFooterLinksComponent,
    MainFooterPaymentMethodsComponent,
    MainFooterCopyrightComponent,
  ],
  template: `
    <footer class="flex justify-center px-[26px] bg-prep-green">
      <div class="w-full max-w-centered-content">
        <div class="lg:hidden flex flex-col py-[10px]">
          <app-main-footer-social-media class="mb-[22px]" />
          <app-main-footer-company-info class="mb-7" />
          <app-main-footer-links class="mb-[25px]" />
          <app-main-footer-payment-methods class="mb-[17px]" />
          <app-main-footer-copyright />
        </div>

        <div class="hidden lg:block pt-[65px] pb-[37px]">
          <div class="flex flex-col">
            <div class="flex">
              <div class="flex flex-col">
                <app-main-footer-social-media class="pl-[15px] mb-[29px]" />

                <div class="flex items-center gap-x-[25px]">
                  <app-main-footer-copyright />

                  <span class="text-prep-beige text-base font-normal">|</span>

                  <app-main-footer-links />
                </div>
              </div>

              <div class="grow min-w-[50px] max-w-[212px]"></div>

              <app-main-footer-company-info />
            </div>

            <app-main-footer-payment-methods class="mt-6" />
          </div>
        </div>
      </div>
    </footer>
  `,
})
export default class MainFooterComponent {}
