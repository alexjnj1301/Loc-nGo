import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateBookRequest } from 'src/app/enums/admin';
import { BookRequest } from 'src/app/models/ContactInformations';
import { environment } from '../../../environments/environment'
import { AllReservationsByUserId, Reservation } from '../../models/ReservationPerUser'
import { AllLieuResponse, LieuDetailsResponse } from '../../models/LieuModels'

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {
  private baseUrl: string = environment.apiUrl + '/api'
  constructor(private http: HttpClient) {}

  public getAllReservationsByUserId(userId: number): Observable<AllReservationsByUserId[]> {
    return this.http.get<AllReservationsByUserId[]>(`${this.baseUrl}/reservations/user/${userId}`);
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

  public getAllLieu(): Observable<AllLieuResponse[]> {
    return this.http.get<AllLieuResponse[]>(`${this.baseUrl}/lieu`);
  }

  public getLieuById(id: string): Observable<LieuDetailsResponse> {
    return this.http.get<LieuDetailsResponse>(`${this.baseUrl}/lieu/${id}`);
  }

  public getReservationsByLieuId(id: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservations/lieu/${id}`);
  }

  public getLieuByProprietorId(id: number): Observable<AllLieuResponse[]> {
    return this.http.get<AllLieuResponse[]>(`${this.baseUrl}/lieu/proprietor/${id}`);
  }
}
