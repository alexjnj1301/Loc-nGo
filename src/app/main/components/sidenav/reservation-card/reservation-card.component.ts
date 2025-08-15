import { Component, Input, inject } from '@angular/core';
import { AllReservationsByUserId } from '../../../../models/ReservationPerUser'
import { Constants } from '../../../Constants'
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-reservation-card',
    templateUrl: './reservation-card.component.html',
    styleUrl: './reservation-card.component.scss',
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatChip, NgClass, TranslateModule]
})
export class ReservationCardComponent {
  constants = inject(Constants);

  @Input() reservation!: AllReservationsByUserId
}
