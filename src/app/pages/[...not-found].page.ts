import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="pt-32">
      <h2>Page Not Found</h2>

      <a routerLink="/">Go Back Home</a>
    </div>
  `,
})
export default class NotFoundPageComponent {}
