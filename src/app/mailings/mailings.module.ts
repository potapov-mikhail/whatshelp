import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UiModule } from '../ui/ui.module';
import { MailingsRoutingModule } from './mailings-routing.module';
import { MailingsPageComponent } from './pages/mailings-page/mailings-page.component';
import { SubscribersComponent } from './components/subscribers/subscribers.component';
import { MailingsListComponent } from './components/mailings-list/mailings-list.component';
import { SendingFormComponent } from './components/steps/sending-form/sending-form.component';
import { MessageFormComponent } from './components/steps/message-form/message-form.component';
import { MailingCreatePageComponent } from './pages/mailing-create-page/mailing-create-page.component';
import { SegmentationFormComponent } from './components/steps/segmentation-form/segmentation-form.component';
import { MailingsPageHeaderComponent } from './components/mailings-page-header/mailings-page-header.component';
import { MailingsPageFiltersComponent } from './components/mailings-page-filters/mailings-page-filters.component';

@NgModule({
  declarations: [
    SendingFormComponent,
    MessageFormComponent,
    SubscribersComponent,
    MailingsListComponent,
    MailingsPageComponent,
    SegmentationFormComponent,
    MailingCreatePageComponent,
    MailingsPageHeaderComponent,
    MailingsPageFiltersComponent,
  ],
  imports: [UiModule, CommonModule, MailingsRoutingModule, ReactiveFormsModule],
})
export class MailingsModule {}
