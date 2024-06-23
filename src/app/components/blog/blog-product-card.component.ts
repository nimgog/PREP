import { NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  computed,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BlogContentProduct } from 'src/app/models/blog.model';

@Component({
  selector: 'app-blog-product-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <div class="flex justify-center w-full">
      <a
        #linkElement
        class="flex max-w-md p-4 bg-white border border-gray-300 rounded-lg shadow-md flex-row cursor-pointer"
        [href]="data().url"
        (click)="onClick($event)"
      >
        <div class="flex justify-center items-center w-full h-full">
          @if(isExternalImage()){
          <img
            class="w-[100px] h-[100px]"
            width="100"
            height="100"
            [src]="data().imageUrl"
            [alt]="data().imageAlt"
            [loading]="data().imagePriority ? 'eager' : 'lazy'"
          />
          } @else {
          <img
            class="w-[100px] h-[100px]"
            width="100"
            height="100"
            [ngSrc]="data().imageUrl"
            [alt]="data().imageAlt"
            [priority]="data().imagePriority"
          />
          }
        </div>

        <div class="flex flex-col ml-3">
          <h2 class="text-lg font-semibold">{{ data().title }}</h2>
          <p class="mt-2 text-gray-700">{{ data().description }}</p>
        </div>
      </a>
    </div>
  `,
})
export default class BlogProductCardComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly renderer = inject(Renderer2);

  readonly data = input.required<BlogContentProduct>();
  readonly isExternalUrl = computed(() => this.isAbsoluteURL(this.data().url));
  readonly isExternalImage = computed(() =>
    this.isAbsoluteURL(this.data().imageUrl)
  );

  readonly linkElement = viewChild.required<ElementRef>('linkElement');

  isAbsoluteURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  ngAfterViewInit(): void {
    if (this.isExternalUrl()) {
      const linkEl = this.linkElement().nativeElement;
      this.renderer.setAttribute(linkEl, 'target', '_blank');
      this.renderer.setAttribute(linkEl, 'rel', 'noopener');
    }
  }

  onClick(event: Event): void {
    event.preventDefault();

    if (this.isExternalUrl()) {
      window.open(this.data().url, '_blank', 'noopener');
    } else {
      this.router.navigate([this.data().url]);
    }
  }
}
