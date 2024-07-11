import { Component } from '@angular/core';
import BlogArticleListComponent, {
  sharedRouteMeta,
} from 'src/app/components/blog/blog-article-list.component';

export const routeMeta = sharedRouteMeta;

@Component({
  selector: 'app-blog-article-list-fallback-page',
  standalone: true,
  imports: [BlogArticleListComponent],
  template: `<app-blog-article-list></app-blog-article-list>`,
})
export default class BlogArticleListFallbackPageComponent {}
