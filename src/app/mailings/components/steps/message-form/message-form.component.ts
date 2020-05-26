import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageFormComponent {
  @Input() public form: FormGroup;
  @Input() public displayMaxSymbolCount = 600;

  public get currentSymbolsCount() {
    return this.form.get('message').value.length;
  }
}
