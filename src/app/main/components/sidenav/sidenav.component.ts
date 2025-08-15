import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav'
import { SidenavService } from '../../services/sidenav.service'
import { AuthenticationService } from '../../services/authentication.service'
import { CurrentUser } from '../../../models/CurrentUser'
import { AllReservationsByUserId } from '../../../models/ReservationPerUser'
import { HttpCallsService } from '../../services/httpCalls.service'
import { Subscription } from 'rxjs'
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { ReservationCardComponent } from './reservation-card/reservation-card.component';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss',
    imports: [MatDrawerContainer, MatDrawer, MatIcon, MatTooltip, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, ReservationCardComponent, RouterOutlet, TranslateModule]
})
export class SidenavComponent implements OnInit, OnDestroy {
  protected sideNavService = inject(SidenavService);
  protected authService = inject(AuthenticationService);
  private httpCallsService = inject(HttpCallsService);

  @ViewChild('drawer') public drawer!: MatDrawer
  public currentUser: CurrentUser | null = null
  public reservations: AllReservationsByUserId[] = []
  private authSubscription!: Subscription

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
        },
        error: (error: any) => {
          console.error('Error:', error)
        }
      })
    }
  }
}
