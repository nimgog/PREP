import {
  ContentFile,
  MarkdownComponent,
  injectContent,
  injectContentFiles,
} from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
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
import { ContextService } from 'src/app/services/context.service';
import BlogContentComponent from 'src/app/components/blog/blog-content.component';

export const routeMeta: RouteMeta = {
  title: titleResolver,
  meta: metaResolver,
};

// TODO: Style this component
@Component({
  selector: 'app-cornerstone-page',
  standalone: true,
  imports: [
    MarkdownComponent,
    RouterLink,
    DatePipe,
    CommonModule,
    BlogContentComponent,
  ],
  template: `
    <div class="flex flex-col items-center gap-y-4 w-full h-full pt-32">
      @if (cornerstonePageFile) {
      <p>
        <a class="text-prep-green font-semibold" routerLink="/blog"
          >Becoming Prepared</a
        >
        &gt; {{ cornerstonePageFile.attributes.title }}
      </p>

      <h1 class="font-medium text-2xl">
        {{ cornerstonePageFile.attributes.title }}
      </h1>

      <!-- TODO: Internationalize the date, just pass a locale to it -->
      <div>
        <p>{{ cornerstonePageFile.attributes.date | date }} | by N Johansson</p>

        <hr />
      </div>

      @if (contentText()) {
      <app-blog-content [contentText]="contentText()!" />
      } @if (supportingPageFiles.length) {
      <div
        class="more-articles"
        [ngClass]="{
          hidden: otherContainerVisible,
          mobile: isMobile,
          'more-articles--expanded': expanded
        }"
        (click)="toggleExpansion()"
      >
        <p class="mr-3 mb-3 font-bold">Read more about {{ cornerstonePageFile.attributes.title }}</p>
        <ul class="flex flex-col gap-y-2">
          @for (supportingPageFile of supportingPageFiles; track
          supportingPageFile.slug) {
          <li class="flex items-center">
            <img
              class="w-40 h-20 object-cover"
              [src]="supportingPageFile.attributes.thumbnailImageUrl"
              [alt]="supportingPageFile.attributes.title"
            />

            <div class="max-w-[200px] whitespace-normal p-3 overflow-auto">
              <a
                class="text-prep-green font-semibold text-ellipsis	"
                [routerLink]="['./' + supportingPageFile.slug]"
                >{{ supportingPageFile.attributes.title }}</a
              >
            </div>
          </li>
          }
        </ul>
        <span class="chevron" [class.rotated]="expanded"></span>
      </div>

      <div class="other-container p-3 border-t-2 border-solid border-black">
        <p class="mr-3 mb-3 font-bold">Read more about {{ cornerstonePageFile.attributes.title }}</p>

        <ul class="flex flex-col gap-y-2">
          @for (supportingPageFile of supportingPageFiles; track
          supportingPageFile.slug) {
          <li class="flex items-center">
            <img
              class="w-40 h-20 object-cover"
              [src]="supportingPageFile.attributes.thumbnailImageUrl"
              [alt]="supportingPageFile.attributes.title"
            />
            <div class="max-w-[200px] whitespace-normal p-3 overflow-auto">
              <a
                class="text-prep-green font-semibold text-ellipsis	"
                [routerLink]="['./' + supportingPageFile.slug]"
                >{{ supportingPageFile.attributes.title }}</a
              >
            </div>
          </li>
          }
        </ul>
      </div>
      } }
    </div>
  `,
  styles: [
    `
      .more-articles {
        position: fixed;
        right: 0;
        background: white;
        padding: 2rem;
        border-top: 2px solid black;
        border-radius: 8px 0 0 8px;
        border-left: 2px solid black;
        border-bottom: 2px solid black;
        transition: transform 0.3s ease-in-out;

        &--expanded {
          transform: translateX(0) !important; /* Slide up to full view */
        }
      }

      /* Expanded for large screens */
      @media (min-width: 1700px) {
        .more-articles {
          transform: translateX(0);
        }
      }

      /* Collapsed for smaller screens */
      @media (max-width: 1699px) {
        .more-articles {
          transform: translateX(calc(100% - 20px)); /* Slightly visible */
        }
      }

      .more-articles.mobile {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        transform: translateY(
          calc(100% - 40px)
        ); /* Shows a peek to prompt interaction */
        transition: transform 0.3s ease-in-out;
        border-top: 2px solid black; /* Consistent with the design on larger screens */
      }

      .more-articles.mobile.expanded {
        transform: translateY(0); /* Slide up to full view */
      }

      .more-articles::before {
        content: 'You might also like';
        position: fixed;
        left: -25px;
        bottom: calc(50% - 20px);
        transform: translateX(-50%) rotate(90deg);
        transition: transform 0.3s ease-in-out;
        background: white;
        padding: 5px;
        border: 2px solid black;
        border-radius: 8px;
        cursor: pointer;
      }

      .chevron.rotated {
        transform: rotate(180deg);
      }

      /* Mobile view */
      @media (max-width: 768px) {
        .more-articles {
          bottom: 0;
          right: auto;
          left: 0;
          width: 100%;
          border-radius: 0;
          transform: translateY(100%); /* Start off-screen */
        }

        .more-articles::before {
          content: 'You might also like';
          position: fixed;
          left: 50%;
          top: -45px;
          height: 40px;
          transform: translateX(-50%) rotate(0deg);
        }
      }

      .analog-markdown {
        padding: 20px; /* Adds padding around the content */
        max-width: 800px; /* Sets a max-width for the content */
        margin: 0 auto; /* Centers the content */
        font-family: 'Helvetica', 'Arial', sans-serif; /* Sets a default font */
      }

      .analog-markdown h1 {
        font-size: 2em; /* Sets font size for h1 */
        font-weight: bold; /* Sets font weight for h1 */
        margin-top: 1em;
        margin-bottom: 0.5em;
      }

      .analog-markdown h2 {
        font-size: 1.75em; /* Sets font size for h2 */
        font-weight: bold;
        margin-top: 1em;
        margin-bottom: 0.5em;
      }

      .analog-markdown h3 {
        font-size: 1.5em; /* Sets font size for h3 */
        font-weight: bold;
        margin-top: 1em;
        margin-bottom: 0.5em;
      }

      .analog-markdown h4 {
        font-size: 1.25em; /* Sets font size for h4 */
        font-weight: bold;
        margin-top: 1em;
        margin-bottom: 0.5em;
      }

      .analog-markdown h5 {
        font-size: 1em; /* Sets font size for h5 */
        font-weight: bold;
        margin-top: 1em;
        margin-bottom: 0.5em;
      }

      .analog-markdown h6 {
        font-size: 0.875em; /* Sets font size for h6 */
        font-weight: bold;
        margin-top: 1em;
        margin-bottom: 0.5em;
      }

      .analog-markdown p {
        font-size: 1em; /* Sets font size for paragraph */
        margin-top: 0.5em;
        margin-bottom: 0.5em;
      }

      /* You can also add styles for other elements like lists, links, etc. */
      .analog-markdown ul,
      .analog-markdown ol {
        padding-left: 20px; /* Adds indentation to lists */
      }

      .analog-markdown a {
        color: #1a0dab; /* Sets color for links */
        text-decoration: none; /* Removes underline from links */
      }

      .analog-markdown a:hover {
        text-decoration: underline; /* Underlines links on hover */
      }

      /* Additional styles for blockquotes, code, etc., can be added similarly */
    `,
  ],
})
export default class CornerstonePageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  readonly contextService = inject(ContextService);

  isMobile = false;
  otherContainerVisible: boolean = false;
  expanded = false;
  contentText = signal<string | null>(null);

  private attachEventListeners(): void {
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  private onResize(_event: any) {
    this.isMobile = window.innerWidth <= 768;
    this.checkVisibility();
  }

  private onScroll(_event: any) {
    this.checkVisibility();
  }

  private checkVisibility(): void {
    if (this.contextService.isClientSide) {
      const otherContainer = document.querySelector('.other-container');
      if (otherContainer) {
        const rect = otherContainer.getBoundingClientRect();
        this.otherContainerVisible =
          rect.top < window.innerHeight && rect.bottom >= 0;
      }
    }
  }

  toggleExpansion(): void {
    if (!this.otherContainerVisible) {
      this.expanded = !this.expanded;
    }
  }

  readonly cornerstonePageSlug$ = this.route.paramMap.pipe(
    map((params) => params.get('cornerstone-slug'))
  );

  private cornerstonePageSlugSub?: Subscription;

  cornerstonePageFile?: ContentFile<CornerstonePageAttributes>;
  supportingPageFiles: ContentFile<SupportingPageAttributes>[] = [];

  ngOnInit(): void {
    this.cornerstonePageSlugSub = this.cornerstonePageSlug$.subscribe(
      (cornerstonePageSlug) => {
        if (!cornerstonePageSlug) {
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

        runInInjectionContext(this.injector, () =>
          injectContent<Record<string, any>>({
            customFilename: `${cornerstonePageSlug}/index`,
          })
            .pipe(take(1))
            .subscribe((pageFile) =>
              this.contentText.set(pageFile.content?.toString() || null)
            )
        );

        this.supportingPageFiles = allPageFiles.filter(
          (pageFile) => pageFile.filename !== cornerstonePageFile.filename
        ) as ContentFile<SupportingPageAttributes>[];
      }
    );
  }

  ngAfterViewInit(): void {
    if (this.contextService.isClientSide) {
      this.isMobile = window.innerWidth <= 768;
      this.attachEventListeners();
      this.checkVisibility();
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.cornerstonePageSlugSub?.unsubscribe();

    if (this.contextService.isClientSide) {
      window.removeEventListener('resize', this.onResize.bind(this));
      window.removeEventListener('scroll', this.onScroll.bind(this));
    }
  }
}
