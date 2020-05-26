import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FakeApi } from '../fake-api';
import { ISubscriber, IMailing, EMailingType } from './interfaces';
import { map } from 'rxjs/operators';

export type TMailingCreatePayload = Omit<IMailing, 'id'>;
export interface IGetParams {
  filter: string;
}

@Injectable({ providedIn: 'root' })
export class MailingsService {
  constructor(private api: FakeApi) {}

  public createOrUpdateMailingDraft(mailing: IMailing): Observable<IMailing> {
    const data = { ...mailing, type: EMailingType.draft };

    return mailing.id
      ? this.api.update('mailings', data)
      : this.api.create('mailings', data);
  }

  public removeDraftById(id: string): Observable<any> {
    return this.api.delete('mailings', id);
  }

  public createMailing(mailing: TMailingCreatePayload): Observable<IMailing> {
    return this.api.create('mailings', mailing);
  }

  public getMailingById(id: string): Observable<IMailing | undefined> {
    return this.getMailings().pipe(
      map((mailings) => mailings.find((m) => m.id === id))
    );
  }

  public getMailings(params?: IGetParams): Observable<IMailing[]> {
    return this.api.get<IMailing>('mailings').pipe(
      map((mailings) => {
        return params
          ? mailings.filter((m) => m.type === params.filter.toUpperCase())
          : mailings;
      })
    );
  }

  public getSubscribers(params): Observable<ISubscriber[]> {
    return this.api
      .get<ISubscriber>('subscribers')
      .pipe(map((sub) => sub.filter((s) => s.rule === params.rules)));
  }
}
