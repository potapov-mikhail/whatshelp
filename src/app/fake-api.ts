import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class FakeApi {
  constructor(private localStorageService: LocalStorageService) {}

  public create<T>(path: string, payload: any): Observable<T> {
    const items: T[] = this.localStorageService.getItem(path) || [];

    const id = uuidv4();
    const createdAt = Date.now().toString();
    payload = { ...payload, id, createdAt };

    items.push(payload);
    this.localStorageService.setItem(path, items);
    return of(payload);
  }

  public update<T extends any>(path: string, payload: any): Observable<T> {
    const items: T[] = this.localStorageService.getItem(path) || [];
    const index = items.findIndex((item) => item.id === payload.id);

    if (index !== -1) {
      const newItems = [
        ...items.slice(0, index),
        payload,
        ...items.slice(index + 1),
      ];
      this.localStorageService.setItem(path, newItems);
      return of(payload);
    }

    throw new Error('Не удалось обновть сущность');
  }

  public delete(path: string, id: string): Observable<any> {
    const items: any[] = this.localStorageService.getItem(path) || [];
    const newItems = items.filter((item) => item.id !== id);
    this.localStorageService.setItem(path, newItems);
    return of();
  }

  public get<T>(path: string): Observable<T[]> {
    return of(this.localStorageService.getItem<T[]>(path) || []);
  }
}
