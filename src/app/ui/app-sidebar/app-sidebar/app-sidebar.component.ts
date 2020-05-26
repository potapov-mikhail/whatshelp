import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebarComponent {
  public menuItems$ = this.appMenuService.menuItems$;
  public submenuItem$ = this.appMenuService.submenuItems$;
  constructor(private appMenuService: SidebarService) {}
}
