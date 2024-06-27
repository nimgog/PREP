import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogContentOptimonkEmbedd } from 'src/app/models/blog.model';

@Component({
  selector: 'app-blog-optimonk-prepper-checklist',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  template: ` <div class="om-embedded-campaign" [attr.data-campaign-id]="data().id"></div> `,
})
export default class BlogOptimonkPrepperChecklistComponent {
  readonly data = input.required<BlogContentOptimonkEmbedd>();
}
