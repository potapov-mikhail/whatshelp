import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ISubscriber } from '../../../interfaces';

const TAGS_LIST = [{ name: 'Уведомление о событии', value: 'notify' }];
const SEND_TIME_LIST = [
  { name: 'Отправить сейчас', value: 'now' },
  { name: 'Заплонированное время', value: 'scheduled' },
];

@Component({
  selector: 'sending-form',
  templateUrl: './sending-form.component.html',
  styleUrls: ['./sending-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendingFormComponent {
  @Input() public form: FormGroup;
  @Input() public subscribers: ISubscriber[] = [];
  @Output() public submited = new EventEmitter();

  public tags = TAGS_LIST;
  public times = SEND_TIME_LIST;

  public handleSubmit() {
    this.submited.emit();
  }
}
