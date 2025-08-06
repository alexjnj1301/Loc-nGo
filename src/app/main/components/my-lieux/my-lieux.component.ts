import { Component, OnInit } from '@angular/core';
import { TitlePictureComponent } from '../title-picture/title-picture.component'
import { TranslateModule } from '@ngx-translate/core'
import { HttpCallsService } from '../../services/httpCalls.service'
import { AuthenticationService } from '../../services/authentication.service'
import { AllLieuResponse } from '../../../models/LieuModels'
import { LieuCardComponent } from './lieu-card/lieu-card.component'

@Component({
  selector: 'app-my-lieux',
  imports: [
    TitlePictureComponent,
    TranslateModule,
    LieuCardComponent,
  ],
  templateUrl: './my-lieux.component.html',
  styleUrl: './my-lieux.component.scss',
  standalone: true
})
export class MyLieuxComponent implements OnInit {
  public myLieux: AllLieuResponse[] = []

  public constructor(public httpCallService: HttpCallsService,
                     public authService: AuthenticationService) {
  }

  public ngOnInit(): void {
    this.getMyLieux();
  }

  public getMyLieux(): void {
    const userId = this.authService.getCurrentUser()?.id!
    this.httpCallService.getLieuByProprietorId(userId).subscribe({
      next: (response) => {
        this.myLieux = response;
      },
      error: (error) => {
        console.error('Error fetching my lieux:', error);
      }
    });
  }
}
