import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog'
import { TranslateModule } from '@ngx-translate/core'
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-confirm-host-dialog',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    TranslateModule,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
  templateUrl: './confirm-host-dialog.component.html',
  styleUrl: './confirm-host-dialog.component.scss'
})
export class ConfirmHostDialogComponent {

}
