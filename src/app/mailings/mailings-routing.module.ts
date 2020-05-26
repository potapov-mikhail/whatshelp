import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailingsPageComponent } from './pages/mailings-page/mailings-page.component';
import { MailingCreatePageComponent } from './pages/mailing-create-page/mailing-create-page.component';

const routes: Routes = [
  {
    path: '',
    component: MailingsPageComponent,
  },
  {
    path: 'create',
    component: MailingCreatePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MailingsRoutingModule {}
