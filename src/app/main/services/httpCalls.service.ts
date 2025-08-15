import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { UpdateBookRequest } from 'src/app/enums/admin'
import { BookRequest } from 'src/app/models/ContactInformations'
import { environment } from '../../../environments/environment'
import { AllReservationsByUserId, Reservation } from '../../models/ReservationPerUser'
import { AddLieuRequest, AllLieuResponse, getImagesOfLieuResponse, LieuDetailsResponse } from '../../models/LieuModels'
import { GetAllServices } from '../../models/Services'

@Injectable({
  providedIn: 'root'
})
export class HttpCallsService {
  private http = inject(HttpClient);

  private baseUrl: string = environment.apiUrl + '/api'

  public getAllReservationsByUserId(userId: number): Observable<AllReservationsByUserId[]> {
    return this.http.get<AllReservationsByUserId[]>(`${this.baseUrl}/reservations/user/${userId}`)
  }

  public postBookRequest(bookRequest: BookRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/reservations`, bookRequest)
  }

  public updateReservationStatus(id: number, requestBody: UpdateBookRequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/reservations/status/${id}`, requestBody)
  }

  public deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reservations/${id}`)
  }

  public getAllReservationsBeginDates(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/getbegindates`)
  }

  public getAllLieu(): Observable<AllLieuResponse[]> {
    return this.http.get<AllLieuResponse[]>(`${this.baseUrl}/lieu`)
  }

  public getLieuById(id: string): Observable<LieuDetailsResponse> {
    return this.http.get<LieuDetailsResponse>(`${this.baseUrl}/lieu/${id}`)
  }

  public getReservationsByLieuId(id: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservations/lieu/${id}`)
  }

  public getLieuByProprietorId(id: number): Observable<AllLieuResponse[]> {
    return this.http.get<AllLieuResponse[]>(`${this.baseUrl}/lieu/proprietor/${id}`)
  }

  public getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.baseUrl}/reservations/${id}`)
  }

  public deleteLieuById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/lieu/${id}`)
  }

  public addLieu(request: AddLieuRequest): Observable<LieuDetailsResponse> {
    return this.http.post<LieuDetailsResponse>(`${this.baseUrl}/lieu`, request)
  }

  public getAllServices(): Observable<GetAllServices[]> {
    return this.http.get<GetAllServices[]>(`${this.baseUrl}/services`)
  }

  public addServicesToLieu(id: number, servicesId: number[]): Observable<AllLieuResponse> {
    return this.http.post<AllLieuResponse>(`${this.baseUrl}/lieu/${id}/addservice`, {servicesId})
  }

  public addImageToLieu(file: File, lieuId: number): Observable<any> {
    // add a multipart form data to send the file
    const formData = new FormData()
    formData.append('file', file)

    return this.http.post<any>(`${this.baseUrl}/images/lieu/s3/${lieuId}`, formData)
  }

  public getImagesOfLieu(lieuId: number): Observable<getImagesOfLieuResponse[]> {
    return this.http.get<getImagesOfLieuResponse[]>(`${this.baseUrl}/images/lieu/${lieuId}`)
  }

  public setImageAsFavorite(lieuId: number, imageId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/lieu/favorite-picture`, { lieuId: lieuId, imageId: imageId })
  }
}
