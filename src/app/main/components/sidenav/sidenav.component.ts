import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { SidenavService } from '../../services/sidenav.service'
import { AuthenticationService } from '../../services/authentication.service'
import { CurrentUser } from '../../../models/CurrentUser'
import { AllReservationsByUserId, Reservation } from '../../../models/ReservationPerUser'
import { HttpCallsService } from '../../services/httpCalls.service'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
    standalone: false
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') public drawer!: MatDrawer
  public currentUser: CurrentUser | null = null
  public reservations: AllReservationsByUserId[] = []
  private authSubscription!: Subscription

  constructor(protected sideNavService: SidenavService,
              protected authService: AuthenticationService,
              private httpCallsService: HttpCallsService) {
  }

  public ngOnInit(): void {
    this.sideNavService.toggleSidenav$.subscribe(() => {
      this.toggleSideNav()
    })
    this.authSubscription = this.authService.onAuthChange().subscribe({
      next: (user: CurrentUser | null) => {
        this.currentUser = user
        if (user) {
          this.getReservations()
        } else {
          this.reservations = []
        }
      },
      error: (error: any) => {
        console.error('Error:', error)
      }
    })

    if (this.authService.isAuthenticated()) {
      this.getReservations()
    }
  }

  public ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe()
    }
  }

  public toggleSideNav(): void {
    this.drawer.toggle()
  }

  public isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  public logout(): void {
    this.authService.logout()
  }

  public getReservations(): void {
    if (this.isLoggedIn()) {
      this.httpCallsService.getAllReservationsByUserId(this.authService.getCurrentUser()!.id).subscribe({
        next: (reservations: AllReservationsByUserId[]) => {
          this.reservations = reservations
          console.log('reservations:', this.reservations)
        },
        error: (error: any) => {
          console.error('Error:', error)
        }
      })
    }
  }
}
