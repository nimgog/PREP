import { Component, inject } from '@angular/core';
import { NgxTurnstileModule } from 'ngx-turnstile';
import {} from '@angular/core';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-turnstile', // TODO: Remove when dev team fixes auto selector generation
  standalone: true,
  imports: [NgxTurnstileModule],
  template: `
    @if (contextService.isClientSide) {
    <ngx-turnstile [siteKey]="turnstileSiteKey" theme="light" />
    }
  `,
})
export default class TurnstileComponent {
  readonly turnstileSiteKey = '1x00000000000000000000AA'; //TODO: environment.turnstileSiteKey; & use real site key

  readonly contextService = inject(ContextService);
}
