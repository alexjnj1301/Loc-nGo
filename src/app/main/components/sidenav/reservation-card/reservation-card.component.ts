import { Component, Input } from '@angular/core';
import { AllReservationsByUserId } from '../../../../models/ReservationPerUser'
import { Constants } from '../../../Constants'

@Component({
    selector: 'app-reservation-card',
    templateUrl: './reservation-card.component.html',
    styleUrl: './reservation-card.component.scss',
    standalone: false
})
export class ReservationCardComponent {
  @Input() reservation!: AllReservationsByUserId

  public constructor(public constants: Constants) {
  }
}
