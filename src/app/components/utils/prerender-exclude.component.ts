import { Component } from '@angular/core';

@Component({
  selector: 'app-prerender-exclude', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  template: `
    <div class="hidden prerender-exclude-begin"></div>
    <ng-content></ng-content>
    <div class="hidden prerender-exclude-end"></div>
  `,
})
export default class PrerenderExcludeComponent {}
