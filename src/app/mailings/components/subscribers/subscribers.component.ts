import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ISubscriber } from '../../interfaces';

@Component({
  selector: 'subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubscribersComponent {
  @Input() public subscribers: ISubscriber[] = [];
}
