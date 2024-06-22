import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { BlogContentImage } from 'src/app/models/blog.model';

@Component({
  selector: 'app-blog-image',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <div class="flex justify-center pt-8">
      <img
        [ngSrc]="data().src"
        [alt]="data().alt"
        [ngSrcset]="data().srcset"
        [width]="data().width"
        [height]="data().height"
        [fill]="data().fill"
        [priority]="data().priority"
      />
    </div>
  `,
})
export default class BlogImageComponent {
  data = input.required<BlogContentImage>();
}
