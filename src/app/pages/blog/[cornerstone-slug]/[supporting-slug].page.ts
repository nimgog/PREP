import {
  ContentFile,
  injectContent,
  injectContentFiles,
} from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { DatePipe } from '@angular/common';
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

export const routeMeta: RouteMeta = {
  title: titleResolver,
  meta: metaResolver,
};

const MAX_RELATED_SUPPORTING_PAGES = 4;

// TODO: Style this component
@Component({
  selector: 'app-supporting-page',
  standalone: true,
  imports: [RouterLink, DatePipe, BlogContentComponent],
  template: `
    <div class="flex flex-col items-center gap-y-4 w-full h-full pt-32">
      @if (cornerstonePageFile && supportingPageFile) {
      <p>
        <a class="text-prep-green font-semibold" routerLink="/blog"
          >Becoming Prepared</a
        >
        &gt;
        <a class="text-prep-green font-semibold" [routerLink]="['..']">{{
          cornerstonePageFile.attributes.title
        }}</a>
        &gt; {{ supportingPageFile.attributes.title }}
      </p>

      <h1 class="font-medium text-2xl">
        {{ supportingPageFile.attributes.title }}
      </h1>

      <!-- TODO: Internationalize the date, just pass a locale to it -->
      <div>
        <p>{{ supportingPageFile.attributes.date | date }} | by N Johansson</p>

        <hr />
      </div>

      <p>
        Check out our product:
        <a class="text-prep-green font-bold" routerLink="/survival-kit"
          >Survival Kit</a
        >
      </p>

      @if(contentText()) {
      <app-blog-content [contentText]="contentText()!" />
      } @if (relatedSupportingPageFiles.length) {
      <p>Articles you might also like:</p>

      <ul class="flex flex-col gap-y-2">
        @for (relatedPageFile of relatedSupportingPageFiles; track
        relatedPageFile.slug) {
        <li class="flex items-center">
          <img
            class="w-40 h-20 object-cover"
            [src]="relatedPageFile.attributes.thumbnailImageUrl"
            [alt]="relatedPageFile.attributes.title"
          />

          <a
            class="text-prep-green font-medium"
            [routerLink]="['../' + relatedPageFile.slug]"
            >{{ relatedPageFile.attributes.title }}</a
          >
        </li>
        }
      </ul>
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
