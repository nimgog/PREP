import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getFullPageTitle } from '../utils/page-helpers';

// TODO: Fill other metadata
export const routeMeta: RouteMeta = {
  title: getFullPageTitle('Not Found'),
};

// TODO: Style this component
@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="w-full h-full pt-32">
      <div>Page Not Found</div>

      <div>The page you are looking for cannot be found.</div>

      <a routerLink="/">Go Back Home</a>
    </div>
  `,
})
export default class NotFoundPageComponent {}
