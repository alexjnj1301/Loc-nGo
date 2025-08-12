import { Component, DEFAULT_CURRENCY_CODE, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ReservationsActions, UpdateBookRequest } from '../../../../enums/admin'
import { HttpCallsService } from 'src/app/main/services/httpCalls.service'
import { Reservation } from '../../../../models/ReservationPerUser'
import * as moment from 'moment'

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
  public reservation: Reservation
  public isLoading = false
  public reservationsActions = ReservationsActions
  private updateRequest: UpdateBookRequest | undefined

  constructor(@Inject(MAT_DIALOG_DATA) public data: { reservation: Reservation },
    private httpService: HttpCallsService) {
    this.reservation = data.reservation
  }

  public updateReservation(action: string): void {
    if(action === ReservationsActions.CANCEL) return

    this.isLoading = true
    this.updateRequest = { id: this.reservation.id, status: action }
    this.httpService.updateReservationStatus(this.reservation.id, this.updateRequest).subscribe({
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

  public calculateNumberOfDays(): number {
    if (this.reservation.start_date && this.reservation.end_date) {
      const start = moment(this.reservation.start_date)
      const end = moment(this.reservation.end_date)
      return end.diff(start, 'days')
    }
    return 0
  }
}
