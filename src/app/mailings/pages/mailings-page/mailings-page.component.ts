import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';
import { IMailing } from '../../interfaces';
import { MailingsService } from '../../mailings.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mailings-page',
  templateUrl: './mailings-page.component.html',
  styleUrls: ['./mailings-page.component.scss'],
})
export class MailingsPageComponent implements OnInit, OnDestroy {
  public count = 0;
  public mailings: IMailing[] = [];

  private destroy = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mailingsService: MailingsService
  ) {}

  public ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        pluck('params', 'filter'),
        tap((f: string) => this.initFilters(f)),
        filter((f) => !!f),
        switchMap((f) => this.mailingsService.getMailings({ filter: f })),
        takeUntil(this.destroy)
      )
      .subscribe((mailings) => {
        this.count = mailings.length;
        this.mailings = [...mailings];
      });
  }

  public handleEvent(event: { type: string; mailing: IMailing }) {
    if (event.type === 'edit') {
      this.router.navigate(['/mailings/create'], {
        queryParams: { draft: event.mailing.id },
      });
    }
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private initFilters(filterValue: string) {
    if (!filterValue) {
      this.router.navigate(['/mailings'], {
        queryParams: { filter: 'sending' },
      });
    }
  }
}
