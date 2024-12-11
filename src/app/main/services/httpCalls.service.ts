import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateBookRequest } from 'src/app/enums/admin';
import { BookRequest } from 'src/app/models/ContactInformations';
import { environment } from '../../../environments/environment'
import { Reservation } from '../../models/ReservationPerUser'

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {
  private baseUrl: string = environment.apiUrl + '/api'
  constructor(private http: HttpClient) {}

  public getAllReservationsByUserId(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservations/user/${userId}`);
  }

  public postBookRequest(bookRequest: BookRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservations`, bookRequest);
  }

  public updateReservation(id: number, requestBody: UpdateBookRequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/reservations/${id}`, requestBody);
  }

  public deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reservations/${id}`);
  }

  public getAllReservationsBeginDates(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/getbegindates`);
  }
}
