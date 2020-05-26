import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ISubscriber } from '../../../interfaces';

const CHANNEL_LIST = [
  { name: 'facebook', value: 'facebook' },
  { name: 'vk', value: 'vk' },
  { name: 'telegram', value: 'telegram' },
  { name: 'whatsapp', value: 'whatsapp' },
];

const RULES_LIST = [
  { name: 'Всем этип правилам', value: 'all' },
  { name: 'Правило 1', value: 'rule 1' },
  { name: 'Правило 2', value: 'rule 2' },
  { name: 'Правило 2', value: 'rule 3' },
];

@Component({
  selector: 'segmentation-form',
  templateUrl: './segmentation-form.component.html',
  styleUrls: ['./segmentation-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentationFormComponent {
  @Input() public form: FormGroup;
  @Input() public subscribers: ISubscriber[] = [];

  public rules = RULES_LIST;
  public channels = CHANNEL_LIST;
}
