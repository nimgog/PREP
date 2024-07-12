import { Component, input } from '@angular/core';
import { SafePipe } from 'src/app/pipes/safe.pipe';

@Component({
  selector: 'app-product-description',
  standalone: true,
  imports: [SafePipe],
  template: `<p [innerHTML]="htmlDescription() | safe : 'html'"></p>`,
})
export default class ProductDescription {
  readonly htmlDescription = input.required<string>();
}
