import { ContentFile, injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { CommonModule } from '@angular/common';
import {
  Component,
  Injector,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CornerstonePageAttributes } from 'src/app/models/blog.model';
import { getFullPageTitle } from 'src/app/utils/page-helpers';

export const routeMeta: RouteMeta = {
  title: getFullPageTitle('Becoming Prepared'),
};

@Component({
  selector: 'app-becoming-prepared-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="blog-container pt-[100px] pb-5">
      <h1 class="title">Becoming Prepared</h1>
      <p class="summary">
        Welcome to Becoming Prepared - our ultimate resource for all things
        preparedness. Whether you're just starting out or looking to enhance
        your emergency readiness, our blog is filled with advice and in-depth
        guides on a wide range of topics. From building comprehensive emergency
        kits and mastering food and water storage techniques to honing survival
        skills and creating robust emergency plans, we cover everything you need
        to feel confident and prepared. Dive into our reviews and
        recommendations for the best gear and resources to ensure your safety
        and well-being, no matter what challenges may come your way. Stay
        prepared, stay safe, with Prepp.me
      </p>
      <div class="cards-container">
        <div
          *ngFor="let page of cornerstonePageFiles"
          class="card"
          [routerLink]="['/blog/' + page.slug]"
        >
          <div
            class="image-container"
            [style.background-image]="
              'url(' + page.attributes.thumbnailImageUrl + ')'
            "
          ></div>
          <div class="content">
            <a [href]="['/blog/' + page.slug]" class="page-title">{{
              page.attributes.title
            }}</a>
            <p class="page-description">{{ page.attributes.description }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @tailwind utilities;
      .blog-container {
        text-align: left;
        width: 90%;
        margin: auto;
        padding-top: 100px; /* Added top padding for some spacing */
      }

      .title {
        font-size: 2rem;
        font-weight: medium;
        margin-bottom: 1rem;
      }

      .summary {
        margin-bottom: 2rem;
      }

      .cards-container {
        display: flex;
        flex-direction: column; /* Stack cards in a column */
        gap: 20px; /* Space between cards */
      }

      .card {
        background-color: #f5f5f5; /* Light grey background */
        border: 2px solid black;
        border-radius: 10px; /* Rounded corners for the card */
        display: flex;
        flex-direction: column; /* Stack content in a column on mobile */
        gap: 10px;
        padding: 20px;
      }

      .image-container {
        width: 100%; /* Full width of the card */
        height: 200px; /* Fixed height for all images */
        background-size: cover;
        background-position: center;
        border-radius: 8px; /* Rounded corners for the image */
      }

      .content {
        display: flex;
        flex-direction: column; /* Ensure content is always in column */
        justify-content: flex-start; /* Align content to the top */
        padding: 10px;
        width: 100%;
      }

      .page-title {
        color: #4caf50; /* Green color for the title */
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2rem;
        margin-top: 0; /* Title aligns at the top */
        align-self: start; /* Align title to the start of content area */
      }

      .page-description {
        color: #333; /* Darker text for description */
        font-size: 1rem;
        align-self: start; /* Align description to the start of content area */
      }

      @media (min-width: 768px) {
        .card {
          flex-direction: row; /* Align card content in a row on desktop */
          align-items: flex-start; /* Align items to the top */
        }

        .image-container {
          width: 40%; /* Smaller width for image to fit content in a row */
          margin-right: 20px; /* Space between image and text content */
        }

        .content {
          width: 60%; /* Remaining width for content */
        }
      }
    `,
  ],
})
export default class CornerstonePageComponent {
  private readonly injector = inject(Injector);

  cornerstonePageFiles: ContentFile<CornerstonePageAttributes>[] = [];

  constructor() {
    this.cornerstonePageFiles = runInInjectionContext(this.injector, () =>
      injectContentFiles<CornerstonePageAttributes>(
        (contentFile) =>
          contentFile.filename.startsWith('/src/content') &&
          contentFile.filename.endsWith('index.md') &&
          !!contentFile.attributes.published
      ).map((pageFile) => {
        pageFile.slug = pageFile.filename
          .replace('/src/content/', '')
          .replace('/index.md', '');

        return pageFile;
      })
    );
  }
}
