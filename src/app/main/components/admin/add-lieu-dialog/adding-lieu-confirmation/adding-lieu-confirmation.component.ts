import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core'
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog'
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-adding-lieu-confirmation',
  imports: [
    TranslateModule,
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './adding-lieu-confirmation.component.html',
  styleUrl: './adding-lieu-confirmation.component.scss'
})
export class AddingLieuConfirmationComponent {
  public reloadPage() {
    window.location.reload();
  }

  public close() {
    this.reloadPage();
  }
}
