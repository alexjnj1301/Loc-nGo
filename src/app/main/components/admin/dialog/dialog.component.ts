import { Component, DEFAULT_CURRENCY_CODE, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookResponse } from 'src/app/models/ContactInformations';
import { ReservationsActions, UpdateBookRequest } from '../../../../enums/admin';
import { HttpCallsService } from 'src/app/main/services/httpCalls.service';

@Component({
    selector: 'app-dialog',
    providers: [{
            provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'
        }],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
    standalone: false
})
export class DialogComponent {
  public reservation: BookResponse
  public isLoading = false
  public reservationsActions = ReservationsActions
  private updateRequest: UpdateBookRequest | undefined

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private httpService: HttpCallsService) {
    this.reservation = data.reservation
  }

  public updateReservation(action: string): void {
    this.isLoading = true
    this.updateRequest = { status: action }
    this.httpService.updateReservation(this.reservation.id, this.updateRequest).subscribe({
      next: () => {
        this.isLoading = false
        window.location.reload()
      },
      error: (error) => {
        console.error(error)
        this.isLoading = false
      }
    })
  }
}
