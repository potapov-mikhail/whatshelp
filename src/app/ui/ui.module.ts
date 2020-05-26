import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppSidebarModule } from './app-sidebar/app-sidebar.module';

const MATERIAL_MODULES = [
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatTableModule,
  MatCheckboxModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatListModule,
  MatMenuModule,
];

@NgModule({
  declarations: [],
  imports: [...MATERIAL_MODULES, CommonModule, RouterModule, AppSidebarModule],
  exports: [...MATERIAL_MODULES, AppSidebarModule],
})
export class UiModule {}
