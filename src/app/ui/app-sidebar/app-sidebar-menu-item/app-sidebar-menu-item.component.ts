import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-sidebar-menu-item',
  templateUrl: './app-sidebar-menu-item.component.html',
  styleUrls: ['./app-sidebar-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebarMenuItemComponent {
  @Input() public menuItem: any;
  @Output() public onClick = new EventEmitter<void>();

  public get imgSrc(): string {
    return this.menuItem.img
      ? `/assets/images/menu-items/${this.menuItem.img}`
      : this.menuItem.url;
  }

  public handleClick(): void {
    this.onClick.emit();
  }
}
