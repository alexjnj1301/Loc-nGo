import { Component, OnInit } from '@angular/core';
import { HttpCallsService } from '../../services/httpCalls.service';
import { BookResponse } from 'src/app/models/ContactInformations';
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public reservationList: BookResponse[] = []
  public homePageTranslateValues: any = {}

  constructor(private httpService: HttpCallsService,
    private translateValues: MultipleTransLoaderHttp) { }

  public ngOnInit(): void {
    this.translateValues.getTranslation().subscribe((result) => {
      this.homePageTranslateValues = result.homePage;
    })
    this.httpService.getAllReservations().subscribe({
      next: (reservations: BookResponse[]) => {
        this.reservationList = reservations;
        console.log(this.reservationList);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  public seeDetails(id: number): void {
    console.log(id);
  }

  public deleteReservation(id: number): void {
    console.log(id);
  }
}
