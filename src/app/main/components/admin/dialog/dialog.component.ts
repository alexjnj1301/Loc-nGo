import { Component, DEFAULT_CURRENCY_CODE, inject } from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog'
import { ReservationsActions, UpdateBookRequest } from '../../../../enums/admin'
import { HttpCallsService } from 'src/app/main/services/httpCalls.service'
import { Reservation } from '../../../../models/ReservationPerUser'
import * as moment from 'moment'
import { CurrencyPipe, DatePipe, KeyValuePipe, NgIf } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-dialog',
    providers: [{
            provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'
        }],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
    imports: [NgIf, MatProgressSpinner, MatIcon, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, CurrencyPipe, DatePipe, KeyValuePipe, TranslateModule]
})
export class DialogComponent { data = inject<{ reservation: Reservation; }>(MAT_DIALOG_DATA);
  private httpService = inject(HttpCallsService);

  public reservation: Reservation
  public isLoading = false
  public reservationsActions = ReservationsActions
  private updateRequest: UpdateBookRequest | undefined

  constructor() {
    const data = this.data;

    this.reservation = data.reservation
  }

  public updateReservation(action: string): void {
    if(action === ReservationsActions.CANCEL) return

    this.isLoading = true
    this.updateRequest = { id: this.reservation.id, status: action }
    this.httpService.updateReservationStatus(this.reservation.id, this.updateRequest).subscribe({
      next: () => {
        this.isLoading = false
        this.reloadPage()
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

  public reloadPage() {
    window.location.reload()
  }
}
