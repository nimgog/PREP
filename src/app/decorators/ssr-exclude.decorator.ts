import { isPlatformServer } from '@angular/common';
import {
  Directive,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  selector: '[ssrExclude]',
  standalone: true,
})
export class SsrExcludeDirective implements OnInit {
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef<any>);
  private readonly platformId = inject<object>(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
