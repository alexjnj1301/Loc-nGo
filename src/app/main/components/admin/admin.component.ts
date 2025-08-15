import { Component, OnInit, inject } from '@angular/core';
import { BookResponse } from 'src/app/models/ContactInformations';
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp';
import { HttpCallsService } from '../../services/httpCalls.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ValidDeletionDialogComponent } from './valid-deletion-dialog/valid-deletion-dialog.component';
import { TitlePictureComponent } from '../title-picture/title-picture.component';
import { NgFor, NgClass, DatePipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatChipSet, MatChip } from '@angular/material/chips';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    imports: [TitlePictureComponent, NgFor, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatChipSet, MatChip, NgClass, MatCardActions, MatButton, DatePipe]
})
export class AdminComponent implements OnInit {
  private httpService = inject(HttpCallsService);
  private translateValues = inject(MultipleTransLoaderHttp);
  dialog = inject(MatDialog);

  public reservationList: BookResponse[] = []
  public homePageTranslateValues: any = {}

  public ngOnInit(): void {
    this.translateValues.getTranslation().subscribe((result) => {
      this.homePageTranslateValues = result.homePage;
    })
    // this.httpService.getAllReservations().subscribe({
    //   next: (reservations: BookResponse[]) => {
    //     this.reservationList = reservations;
    //     console.log(this.reservationList);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   }
    // })
  }

  public seeDetails(id: number): void {
    console.log(id);
  }

  public openDialog(reservation: BookResponse, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = { reservation }
    dialogConfig.enterAnimationDuration = enterAnimationDuration
    dialogConfig.exitAnimationDuration = exitAnimationDuration

    this.dialog.open(DialogComponent, dialogConfig);
  }

  public deleteReservation(id: number): void {
    this.httpService.deleteReservation(id).subscribe({
      next: () => {
        window.location.reload()
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  public openDeletionDialog(reservationId: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = { reservationId }
    dialogConfig.enterAnimationDuration = '0ms'
    dialogConfig.exitAnimationDuration = '0ms'

    this.dialog.open(ValidDeletionDialogComponent, dialogConfig);
  }
}
