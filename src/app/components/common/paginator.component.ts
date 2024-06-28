import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex gap-x-2">
      <span>
        <a
          [routerLink]="
            pageNumber() === 1 ? null : normalizedResourcePath() + '1'
          "
          role="button"
          aria-label="Go to first page"
          [attr.aria-disabled]="pageNumber() === 1"
          [class.disabled-link]="pageNumber() === 1"
        >
          &lt;&lt; First
        </a>
      </span>

      <span>
        <a
          [routerLink]="
            pageNumber() === 1
              ? null
              : normalizedResourcePath() + (pageNumber() - 1)
          "
          role="button"
          aria-label="Go to previous page"
          [attr.aria-disabled]="pageNumber() === 1"
          [class.disabled-link]="pageNumber() === 1"
        >
          &lt; Prev
        </a>
      </span>

      <span class="mx-2">{{ pageNumber() }}/{{ pageCount() }}</span>

      <span>
        <a
          [routerLink]="
            pageNumber() === pageCount()
              ? null
              : normalizedResourcePath() + (pageNumber() + 1)
          "
          role="button"
          aria-label="Go to next page"
          [attr.aria-disabled]="pageNumber() === pageCount()"
          [class.disabled-link]="pageNumber() === pageCount()"
        >
          Next &gt;
        </a>
      </span>

      <span>
        <a
          [routerLink]="
            pageNumber() === pageCount()
              ? null
              : normalizedResourcePath() + pageCount()
          "
          role="button"
          aria-label="Go to last page"
          [attr.aria-disabled]="pageNumber() === pageCount()"
          [class.disabled-link]="pageNumber() === pageCount()"
        >
          Last &gt;&gt;
        </a>
      </span>
    </div>
  `,
  styles: [
    `
      .disabled-link {
        pointer-events: none;
        color: grey;
        text-decoration: none;
        cursor: not-allowed;
      }
    `,
  ],
})
export default class PaginatorComponent {
  resourcePath = input.required<string>();
  pageNumber = input.required<number>();
  pageCount = input.required<number>();

  normalizedResourcePath = computed(
    () => this.resourcePath() + (this.resourcePath().endsWith('/') ? '' : '/')
  );
}
