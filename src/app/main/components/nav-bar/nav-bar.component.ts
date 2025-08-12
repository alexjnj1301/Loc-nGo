import { Component, OnInit } from '@angular/core';
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp';
import { Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'
import { SidenavService } from '../../services/sidenav.service'

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
    standalone: false
})
export class NavBarComponent implements OnInit {
  langSelector: string[] = ['fr', 'en']
  currentLangDisplay: string

  public constructor(private translateService: MultipleTransLoaderHttp,
                     private router: Router,
                     private authService: AuthenticationService,
                     protected sidenavService: SidenavService) {
    this.currentLangDisplay = this.translateService.getLang();
  }

  ngOnInit(): void {
  }

  public changeLang(lang: string): void {
    this.translateService.setLang(lang);
    window.location.reload();
  }

  public isActiveRouteAuthentication(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }

  public isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  public isProprietaire(): boolean {
    return this.authService.isProprietor() && this.isLoggedIn();
  }

  public logout(): void {
    this.authService.logout();
  }

  public toggleDrawer(): void {
    this.sidenavService.toggleSidenav();
  }
}
