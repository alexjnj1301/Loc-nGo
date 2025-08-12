import { Component, OnInit } from '@angular/core';
import { TitlePictureComponent } from '../title-picture/title-picture.component'
import { TranslateModule } from '@ngx-translate/core'
import { HttpCallsService } from '../../services/httpCalls.service'
import { AuthenticationService } from '../../services/authentication.service'
import { AllLieuResponse } from '../../../models/LieuModels'
import { LieuCardComponent } from './lieu-card/lieu-card.component'
import { MatCard } from '@angular/material/card'
import { MatIcon } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog'
import { AddLieuDialogComponent } from '../admin/add-lieu-dialog/add-lieu-dialog.component'

@Component({
  selector: 'app-my-lieux',
  imports: [
    TitlePictureComponent,
    TranslateModule,
    LieuCardComponent,
    MatCard,
    MatIcon,
    MatTooltip,
    MatDialogModule
  ],
  templateUrl: './my-lieux.component.html',
  styleUrl: './my-lieux.component.scss',
  standalone: true
})
export class MyLieuxComponent implements OnInit {
  public myLieux: AllLieuResponse[] = []

  public constructor(public httpCallService: HttpCallsService,
                     public authService: AuthenticationService,
                     public dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.getMyLieux();
  }

  public getMyLieux(): void {
    const userId = this.authService.getCurrentUser()?.id!
    this.httpCallService.getLieuByProprietorId(userId).subscribe({
      next: (response) => {
        this.myLieux = response
      },
      error: (error) => {
        console.error('Error fetching my lieux:', error)
      }
    })
  }

  public openDialog(id?: number): void {
    const dialogConfig = new MatDialogConfig()
    if(id) {
      dialogConfig.data = { lieu: id }
    }
    this.dialog.open(AddLieuDialogComponent, dialogConfig)
  }
}
