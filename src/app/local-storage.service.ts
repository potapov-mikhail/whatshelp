import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  public setItem<T>(key: string, data: any): void {
    const value = JSON.stringify(data);
    localStorage.setItem(key, value);
  }

  public getItem<T>(key: string): T {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }
}
