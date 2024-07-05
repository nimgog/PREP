import {
  ContentFile,
  injectContent,
  injectContentFiles,
} from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import {
  Component,
  Injector,
  OnDestroy,
  OnInit,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, map, take } from 'rxjs';
import {
  CornerstonePageAttributes,
  PageAttributes,
  SupportingPageAttributes,
} from 'src/app/models/blog.model';
import { metaResolver, titleResolver } from './resolvers';
import BlogContentComponent from 'src/app/components/blog/blog-content.component';
import BreadcrumbComponent from 'src/app/components/common/breadcrumb.component';
import BlogReadMoreComponent from 'src/app/components/blog/blog-read-more.component';

export const routeMeta: RouteMeta = {
  title: titleResolver,
  meta: metaResolver,
};

const MAX_RELATED_SUPPORTING_PAGES = 4;

// TODO: Style this component
@Component({
  selector: 'app-supporting-page',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    BlogContentComponent,
    NgOptimizedImage,
    BreadcrumbComponent,
    BlogReadMoreComponent,
  ],
  template: `
    <div
      class="flex flex-col items-center gap-y-4 w-full h-full pt-[100px] pb-10 m-auto"
    >
      @if (cornerstonePageFile && supportingPageFile) {
      <app-breadcrumb
        class="max-w-[90%]"
        basePath="/blog"
        baseTitle="Becoming Prepared"
        [nestedTitles]="[
          cornerstonePageFile.attributes.title,
          supportingPageFile.attributes.title
        ]"
      ></app-breadcrumb>

      <h1 class="mt-8 font-medium text-2xl text-center">
        {{ supportingPageFile.attributes.title }}
      </h1>

      <!-- TODO: Internationalize the date, just pass a locale to it -->
      <div>
        <p>{{ supportingPageFile.attributes.date | date }} | by N Johansson</p>

        <hr />
      </div>

      @if(contentText()) {
      <app-blog-content [contentText]="contentText()!" />
      } @if (relatedSupportingPageFiles.length) {
      <div class="flex flex-col items-center gap-y-4 w-full">
        <p>Articles you might also like:</p>

        <app-blog-read-more
          class="max-w-[90%]"
          [pageFiles]="relatedSupportingPageFiles"
          pathPrefix="../"
        ></app-blog-read-more>
      </div>
      } }
    </div>
  `,
})
export default class SupportingPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);

  readonly pageSlugs$ = this.route.paramMap.pipe(
    map((params) => ({
      cornerstonePageSlug: params.get('cornerstone-slug'),
      supportingPageSlug: params.get('supporting-slug'),
    }))
  );

  private pageSlugsSub?: Subscription;

  cornerstonePageFile?: ContentFile<CornerstonePageAttributes>;
  supportingPageFile?: ContentFile<SupportingPageAttributes>;
  relatedSupportingPageFiles: ContentFile<SupportingPageAttributes>[] = [];
  contentText = signal<string | null>(null);

  ngOnInit(): void {
    this.pageSlugsSub = this.pageSlugs$.subscribe(
      ({ cornerstonePageSlug, supportingPageSlug }) => {
        if (!cornerstonePageSlug || !supportingPageSlug) {
          this.router.navigate(['/not-found'], { replaceUrl: true });
          return;
        }

        const allPageFiles = runInInjectionContext(this.injector, () =>
          injectContentFiles<PageAttributes>(
            (contentFile) =>
              contentFile.filename.startsWith(
                `/src/content/${cornerstonePageSlug}`
              ) && !!contentFile.attributes.published
          )
        );

        const cornerstonePageFile = allPageFiles.find(
          (pageFile) =>
            pageFile.filename === `/src/content/${cornerstonePageSlug}/index.md`
        ) as ContentFile<CornerstonePageAttributes> | undefined;

        if (!cornerstonePageFile) {
          this.router.navigate(['/not-found'], { replaceUrl: true });
          return;
        }

        this.cornerstonePageFile = cornerstonePageFile;

        const supportingPageFiles = allPageFiles.filter(
          (pageFile) => pageFile.filename !== cornerstonePageFile.filename
        ) as ContentFile<SupportingPageAttributes>[];

        const supportingPageFile = supportingPageFiles.find(
          (pageFile) => pageFile.slug === supportingPageSlug
        );

        if (!supportingPageFile) {
          this.router.navigate(['/not-found'], { replaceUrl: true });
          return;
        }

        this.supportingPageFile = supportingPageFile;

        runInInjectionContext(this.injector, () =>
          injectContent<Record<string, any>>({
            customFilename: `${cornerstonePageSlug}/${supportingPageSlug}`,
          })
            .pipe(take(1))
            .subscribe((pageFile) =>
              this.contentText.set(pageFile.content?.toString() || null)
            )
        );

        this.selectRelatedSupportingPageFiles(
          supportingPageFiles,
          supportingPageFile.filename
        );
      }
    );
  }

  private selectRelatedSupportingPageFiles(
    supportingPageFiles: ContentFile<SupportingPageAttributes>[],
    supportingPageFileName: string
  ) {
    if (supportingPageFileName.length < 2) {
      return;
    }

    const supportingPageFileIndex = supportingPageFiles.findIndex(
      (pageFile) => pageFile.filename === supportingPageFileName
    );

    const relatedSupportingPageFiles: ContentFile<SupportingPageAttributes>[] =
      [];

    let fileIndex = supportingPageFileIndex + 1;

    while (
      relatedSupportingPageFiles.length <
      MAX_RELATED_SUPPORTING_PAGES / 2
    ) {
      if (fileIndex >= supportingPageFiles.length) {
        fileIndex = 0;
      }

      relatedSupportingPageFiles.push(supportingPageFiles[fileIndex]);
      fileIndex++;
    }

    fileIndex = supportingPageFileIndex - 1;

    while (relatedSupportingPageFiles.length < MAX_RELATED_SUPPORTING_PAGES) {
      if (fileIndex < 0) {
        fileIndex = supportingPageFiles.length - 1;
      }

      relatedSupportingPageFiles.push(supportingPageFiles[fileIndex]);
      fileIndex--;
    }

    this.relatedSupportingPageFiles = [
      ...new Set(
        relatedSupportingPageFiles
          .filter((pageFile) => pageFile.filename !== supportingPageFileName)
          .sort((a, b) => a.filename.localeCompare(b.filename))
      ),
    ];
  }

  ngOnDestroy(): void {
    this.pageSlugsSub?.unsubscribe();
  }
}
