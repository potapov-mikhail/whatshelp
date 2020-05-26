import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_MENU_ITEMS } from './menu-items';

const DEFAULT_MENU_ITEM_NAME = 'mailings';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private menuItemsState = new BehaviorSubject(APP_MENU_ITEMS);
  public menuItems$ = this.menuItemsState.asObservable();

  public currentMenuName$ = new BehaviorSubject(DEFAULT_MENU_ITEM_NAME);

  public submenuItems$: Observable<any[]> = this.currentMenuName$.pipe(
    map((name) =>
      this.menuItemsState.getValue().find((item) => item.name === name)
    ),
    map((menuItem) => menuItem.children)
  );
}
