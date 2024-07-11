import { Component } from '@angular/core';
import SurvivalKitComponent, {
  sharedRouteMeta,
} from 'src/app/components/shop/survival-kit.component';

export const routeMeta = sharedRouteMeta;

@Component({
  selector: 'app-survival-kit-new-page',
  standalone: true,
  imports: [SurvivalKitComponent],
  template: `<app-survival-kit></app-survival-kit>`,
})
export default class SurvivalKitNewPageComponent {}
