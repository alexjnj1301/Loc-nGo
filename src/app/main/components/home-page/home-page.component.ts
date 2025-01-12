import { Component, OnInit } from '@angular/core'
import { AllLieuResponse } from '../../../models/LieuModels'
import { HttpCallsService } from '../../services/httpCalls.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public listLieux: AllLieuResponse[] = []

  constructor(private httpCallsService: HttpCallsService) { }

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
