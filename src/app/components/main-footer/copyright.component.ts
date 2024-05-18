import { Component } from '@angular/core';
import LogoComponent from '../common/logo.component';

@Component({
  selector: 'app-main-footer-copyright',
  standalone: true,
  imports: [LogoComponent],
  template: `
    <div
      class="text-center text-prep-beige text-xs lg:text-base font-bold whitespace-nowrap portrait:flex portrait:justify-center"
    >
      <app-logo />
    </div>
  `,
})
export default class MainFooterCopyrightComponent {
  currentYear = new Date().getFullYear();
}
