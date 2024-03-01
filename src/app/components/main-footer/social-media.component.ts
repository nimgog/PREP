import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-footer-social-media', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [RouterLink],
  template: ` <div>[SOCIAL MEDIA]</div> `,
})
export default class MainFooterSocialMediaComponent {}
