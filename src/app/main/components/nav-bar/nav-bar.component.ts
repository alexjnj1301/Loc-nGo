import { Component, OnInit } from '@angular/core';
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp';
import { Router } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  translateValues: any = {}
  langSelector: string[] = ['fr', 'en']
  currentLangDisplay: string

  public constructor(private translateService: MultipleTransLoaderHttp,
                     public router: Router,
                     private authService: AuthenticationService) {
    this.currentLangDisplay = this.translateService.getLang();
  }

  ngOnInit(): void {
    this.translateService.getTranslation().subscribe((result) => {
      this.translateValues = result.nav_bar;
    });
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

  public logout(): void {
    this.authService.logout();
  }
}
