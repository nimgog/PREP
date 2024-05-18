import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private currencySubject = new BehaviorSubject<string>('');
  currency$ = this.currencySubject.asObservable();

  private readonly httpClient = inject(HttpClient);
  private readonly localStorageService = inject(LocalStorageService);

  getTwoLetterCountryCode() {
    const cachedCountryCode =
      this.localStorageService.get<string>('country_code');

    if (cachedCountryCode) {
      return of(cachedCountryCode);
    }

    return this.getUserIP().pipe(
      catchError(() => {
        return of({ ip: 'EUROPE' });
      }),
      switchMap((ipResponse: any) => {
        return this.getLocation(ipResponse.ip).pipe(
          catchError(() => {
            return of({ country_code: 'SE' });
          })
        );
      }),
      map((locationResponse) => {
        return locationResponse.country_code
          ? locationResponse
          : { country_code: 'SE' };
      }),
      tap(({ country_code }) => {
        this.localStorageService.set('country_code', country_code, 60);
      }),
      map(({ country_code }) => country_code)
    );
  }

  getUserIP() {
    return this.httpClient.get('https://api.ipify.org?format=json');
  }

  getLocation(ip: string): Observable<any> {
    return this.httpClient.get(
      `https://api.ipapi.com/${ip}?access_key=${environment.ipAPIKey}`
    );
  }
}
