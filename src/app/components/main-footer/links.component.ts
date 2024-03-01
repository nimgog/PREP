import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-footer-links', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [RouterLink],
  template: ` <div>[LINKS]</div> `,
})
export default class MainFooterLinksComponent {}
