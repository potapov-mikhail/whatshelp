import { Component, ChangeDetectionStrategy } from '@angular/core';

export interface IHeaderLinks {
  title: string;
  path: string;
}

const HEADER_LINKS: IHeaderLinks[] = [
  {
    title: 'Что такое ручные рассылки',
    path: '/',
  },
  {
    title: 'С чего начать',
    path: '/',
  },
  {
    title: 'Обучающее видео',
    path: '/',
  },
];

@Component({
  selector: 'mailings-page-header',
  templateUrl: './mailings-page-header.component.html',
  styleUrls: ['./mailings-page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailingsPageHeaderComponent {
  public links: IHeaderLinks[] = HEADER_LINKS;
}
