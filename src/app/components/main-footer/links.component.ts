import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-footer-links', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [RouterLink],
  template: `
    <ul
      class="flex gap-x-2 sm:gap-x-[25px] text-prep-beige text-xs sm:text-base font-normal"
    >
      <!-- TODO: Make this scroll down on the About Us page -->
      <li>
        <a routerLink="/about-us#contact-us">Contact Us</a>
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
