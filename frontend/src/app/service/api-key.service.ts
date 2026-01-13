import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyService {
  private readonly STORAGE_KEY ='apiKey';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getApiKey(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.STORAGE_KEY);
    }
    return null;
  }

  setApiKey(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, key);
    }
  }
}
