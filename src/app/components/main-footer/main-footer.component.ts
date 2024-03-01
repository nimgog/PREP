import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import MainFooterSocialMediaComponent from './social-media.component';
import MainFooterCompanyInfoComponent from './company-info.component';
import MainFooterLinksComponent from './links.component';
import MainFooterPaymentMethodsComponent from './payment-methods.component';
import MainFooterCopyrightComponent from './copyright.component';

@Component({
  selector: 'app-main-footer', // TODO: Remove when dev team fixes auto selector generation
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
    <footer class="text-white">
      <div class="sm:hidden flex flex-col">
        <app-main-footer-social-media />
        <app-main-footer-company-info />
        <app-main-footer-links />
        <app-main-footer-payment-methods />
        <app-main-footer-copyright />
      </div>

      <div class="hidden sm:block">
        <div class="flex flex-col">
          <div class="flex">
            <div class="flex flex-col">
              <app-main-footer-social-media />

              <div class="flex">
                <app-main-footer-copyright />
                <app-main-footer-links />
              </div>
            </div>

            <app-main-footer-company-info />
          </div>

          <app-main-footer-payment-methods />
        </div>
      </div>
    </footer>
  `,
})
export default class MainFooterComponent {}
