import { Component, PLATFORM_ID, inject } from '@angular/core';
import { NgxTurnstileModule } from 'ngx-turnstile';
import { isPlatformBrowser } from '@angular/common';
import {} from '@angular/core';

@Component({
  selector: 'app-turnstile', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [NgxTurnstileModule],
  template: `
    @if (isClientSide) {
    <ngx-turnstile [siteKey]="turnstileSiteKey" theme="light" />
    }
  `,
})
export default class TurnstileComponent {
  readonly turnstileSiteKey = '1x00000000000000000000AA'; //TODO: environment.turnstileSiteKey; & use real site key

  private readonly platformId = inject<Object>(PLATFORM_ID);

  get isClientSide(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
