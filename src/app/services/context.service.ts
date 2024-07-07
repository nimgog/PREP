import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  private readonly platformId = inject<Object>(PLATFORM_ID);

  get isClientSide(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get isServerSide(): boolean {
    return !isPlatformBrowser(this.platformId);
  }
}
