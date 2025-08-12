import { Component, Input } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'
import { Reservation } from '../../../../models/ReservationPerUser'
import { MatChip } from '@angular/material/chips'
import { ReservationsActions } from '../../../../enums/admin'

@Component({
  selector: 'app-reservation-card',
  imports: [
    DatePipe,
    TranslateModule,
    MatChip,
    NgClass,
  ],
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.scss'
})
export class ReservationCardComponent {
  @Input() reservation!: Reservation
  protected readonly ReservationsActions = ReservationsActions
}
