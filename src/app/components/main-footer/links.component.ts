import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-footer-links',
  standalone: true,
  imports: [RouterLink],
  template: `
    <ul
      class="flex gap-x-2 lg:gap-x-[25px] text-prep-beige text-xs lg:text-base font-normal"
    >
      <li>
        <a routerLink="/about-us" fragment="contact">Contact Us</a>
      </li>

      <!-- TODO: Create policies -->
      <li>
        <a href="/assets/docs/PrivacyPolicy.pdf" target="_blank"
          >Privacy Policy</a
        >
      </li>

      <li>
        <a href="/assets/docs/TermsAndConditions.pdf" target="_blank"
          >Terms And Conditions</a
        >
      </li>
    </ul>
  `,
})
export default class MainFooterLinksComponent {}
