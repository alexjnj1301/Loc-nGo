import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  public canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true
    }

    this.router.navigate(['/login'])
    return false
  }
}
