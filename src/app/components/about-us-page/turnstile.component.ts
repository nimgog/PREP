import { Component, inject } from '@angular/core';
import { NgxTurnstileModule } from 'ngx-turnstile';
import { ContextService } from 'src/app/services/context.service';
import { environment } from 'src/environments/environment';

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
  readonly turnstileSiteKey = environment.turnstileSiteKey;

  readonly contextService = inject(ContextService);
}
