import { Component } from '@angular/core';

@Component({
  selector: 'app-main-footer-social-media', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  template: `
    <div class="flex items-center gap-x-[30px]">
      <span class="uppercase text-prep-beige text-base font-bold"
        >Follow Us</span
      >

      <!-- TODO: Fill in social media links -->
      <div class="flex gap-x-[15px]">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src="/img/main-footer/social/twitter.svg"
            alt="Twitter"
            width="24"
            height="24"
          />
        </a>

        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src="/img/main-footer/social/instagram.svg"
            alt="Instagram"
            width="24"
            height="24"
          />
        </a>

        <a href="#" target="_blank" rel="noopener noreferrer">
          <img
            src="/img/main-footer/social/youtube.svg"
            alt="YouTube"
            width="24"
            height="24"
          />
        </a>
      </div>
    </div>
  `,
})
export default class MainFooterSocialMediaComponent {}
