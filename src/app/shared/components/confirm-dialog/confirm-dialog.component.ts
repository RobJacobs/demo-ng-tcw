import { Component } from '@angular/core';
import { DialogConfig, DialogRef } from '@tylertech/tyler-components-web-angular';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  public title: string;
  public message: string;

  constructor(public dialogConfig: DialogConfig, private dialogRef: DialogRef) {
    this.title = dialogConfig.data.title;
    this.message = dialogConfig.data.message;
  }

  public close(response = false): void {
    this.dialogRef.close(response);
  }
}
