import { Component } from '@angular/core';

@Component({
  selector: 'app-main-footer-copyright',
  standalone: true,
  template: `
    <!-- TODO: Logo -->
    <div class="text-center text-prep-beige text-xs lg:text-base font-bold">
      &copy; {{ currentYear }} LOGO
    </div>
  `,
})
export default class MainFooterCopyrightComponent {
  currentYear = new Date().getFullYear();
}
