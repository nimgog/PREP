import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex justify-center w-full">
      <div class="flex gap-x-1 py-2 overflow-x-auto whitespace-nowrap">
        <a class="text-prep-green font-semibold" [routerLink]="basePath()">{{
          baseTitle()
        }}</a>
        @for (nestedTitle of nestedTitles(); track nestedTitle; let i = $index)
        {
        <span>&gt;</span>

        @if (i < nestedTitles().length - 1) {
        <a
          class="text-prep-green font-semibold"
          [routerLink]="getBackNavLink(i)"
          >{{ nestedTitle }}</a
        >
        } @else {
        <span>{{ nestedTitle }}</span>
        } }
      </div>
    </div>
  `,
})
export default class BreadcrumbComponent {
  readonly baseTitle = input.required<string>();
  readonly basePath = input.required<string>();
  readonly nestedTitles = input<string[]>([]);

  getBackNavLink(index: number): string {
    const levelsBack = this.nestedTitles().length - (index + 1);
    return Array(levelsBack).fill('..').join('/');
  }
}
