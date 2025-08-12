import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpCallsService } from 'src/app/main/services/httpCalls.service';

@Component({
    selector: 'app-valid-deletion-dialog',
    templateUrl: './valid-deletion-dialog.component.html',
    styleUrl: './valid-deletion-dialog.component.scss',
    standalone: false
})
export class ValidDeletionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number },
  private httpService: HttpCallsService) { }

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
