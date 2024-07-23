import { ContentFile, injectContentFiles } from '@analogjs/content';
import {
  AfterViewInit,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  inject,
  input,
  runInInjectionContext,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { PageAttributes } from 'src/app/models/blog.model';
import {
  AsyncPipe,
  CommonModule,
  DatePipe,
  NgOptimizedImage,
  TitleCasePipe,
} from '@angular/common';
@Component({
  selector: 'app-blog-interlinking',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    DatePipe,
    NgOptimizedImage,
    TitleCasePipe,
    CommonModule,
  ],
  template: `<div class="analog-markdown" *ngIf="!hide">
    <div class="w-full text-center">
      <hr class="border-2 border-solid" />
      <h3>Read more articles in the same category</h3>
    </div>
    <a [routerLink]="getUrl(allPageFiles[index])">
      <article
        class="flex flex-col md:flex-row gap-x-4 gap-y-2.5 p-5 bg-[#f5f5f5] border-2 border-black rounded-[10px]"
      >
        <div
          class="w-full md:w-[40%] md:mr-5 relative rounded-lg overflow-hidden"
        >
          <img
            class="object-cover"
            [ngSrc]="allPageFiles[index].attributes.thumbnailImageUrl"
            sizes="(max-width: 767px) 80vw, 30vw"
            [alt]="allPageFiles[index].attributes.title"
            fill
          />
        </div>

        <div class="flex flex-col gap-y-2.5 md:w-[60%] p-2.5">
          <header
            class="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-0.5"
          >
            <h2 class="font-bold text-xl text-[#4caf50]">
              {{ allPageFiles[index].attributes.title }}
            </h2>

            <time
              class="text-sm text-gray-400"
              [attr.datetime]="
                allPageFiles[index].attributes.date | date : 'yyyy-MM-dd'
              "
              >{{ allPageFiles[index].attributes.date | date }}</time
            >
          </header>

          <main>
            <p class="text-base text-[#333]">
              {{ allPageFiles[index].attributes.description }}
            </p>
          </main>

          <footer class="grow mt-4">
            <div class="flex justify-end items-end w-full h-full">
              @for (category of getCategories(allPageFiles[index]); track
              category) {
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
    <hr class="border-2 border-solid mt-6" />
  </div>`,
})
export default class BlogInterlinkingComponent implements OnInit, OnDestroy {
  pageSlugsSub!: Subscription;
  hide: boolean = false;
  cornerstoneSlug: string = '';
  currentSupportingPageSlug: string = '';
  allPageFiles: ContentFile<PageAttributes>[] = [];
  private readonly route = inject(ActivatedRoute);
  private readonly injector = inject(Injector);

  readonly pageSlugs$ = this.route.paramMap.pipe(
    map((params) => ({
      cornerstonePageSlug: params.get('cornerstone-slug'),
      supportingPageSlug: params.get('supporting-slug'),
    }))
  );
  index!: number;

  ngOnInit(): void {
    this.pageSlugsSub = this.pageSlugs$.subscribe(
      ({ cornerstonePageSlug, supportingPageSlug }) => {
        if (cornerstonePageSlug) {
          this.cornerstoneSlug = cornerstonePageSlug;
        }

        if (supportingPageSlug) {
          this.currentSupportingPageSlug = supportingPageSlug;
        }
        if (!cornerstonePageSlug || !supportingPageSlug) {
          this.hide = true;
        }

        this.allPageFiles = runInInjectionContext(this.injector, () =>
          injectContentFiles<PageAttributes>(
            (contentFile) =>
              contentFile.filename.startsWith(
                `/src/content/${cornerstonePageSlug}`
              ) && !!contentFile.attributes.published
          )
        );
        this.index = this.getAnotherArticleIndex(this.allPageFiles);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.pageSlugsSub) {
      this.pageSlugsSub.unsubscribe();
    }
  }

  private getAnotherArticleIndex(allPageFiles: ContentFile<PageAttributes>[]): number {
    const currentIndex = allPageFiles.findIndex(file => file.slug === this.currentSupportingPageSlug);

    if (currentIndex === -1) {
      return 0;
    }

    const nextIndex = (currentIndex + 1) % allPageFiles.length;

    return nextIndex;
  }

  getCategories(pageFile: ContentFile<PageAttributes>): string[] {
    return pageFile.filename
      .replace('/src/content/', '')
      .replaceAll('-', ' ')
      .split('/')
      .slice(0, -1);
  }

  getUrl(pageFile: ContentFile<PageAttributes>): string {
    return pageFile.filename
      .replace('/src/content', '/blog')
      .replace('/index.md', '/')
      .replace('.md', '/');
  }
}
