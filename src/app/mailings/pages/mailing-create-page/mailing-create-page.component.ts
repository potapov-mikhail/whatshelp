import { forkJoin, Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';
import {
  OnInit,
  Component,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  EMailingStatus,
  EMailingType,
  IMailing,
  ISubscriber,
} from '../../interfaces';
import { MailingsService, TMailingCreatePayload } from '../../mailings.service';

const LAST_STEP_INDEX = 2;
const DEFAULT_SELECTED_INDEX = 0;

@Component({
  selector: 'app-mailing-create-page',
  templateUrl: './mailing-create-page.component.html',
  styleUrls: ['./mailing-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailingCreatePageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public subscribers: ISubscriber[] = [];
  public lastStepIndex: number = LAST_STEP_INDEX;
  public selectedStepIndex: number = DEFAULT_SELECTED_INDEX;

  private draftId = null;
  private destroy = new Subject();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private mailingsService: MailingsService
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      firstStep: this.fb.group({
        message: ['', [Validators.required, Validators.maxLength(600)]],
      }),
      secondStep: this.fb.group({
        channel: [null, [Validators.required]],
        rules: ['all', [Validators.required]],
      }),
      thirdStep: this.fb.group({
        title: ['', [Validators.required]],
        tagForFacebook: ['notify', [Validators.required]],
        time: ['now', [Validators.required]],
      }),
    });

    this.initFilterSubscribersStrategy()
      .pipe(takeUntil(this.destroy))
      .subscribe();

    this.route.queryParamMap
      .pipe(
        pluck('params', 'draft'),
        switchMap((id: string) => this.mailingsService.getMailingById(id)),
        filter((mailing) => !!mailing),
        takeUntil(this.destroy)
      )
      .subscribe((mailing) => {
        this.fillForm(mailing.data);
        this.draftId = mailing.id;
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public handleSubmit(): void {
    const mailing: TMailingCreatePayload = {
      name: this.form.value.thirdStep.title,
      status: EMailingStatus.inactive,
      sendCount: 0,
      viewCount: 0,
      clickCount: 0,
      createdAt: null,
      agent: null,
      type: EMailingType.sending,
      data: {},
    };

    forkJoin([
      this.mailingsService.removeDraftById(this.draftId),
      this.mailingsService.createMailing(mailing),
    ])
      .pipe(takeUntil(this.destroy))
      .subscribe({
        complete: () => this.router.navigate(['']),
      });
  }

  public handleSaveAndClose(): void {
    const mailing: IMailing = {
      id: this.draftId,
      name: this.form.value.thirdStep.title,
      status: EMailingStatus.inactive,
      sendCount: 0,
      viewCount: 0,
      clickCount: 0,
      createdAt: null,
      agent: null,
      type: EMailingType.draft,
      data: this.form.value,
    };

    this.mailingsService
      .createOrUpdateMailingDraft(mailing)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => this.router.navigate(['']));
  }

  public initFilterSubscribersStrategy(): Observable<any> {
    return this.secondFormGroup.valueChanges.pipe(
      filter(({ channel }) => !!channel),
      switchMap((params) => this.mailingsService.getSubscribers(params)),
      tap((subscribers) => (this.subscribers = subscribers))
    );
  }

  public handleSelectionChange(change: StepperSelectionEvent): void {
    this.selectedStepIndex = change.selectedIndex;
  }

  public nextStep(): void {
    const currentFormGroup = this.getSelectedFormGroup();

    if (currentFormGroup.invalid) {
      return;
    }

    const nextIndex = this.selectedStepIndex + 1;
    if (nextIndex <= this.lastStepIndex) {
      this.selectedStepIndex = nextIndex;
    }
  }

  public prevStep(): void {
    const prevIndex = this.selectedStepIndex - 1;
    if (prevIndex >= 0) {
      this.selectedStepIndex = prevIndex;
    }
  }

  public get firstFormGroup(): FormGroup {
    return this.form.get('firstStep') as FormGroup;
  }

  public get secondFormGroup(): FormGroup {
    return this.form.get('secondStep') as FormGroup;
  }

  public get thirdFormGroup(): FormGroup {
    return this.form.get('thirdStep') as FormGroup;
  }

  public get isFirstStep(): boolean {
    return this.selectedStepIndex === 0;
  }

  public get isLastStep(): boolean {
    return this.selectedStepIndex === this.lastStepIndex;
  }

  private fillForm(data: any): void {
    this.form.setValue(data);
  }

  private getSelectedFormGroup(): FormGroup {
    const name = this.getNameByIndex(this.selectedStepIndex);
    const form = this.form.get(name);
    if (!form) {
      throw new Error(`FormGroup with name: ${name} not found`);
    }
    return form as FormGroup;
  }

  private getNameByIndex(index: number): string | undefined {
    return Object.keys(this.form.controls)[index];
  }
}
