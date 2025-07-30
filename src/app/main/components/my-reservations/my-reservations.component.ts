import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../../services/httpCalls.service'
import { Reservation } from '../../../models/ReservationPerUser'
import { AuthenticationService } from '../../services/authentication.service'
import { AllLieuResponse } from '../../../models/LieuModels'

@Component({
  selector: 'app-my-reservations',
  imports: [],
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.scss'
})
export class MyReservationsComponent implements OnInit {
  public reservationsList: Reservation[] = []
  public lieuxList: AllLieuResponse[] = []

  public constructor(public httpCallService: HttpCallsService,
                     public authService: AuthenticationService) {
  }

  public ngOnInit() {
    this.getMyLieux();
  }

  public getMyLieux() {
    const userId = this.authService.getCurrentUser()?.id!
    this.httpCallService.getLieuByProprietorId(userId).subscribe({
      next: (lieux) => {
        this.lieuxList = lieux
      },
      error: (error) => {
        console.error('Error fetching lieux:', error)
      }
    })
  }
}
