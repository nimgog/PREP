import { Component } from '@angular/core';

@Component({
  selector: 'app-main-footer-copyright', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  template: `
    <!-- TODO: Logo -->
    <div
      class="text-center text-prep-beige text-xs sm:text-base font-bold font-poppins"
    >
      &copy; {{ currentYear }} LOGO
    </div>
  `,
})
export default class MainFooterCopyrightComponent {
  currentYear = new Date().getFullYear();
}
