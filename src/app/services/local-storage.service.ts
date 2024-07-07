import { inject, Injectable } from '@angular/core';
import { ContextService } from './context.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly contextService = inject(ContextService);

  get<TValue>(key: string): TValue | null {
    if (this.contextService.isServerSide) {
      return null;
    }

    const json = localStorage.getItem(key);

    if (!json) {
      return null;
    }

    const item = JSON.parse(json);
    const now = new Date();

    if (item.expiry && now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value as TValue;
  }

  set<TValue>(key: string, value: TValue, expiryMinutes?: number): void {
    if (this.contextService.isServerSide) {
      return;
    }

    const now = new Date();
    const expiry = expiryMinutes
      ? now.getTime() + expiryMinutes * 60_000
      : undefined;

    const json = JSON.stringify({
      value,
      expiry,
    });

    localStorage.setItem(key, json);
  }

  remove(key: string): void {
    if (this.contextService.isServerSide) {
      return;
    }

    localStorage.removeItem(key);
  }
}
