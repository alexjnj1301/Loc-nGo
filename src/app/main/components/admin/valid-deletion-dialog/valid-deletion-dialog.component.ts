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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private httpService: HttpCallsService) { }

  public delete() {
    this.httpService.deleteReservation(this.data.reservationId).subscribe({
      next: () => {
        window.location.reload()
      },
      error: (error) => {
        console.error(error)
      }
    })
  }
}
