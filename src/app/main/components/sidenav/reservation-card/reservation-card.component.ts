import { Component, Input } from '@angular/core';
import { Reservation } from '../../../../models/ReservationPerUser'

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrl: './reservation-card.component.scss'
})
export class ReservationCardComponent {
  @Input() reservation!: Reservation

}
