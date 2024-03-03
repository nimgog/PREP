import { Component } from '@angular/core';

@Component({
  selector: 'app-prerender-exclude', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  template: `
    <!-- __prerender_exclude_begin -->
    <ng-content></ng-content>
    <!-- __prerender_exclude_end -->
  `,
})
export default class PrerenderExcludeComponent {}
