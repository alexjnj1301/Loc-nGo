import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router'
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root',
})
export class ProprietorGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

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
