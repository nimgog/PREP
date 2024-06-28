import { RouteMeta } from '@analogjs/router';
import {
  Component,
  Injector,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { getFullPageTitle } from 'src/app/utils/page-helpers';
import { createCommonMetaResolver } from 'src/app/utils/open-graph-helpers';
import { map, of, switchMap } from 'rxjs';
import { AsyncPipe, DatePipe, NgOptimizedImage } from '@angular/common';
import { injectContentFiles } from '@analogjs/content';
import { PageAttributes } from 'src/app/models/blog.model';
import { environment } from 'src/environments/environment';
import PaginatorComponent from 'src/app/components/common/paginator.component';

export const routeMeta: RouteMeta = {
  title: getFullPageTitle('Blog'),
  meta: createCommonMetaResolver(
    'Blog - All Articles',
    'Browse all of our articles at one place here.'
  ),
};

// TODO: Style this component
@Component({
  selector: 'app-blog-article-list-page',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    DatePipe,
    PaginatorComponent,
    NgOptimizedImage,
  ],
  template: `
    <div class="flex flex-col items-center w-full h-full pt-32">
      <h1>Blog</h1>

      <ol class="flex flex-col gap-y-8 py-8">
        @for (pageFile of pageFiles$ | async; track pageFile.filename) {
        <li>
          <article class="flex flex-col sm:flex-row items-center gap-x-4">
            <div
              class="shrink-0 w-full h-48 sm:w-40 sm:h-20 relative overflow-hidden"
            >
              <img
                class="w-full h-48 sm:w-40 sm:h-20 object-cover object-center"
                [ngSrc]="pageFile.attributes.thumbnailImageUrl"
                [alt]="pageFile.attributes.title"
                sizes="(max-width: 639px) 100vw, (max-width: 767px) 30vw, 20vw"
                [priority]="true"
                fill
              />
            </div>

            <div class="flex flex-col gap-y-2 max-w-4xl">
              <header class="flex flex-col sm:flex-row gap-x-4">
                <h2>
                  <a
                    [routerLink]="
                      pageFile.filename
                        .replace('/src/content', '/blog')
                        .replace('/index.md', '/')
                        .replace('.md', '/')
                    "
                    >{{ pageFile.attributes.title }}</a
                  >
                </h2>

                <time
                  [attr.datetime]="
                    pageFile.attributes.date | date : 'yyyy-MM-dd'
                  "
                  >{{ pageFile.attributes.date | date }}</time
                >
              </header>

              <main>
                <p>{{ pageFile.attributes.description }}</p>
              </main>
            </div>
          </article>
        </li>
        }
      </ol>

      @if (pageNumber$ | async; as pageNumber) {
      <app-paginator
        resourcePath="/blog/pages"
        [pageNumber]="pageNumber"
        [pageCount]="listPageCount()"
      ></app-paginator>
      }
    </div>
  `,
})
export default class BlogArticleListPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);

  readonly listPageCount = signal(0);

  readonly pageNumber$ = this.route.paramMap.pipe(
    map((params) => +(params.get('page-number') || 0))
  );

  readonly pageFiles$ = this.pageNumber$.pipe(
    switchMap((pageNumber) => {
      if (pageNumber < 1) {
        this.router.navigate(['/not-found'], { replaceUrl: true });
        return of([]);
      }

      const allPageFiles = runInInjectionContext(this.injector, () =>
        injectContentFiles<PageAttributes>(
          (contentFile) =>
            contentFile.filename.startsWith(`/src/content`) &&
            !!contentFile.attributes.published
        )
      );

      const listPageCount = Math.ceil(
        allPageFiles.length / environment.blogArticleListPageSize
      );

      if (pageNumber > listPageCount) {
        this.router.navigate(['/not-found'], { replaceUrl: true });
        return of([]);
      }

      this.listPageCount.set(listPageCount);

      const startFileIndex =
        (pageNumber - 1) * environment.blogArticleListPageSize;
      const endFileIndex = startFileIndex + environment.blogArticleListPageSize;

      const pageFilesByDateDesc = allPageFiles.sort(
        (a, b) =>
          new Date(b.attributes.date || 0).getTime() -
          new Date(a.attributes.date || 0).getTime()
      );

      return of(pageFilesByDateDesc.slice(startFileIndex, endFileIndex));
    })
  );
}
