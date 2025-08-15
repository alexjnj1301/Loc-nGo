import { inject, Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root',
})
export class ProprietorGuard implements CanActivate {
  private authService = inject(AuthenticationService);
  private router = inject(Router);


  public canActivate(): boolean {
    if(this.authService.isProprietor() && this.authService.isAuthenticated()) {
      console.log('ProprietorGuard: User is a proprietor, access granted.')
      return true
    }
    else {
      this.router.navigate(['/error/403'])
      return false
    }
  }
}
