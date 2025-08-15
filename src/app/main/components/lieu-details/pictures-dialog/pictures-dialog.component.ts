import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog'
import { ImageDialogData } from '../../../../models/LieuModels'
import { TranslateModule } from '@ngx-translate/core'

@Component({
    selector: 'app-pictures-dialog',
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogModule,
        TranslateModule,
    ],
    templateUrl: './pictures-dialog.component.html',
    styleUrl: './pictures-dialog.component.scss'
})
export class PicturesDialogComponent {
  data = inject<ImageDialogData>(MAT_DIALOG_DATA);

  public images: ImageDialogData
  public imgUrl: string
  public constructor() {
    const data = this.data;

    this.images = data
    this.imgUrl = this.getImageToDisplayViaUrl(data.url)
  }

  public getImageToDisplayViaId(id: number): string {
    if (!this.images || !this.images.images.length) {
      return this.images.images[0]?.imageUrl
    }

    return this.imgUrl = this.images.images.find(image => image.id === id)?.imageUrl!
  }

  public getImageToDisplayViaUrl(url: string): string {
    if (!this.images || !this.images.images.length) {
      return this.images.images[0]?.imageUrl
    }

    return this.imgUrl = this.images.images.find(image => image.imageUrl === url)?.imageUrl!
  }

  public changeImage(i: number) {
    this.imgUrl = this.getImageToDisplayViaId(i)
  }
}
