import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent } from '@angular/material/dialog'
import { HttpCallsService } from '../../../../services/httpCalls.service'
import { TranslateModule } from '@ngx-translate/core'
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-set-favorite-image-dialog',
  imports: [
    MatDialogContent,
    MatDialogActions,
    TranslateModule,
    MatButton,
    MatDialogClose,
  ],
  templateUrl: './set-favorite-image-dialog.component.html',
  styleUrl: './set-favorite-image-dialog.component.scss'
})
export class SetFavoriteImageDialogComponent {
  data = inject<{
    imageUrl: string;
    lieuId: number;
    imageId: number;
}>(MAT_DIALOG_DATA);
  httpService = inject(HttpCallsService);


  public setFavoriteImage(imageId: number) {
    console.log(imageId)
    this.httpService.setImageAsFavorite(this.data.lieuId, imageId).subscribe({
      next: () => {
        console.log('Image set as favorite successfully')
        window.location.reload()
      },
      error: (error) => {
        console.error('Error setting image as favorite:', error)
      }
    })
  }
}
