import { Component } from '@angular/core';

@Component({
  selector: 'app-prerender-exclude', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  template: `
    <div class="hidden prerender-exclude-begin"></div>
    <div class="w-full h-full">
      <ng-content></ng-content>
    </div>
    <div class="hidden prerender-exclude-end"></div>
  `,
})
export default class PrerenderExcludeComponent {}
