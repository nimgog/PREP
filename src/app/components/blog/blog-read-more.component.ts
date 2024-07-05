import { ContentFile } from '@analogjs/content';
import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageAttributes } from 'src/app/models/blog.model';

@Component({
  selector: 'app-blog-read-more',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <ul class="flex flex-col gap-y-2">
      @for (pageFile of pageFiles(); track pageFile.slug) {
      <li class="flex gap-x-2 items-center">
        <img
          class="shrink-0 w-40 h-20 object-cover object-center"
          [ngSrc]="pageFile.attributes.thumbnailImageUrl"
          [alt]="pageFile.attributes.title"
          width="160"
          height="80"
        />

        <a
          [class]="
            'text-prep-green font-semibold line-clamp-3 ' + anchorClasses()
          "
          [routerLink]="[pathPrefix() + pageFile.slug]"
          >{{ pageFile.attributes.title }}</a
        >
      </li>
      }
    </ul>
  `,
})
export default class BlogReadMoreComponent {
  pageFiles = input<ContentFile<PageAttributes>[]>([]);
  pathPrefix = input.required<string>();
  anchorClasses = input<string>('');
}
