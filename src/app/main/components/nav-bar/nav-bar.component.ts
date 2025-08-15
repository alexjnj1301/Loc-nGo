import { Component, inject } from '@angular/core';
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'
import { SidenavService } from '../../services/sidenav.service'
import { NgIf, NgFor } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
    imports: [NgIf, MatToolbar, MatIconButton, MatIcon, MatTooltip, RouterLink, RouterLinkActive, MatMenuTrigger, MatMenu, MatMenuItem, NgFor, TranslateModule]
})
export class NavBarComponent {
  private translateService = inject(MultipleTransLoaderHttp);
  private router = inject(Router);
  private authService = inject(AuthenticationService);
  protected sidenavService = inject(SidenavService);

  langSelector: string[] = ['fr', 'en']
  currentLangDisplay: string

  public constructor() {
    this.currentLangDisplay = this.translateService.getLang();
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
