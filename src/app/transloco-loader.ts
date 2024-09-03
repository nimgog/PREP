import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoLoader, Translation } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  getTranslation(lang: string): Observable<Translation> | Promise<Translation> {
    if (isPlatformBrowser(this.platformId)) {
      // Client-side: Fetch the translation file from the correct path
      return this.http.get<Translation>(`/i18n/${lang}.json`); // Adjust path to match Vite's public directory setup
    } else {
      // Server-side: Read the translation file directly from the file system
      const fs = require('fs'); // Node.js File System module
      const path = require('path'); // Node.js Path module
      const filePath = path.join(process.cwd(), 'src', 'assets', 'i18n', `${lang}.json`);

      return new Promise<Translation>((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err: NodeJS.ErrnoException | null, data: string) => {
          if (err) {
            console.error(`Error reading translation file: ${filePath}`, err);
            reject(err);
          } else {
            try {
              resolve(JSON.parse(data) as Translation);
            } catch (parseError) {
              console.error(`Error parsing translation file: ${filePath}`, parseError);
              reject(parseError);
            }
          }
        });
      });
    }
  }
}
