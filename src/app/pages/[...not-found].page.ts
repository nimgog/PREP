import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getFullPageTitle } from '../utils/page-helpers';
import { createCommonMetaResolver } from '../utils/open-graph-helpers';
import { TranslocoPipe } from '@jsverse/transloco';

export const routeMeta: RouteMeta = {
  title: getFullPageTitle('Not Found'),
  meta: createCommonMetaResolver(
    'Page Not Found',
    'Oops! The page you’re looking for can’t be found. Visit our homepage for survival kits and emergency preparedness solutions.'
  ),
};

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink, TranslocoPipe],
  template: `
    <div class="w-full h-full pt-32">
      <div>{{ 'not-found-page-title' | transloco }}</div>

      <div>{{ 'not-found-page-description' | transloco }}</div>

      <a routerLink="/">{{ 'not-found-page-button' | transloco }}</a>
    </div>
  `,
})
export default class NotFoundPageComponent {}
