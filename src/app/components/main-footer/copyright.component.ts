import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-footer-copyright',
  standalone: true,
  providers:[RouterLink],
  template: `
    <!-- TODO: Logo -->
    <div class="text-center text-prep-beige text-xs lg:text-base font-bold whitespace-nowrap portrait:flex portrait:justify-center">
      <a routerLink="/">
        <img class="w-[100px]" src="/img/main-header/PREP_logo.png" alt="" />
      </a>
    </div>
  `,
})
export default class MainFooterCopyrightComponent {
  currentYear = new Date().getFullYear();
}
