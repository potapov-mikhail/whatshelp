import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSidebarComponent } from './app-sidebar/app-sidebar.component';
import { AppSidebarMenuItemComponent } from './app-sidebar-menu-item/app-sidebar-menu-item.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AppSidebarComponent, AppSidebarMenuItemComponent],
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
  exports: [AppSidebarComponent],
})
export class AppSidebarModule {}
