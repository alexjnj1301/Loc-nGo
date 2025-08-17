import { Component, inject, Input, OnInit } from '@angular/core'
import { AllLieuResponse } from '../../../../models/LieuModels'
import { Router } from '@angular/router'
import { Constants } from '../../../Constants'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { MatIcon } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'

@Component({
    selector: 'app-lieu-card',
    templateUrl: './lieu-card.component.html',
    styleUrl: './lieu-card.component.scss',
  imports: [MatProgressSpinner, MatIcon, TranslateModule],
})
export class LieuCardComponent implements OnInit {
  private router = inject(Router)
  constants = inject(Constants)

  @Input() lieu!: AllLieuResponse
  public isImageLoaded = false

  public ngOnInit(): void {
    this.isImageLoaded = false
  }

  public onImageLoad(): void {
    this.isImageLoaded = true
  }

  public redirect(): void {
    this.router.navigate(['/lieu-details', this.lieu.id])
  }
}
