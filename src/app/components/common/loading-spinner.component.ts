import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  Renderer2,
  ViewChild,
  inject,
  input,
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [NgClass, MatProgressSpinner],
  template: `
    <div
      [ngClass]="[bgClass()]"
      class="absolute top-0 left-0 right-0 bottom-0"
      #container
    >
      <div class="relative w-full h-full">
        <div class="w-full h-full opacity-50"></div>

        @if (diameter) {
        <div
          class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
        >
          <mat-spinner [diameter]="diameter"></mat-spinner>
        </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .mat-mdc-progress-spinner {
        --mdc-circular-progress-active-indicator-color: var(--spinner-color);
      }
    `,
  ],
})
export default class LoadingSpinnerComponent
  implements AfterViewInit, OnDestroy
{
  color = input('black');
  bgClass = input('bg-inherit');
  scale = input(1.0);

  @HostBinding('style.--spinner-color')
  get dynamicColor() {
    return this.color();
  }

  @ViewChild('container') container!: ElementRef;

  parentWasRelative = false;
  diameter = 0;

  readonly renderer = inject(Renderer2);
  readonly changeDetectorRef = inject(ChangeDetectorRef);

  ngAfterViewInit() {
    const componentParent = this.container.nativeElement.parentNode.parentNode;
    const parentHeight = componentParent.offsetHeight * this.scale();

    if (componentParent.classList.contains('relative')) {
      this.parentWasRelative = true;
    } else {
      this.renderer.addClass(componentParent, 'relative');
    }

    this.diameter = parentHeight;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    const componentParent = this.container.nativeElement.parentNode.parentNode;

    if (!this.parentWasRelative) {
      this.renderer.removeClass(componentParent, 'relative');
    }
  }
}
