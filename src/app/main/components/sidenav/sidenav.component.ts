import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { SidenavService } from '../../services/sidenav.service'
import { AuthenticationService } from '../../services/authentication.service'
import { CurrentUser } from '../../../models/CurrentUser'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  @ViewChild('drawer') public drawer!: MatDrawer
  public currentUser: CurrentUser | null = null

  constructor(protected sideNavService: SidenavService,
              protected authService: AuthenticationService) {
  }

  public ngOnInit(): void {
    this.sideNavService.toggleSidenav$.subscribe(() => {
      this.toggleSideNav()
    })
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
}
