import { Component, Input } from '@angular/core';
import { AllLieuResponse } from '../../../../models/LieuModels'
import { MatCard, MatCardContent } from '@angular/material/card'
import { Constants } from '../../../Constants'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { RouterLink } from '@angular/router'
import { MatTooltip } from '@angular/material/tooltip'
import { TranslateModule } from '@ngx-translate/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { ValidDeletionDialogComponent } from '../../admin/valid-deletion-dialog/valid-deletion-dialog.component'
import { AddLieuDialogComponent } from '../../admin/add-lieu-dialog/add-lieu-dialog.component'

@Component({
  selector: 'app-lieu-card',
  imports: [
    MatCard,
    MatCardContent,
    MatIconButton,
    MatIcon,
    RouterLink,
    MatTooltip,
    TranslateModule,
  ],
  templateUrl: './lieu-card.component.html',
  styleUrl: './lieu-card.component.scss',
  standalone: true
})
export class LieuCardComponent {
  @Input() lieu!: AllLieuResponse
  public constructor(public constants: Constants,
                     public dialog: MatDialog) {
  }

  public openDeletionDialog(lieuId: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = { id: lieuId }
    dialogConfig.enterAnimationDuration = '0ms'
    dialogConfig.exitAnimationDuration = '0ms'

    this.dialog.open(ValidDeletionDialogComponent, dialogConfig)
  }

  public openUpdateDialog(lieuId: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = { id: lieuId }
    dialogConfig.enterAnimationDuration = '0ms'
    dialogConfig.exitAnimationDuration = '0ms'

    this.dialog.open(AddLieuDialogComponent, dialogConfig);
  }
}
