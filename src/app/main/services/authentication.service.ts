import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { LoginRequest, LoginResponse } from '../../models/LoginModels'
import { Constants } from '../Constants'
import { jwtDecode } from 'jwt-decode'
import { CurrentUser } from '../../models/CurrentUser'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl: string = environment.apiUrl + '/auth'
  private currentUserSubject: BehaviorSubject<CurrentUser | null>

  constructor(private constants: Constants,
              private httpClient: HttpClient) {
    const savedUser = localStorage.getItem(this.constants.CURRENT_USER_KEY)
    this.currentUserSubject = new BehaviorSubject<CurrentUser | null>(
      savedUser ? JSON.parse(savedUser) : null
    )
  }

  public isAuthenticated(): boolean {
    const token = this.getToken()
    if (!token) {
      return false
    }

    return !this.isTokenExpired(token)
  }

  public getToken(): string | null {
    return localStorage.getItem(this.constants.TOKEN_KEY)
  }

  public isTokenExpired(token: string): boolean {
    if (!token) {
      return true
    }
    try {
      const decoded = jwtDecode(token)
      const currentTime = Math.floor(Date.now() / 1000)
      return decoded.exp! < currentTime
    } catch (error) {
      console.error('Erreur lors de la vérification du token', error)
      return true
    }
  }

  public getCurrentUser(): CurrentUser | null {
    return JSON.parse(localStorage.getItem(this.constants.CURRENT_USER_KEY)!)
  }

  public onAuthChange(): Observable<CurrentUser | null> {
    return this.currentUserSubject.asObservable();
  }

  public setCurrentUser() {
    const token = this.getToken()
    if (!token) {
      return
    }

    const decoded: any = jwtDecode(token)
    const currentUser: CurrentUser = {
      firstname: decoded.firstname,
      lastname: decoded.lastname,
      email: decoded.sub,
      id: decoded.id
    }

    localStorage.setItem(this.constants.CURRENT_USER_KEY, JSON.stringify(currentUser))
    this.currentUserSubject.next(currentUser)
  }

  public logout(): void {
    localStorage.removeItem(this.constants.TOKEN_KEY)
    localStorage.removeItem(this.constants.CURRENT_USER_KEY)
    this.currentUserSubject.next(null)
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, loginRequest).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem(this.constants.TOKEN_KEY, response.token)
        this.setCurrentUser()
      })
    )
  }
}
