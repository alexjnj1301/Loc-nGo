import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AppComponent } from '../../../app.component'
import { HttpCallsService } from '../../services/httpCalls.service'
import { LieuDetailsResponse } from '../../../models/LieuModels'
import { Tile } from '../../../models/Tile'
import { Observable, tap, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Constants } from '../../Constants'

@Component({
  selector: 'app-lieu-details',
  templateUrl: './lieu-details.component.html',
  styleUrl: './lieu-details.component.scss'
})
export class LieuDetailsComponent implements OnInit {
  public lieuId: string = ''
  public tiles: Tile[] = []
  public lieuDetails: LieuDetailsResponse | null = null

  constructor(private route: ActivatedRoute,
              private appComponent: AppComponent,
              private httpCallsService: HttpCallsService,
              private constants: Constants,) {
  }

  public ngOnInit(): void {
    this.lieuId = this.route.snapshot.paramMap.get('id')!;

    this.getLieuDetails().subscribe({
      next: (response: LieuDetailsResponse) => {
        this.lieuDetails = response;
        this.tiles = [
          { img: this.lieuDetails.favorite_picture, cols: 2, rows: 2, color: 'transparent', class: 'principal-picture' },
          { img: this.lieuDetails.images?.at(0)?.imageUrl ? this.lieuDetails.images.at(0)?.imageUrl : '', cols: 2, rows: 1, color: 'transparent', class: 'test' },
          { img: this.lieuDetails.images?.at(1)?.imageUrl ? this.lieuDetails.images.at(1)?.imageUrl : '', cols: 2, rows: 1, color: 'transparent', class: 'test' }
        ];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des détails du lieu:', err);
      }
    });
  }

  public getLieuDetails(): Observable<LieuDetailsResponse> {
    this.appComponent.isLoading = true;
    return this.httpCallsService.getLieuById(this.lieuId).pipe(
      tap(() => this.appComponent.isLoading = false),
      catchError((error) => {
        console.error('get lieu details error:', error)
        this.appComponent.isLoading = false
        return throwError(() => error)
      })
    );
  }
}
