import { Component } from '@angular/core';

@Component({
  selector: 'app-prerender-exclude', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  template: `<ng-content></ng-content>`,
})
export default class PrerenderExcludeComponent {}
