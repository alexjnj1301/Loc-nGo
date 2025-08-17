import { Component, OnInit, inject } from '@angular/core'
import { AllLieuResponse } from '../../../models/LieuModels'
import { HttpCallsService } from '../../services/httpCalls.service'
import { TitlePictureComponent } from '../title-picture/title-picture.component'
import { LieuCardComponent } from './lieu-card/lieu-card.component'
import { TranslateModule } from '@ngx-translate/core'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    imports: [TitlePictureComponent, LieuCardComponent, TranslateModule]
})
export class HomePageComponent implements OnInit {
  private httpCallsService = inject(HttpCallsService)

  public listLieux: AllLieuResponse[] = []

  public ngOnInit(): void {
    this.getAllLieu()
  }

  private getAllLieu() {
    this.httpCallsService.getAllLieu().subscribe({
      next: (response) => {
        this.listLieux = response
      },
      error: (error) => {
        console.error(error)
      }
    })
  }
}
