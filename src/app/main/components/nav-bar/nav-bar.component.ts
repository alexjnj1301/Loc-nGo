import { Component, inject } from '@angular/core'
import { MultipleTransLoaderHttp } from 'src/app/MultipleTransLoaderHttp'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { AuthenticationService } from '../../services/authentication.service'
import { SidenavService } from '../../services/sidenav.service'
import { MatToolbar } from '@angular/material/toolbar'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { MatTooltip } from '@angular/material/tooltip'
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu'
import { TranslateModule } from '@ngx-translate/core'
import { HttpCallsService } from '../../services/httpCalls.service'
import { MatDialog } from '@angular/material/dialog'
import { ConfirmHostDialogComponent } from './confirm-host-dialog/confirm-host-dialog.component'

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
    imports: [MatToolbar, MatIconButton, MatIcon, MatTooltip, RouterLink, RouterLinkActive, MatMenuTrigger, MatMenu, MatMenuItem, TranslateModule]
})
export class NavBarComponent {
  private translateService = inject(MultipleTransLoaderHttp)
  private router = inject(Router)
  protected authService = inject(AuthenticationService)
  protected sidenavService = inject(SidenavService)
  protected dialog: MatDialog = inject(MatDialog)


  langSelector: string[] = ['fr', 'en']
  currentLangDisplay: string

  public constructor(private httpCallsService: HttpCallsService) {
    this.currentLangDisplay = this.translateService.getLang()
  }

  public changeLang(lang: string): void {
    this.translateService.setLang(lang)
    this.reloadPage()
  }

  public isActiveRouteAuthentication(): boolean {
    return this.router.url === '/login' || this.router.url === '/register'
  }

  public isLoggedIn(): boolean {
    return this.authService.isAuthenticated()
  }

  public isProprietaire(): boolean {
    return this.authService.isProprietor() && this.isLoggedIn()
  }

  public logout(): void {
    this.authService.logout()
  }

  public toggleDrawer(): void {
    this.sidenavService.toggleSidenav()
  }

  public reloadPage(): void {
    window.location.reload()
  }

  public becomeProprietor() {
    this.dialog.open(ConfirmHostDialogComponent).afterClosed().subscribe(
      (result) => {
        console.log("fermeture dialog", result)
        if (result === true) {
          this.httpCallsService.becomeProprietor(this.authService.getCurrentUser()?.id!).subscribe({
            next: () => {
              this.authService.logout()
              this.router.navigate(['/login'])
            },
            error: (err: any) => {
              console.error('Error becoming proprietor:', err)
            }
          })
        }
      }
    )
  }
}
