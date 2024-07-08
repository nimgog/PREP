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
import {
  AsyncPipe,
  DatePipe,
  NgOptimizedImage,
  TitleCasePipe,
} from '@angular/common';
import { ContentFile, injectContentFiles } from '@analogjs/content';
import { PageAttributes } from 'src/app/models/blog.model';
import { environment } from 'src/environments/environment';
import PaginatorComponent from 'src/app/components/common/paginator.component';

export const routeMeta: RouteMeta = {
  title: getFullPageTitle('All Articles - Blog'),
  meta: createCommonMetaResolver(
    'All Articles - Blog',
    'Browse all of our articles at one place here.'
  ),
};

@Component({
  selector: 'app-blog-article-list-page',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    DatePipe,
    PaginatorComponent,
    NgOptimizedImage,
    TitleCasePipe,
  ],
  template: `
    <div
      class="flex flex-col items-center w-[90%] h-full pt-[100px] pb-5 m-auto"
    >
      <h1 class="text-[2rem]">All Articles</h1>

      @if (pageNumber$ | async; as pageNumber) {
      <app-paginator
        class="my-10"
        resourcePath="/blog/pages"
        [pageNumber]="pageNumber"
        [pageCount]="listPageCount()"
      ></app-paginator>
      }

      <ol class="flex flex-col gap-y-5">
        @for (pageFile of pageFiles$ | async; track pageFile.filename; let i =
        $index) {
        <li>
          <a [routerLink]="getUrl(pageFile)">
            <article
              class="flex flex-col md:flex-row gap-x-4 gap-y-2.5 p-5 bg-[#f5f5f5] border-2 border-black rounded-[10px]"
            >
              <div
                class="w-full h-[200px] md:w-[40%] md:mr-5 relative rounded-lg overflow-hidden"
              >
                <img
                  class="object-cover"
                  [ngSrc]="pageFile.attributes.thumbnailImageUrl"
                  sizes="(max-width: 767px) 80vw, 30vw"
                  [alt]="pageFile.attributes.title"
                  [priority]="i < 2"
                  fill
                />
              </div>

              <div class="flex flex-col gap-y-2.5 md:w-[60%] p-2.5">
                <header
                  class="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-0.5"
                >
                  <h2 class="font-bold text-xl text-[#4caf50]">
                    {{ pageFile.attributes.title }}
                  </h2>

                  <time
                    class="text-sm text-gray-400"
                    [attr.datetime]="
                      pageFile.attributes.date | date : 'yyyy-MM-dd'
                    "
                    >{{ pageFile.attributes.date | date }}</time
                  >
                </header>

                <main>
                  <p class="text-base text-[#333]">
                    {{ pageFile.attributes.description }}
                  </p>
                </main>

                <footer class="grow mt-4">
                  <div class="flex justify-end items-end w-full h-full">
                    @for (category of getCategories(pageFile); track category) {
                    <span
                      class="px-2 py-0.5 text-sm text-[#333] bg-gray-200 rounded-lg"
                      >{{ category | titlecase }}</span
                    >
                    }
                  </div>
                </footer>
              </div>
            </article>
          </a>
        </li>
        }
      </ol>

      @if (pageNumber$ | async; as pageNumber) {
      <app-paginator
        class="my-10"
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

  getUrl(pageFile: ContentFile<PageAttributes>): string {
    return pageFile.filename
      .replace('/src/content', '/blog')
      .replace('/index.md', '/')
      .replace('.md', '/');
  }

  getCategories(pageFile: ContentFile<PageAttributes>): string[] {
    return pageFile.filename
      .replace('/src/content/', '')
      .replaceAll('-', ' ')
      .split('/')
      .slice(0, -1);
  }
}
