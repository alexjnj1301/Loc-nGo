import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../../services/httpCalls.service'
import { Reservation } from '../../../models/ReservationPerUser'
import { AuthenticationService } from '../../services/authentication.service'
import { AllLieuResponse } from '../../../models/LieuModels'
import { TitlePictureComponent } from '../title-picture/title-picture.component'
import { TranslateModule } from '@ngx-translate/core'
import { ReservationCardComponent } from './reservation-card/reservation-card.component'
import { BookResponse } from '../../../models/ContactInformations'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { DialogComponent } from '../admin/dialog/dialog.component'

@Component({
  selector: 'app-my-reservations',
  imports: [
    TitlePictureComponent,
    TranslateModule,
    ReservationCardComponent,
  ],
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.scss'
})
export class MyReservationsComponent implements OnInit {
  public reservationsList: Reservation[] = []
  public lieuxList: AllLieuResponse[] = []

  public constructor(public httpCallService: HttpCallsService,
                     public authService: AuthenticationService,
                     public dialog: MatDialog) {
  }

  public ngOnInit() {
    this.getMyLieux();
  }

  public getMyLieux() {
    const userId = this.authService.getCurrentUser()?.id!
    this.httpCallService.getLieuByProprietorId(userId).subscribe({
      next: (lieux) => {
        this.lieuxList = lieux
        this.lieuxList.forEach(lieu => {
          this.getReservationsByLieuId(lieu.id)
        })
      },
      error: (error) => {
        console.error('Error fetching lieux:', error)
      }
    })
  }

  public getReservationsByLieuId(lieuId: number): void {
    this.httpCallService.getReservationsByLieuId(lieuId).subscribe({
      next: (res) => {
        console.log('Reservations for lieuId:', lieuId, res)
        this.reservationsList.push(...res)
      },
      error: (error) => {
        console.error('Error fetching reservations:', error)
      }
    })
  }

  public openDialog(reservationId: number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogConfig = new MatDialogConfig();

    this.httpCallService.getReservationById(reservationId).subscribe({
      next: (res: Reservation) => {
        dialogConfig.data = { reservation: res }
        dialogConfig.enterAnimationDuration = enterAnimationDuration
        dialogConfig.exitAnimationDuration = exitAnimationDuration

        this.dialog.open(DialogComponent, dialogConfig)
      },
      error: (error: any) => {
        console.error('Error fetching reservation details:', error)
      }
    })
  }

  public noReservationWithLieu(lieuId: number): boolean {
    return !this.reservationsList.some(reservation => reservation.lieu.id === lieuId);
  }
}
