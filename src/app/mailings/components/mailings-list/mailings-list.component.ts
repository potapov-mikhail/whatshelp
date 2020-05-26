import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMailing } from '../../interfaces';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

export type IEventType = 'edit';

const DISPLAYED_COLUMNS = [
  'select',
  'name',
  'status',
  'sendCount',
  'viewCount',
  'clickCount',
  'createdAt',
  'agent',
  'tools',
];

@Component({
  selector: 'mailings-list',
  templateUrl: './mailings-list.component.html',
  styleUrls: ['./mailings-list.component.scss'],
})
export class MailingsListComponent {
  @Input() public set mailings(mailings: IMailing[]) {
    this.dataSource = new MatTableDataSource<IMailing>(mailings);
  }

  @Output() onEvent = new EventEmitter<{
    type: IEventType;
    mailing: IMailing;
  }>();

  public displayedColumns: string[] = DISPLAYED_COLUMNS;
  public dataSource = new MatTableDataSource<IMailing>([]);
  public selection = new SelectionModel<IMailing>(true, []);

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  public handleEvent(type: IEventType, mailing) {
    this.onEvent.emit({ type, mailing });
  }
}
