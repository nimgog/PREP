import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-footer-copyright', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [RouterLink],
  template: ` <div>[COPYRIGHT]</div> `,
})
export default class MainFooterCopyrightComponent {}
