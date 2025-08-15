import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { HttpCallsService } from 'src/app/main/services/httpCalls.service';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-valid-deletion-dialog',
    templateUrl: './valid-deletion-dialog.component.html',
    styleUrl: './valid-deletion-dialog.component.scss',
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose, TranslateModule]
})
export class ValidDeletionDialogComponent {
  data = inject<{
    id: number;
}>(MAT_DIALOG_DATA);
  private httpService = inject(HttpCallsService);


  public delete() {
    this.httpService.deleteLieuById(this.data.id).subscribe({
      next: () => {
        console.log('Lieu deleted successfully')
        window.location.reload()
      },
      error: (error) => {
        console.error('Error deleting lieu:', error)
      }
    })
  }
}
