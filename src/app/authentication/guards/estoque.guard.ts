import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EstoqueGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    if (this.authenticationService.isAuthenticated) {
      const authorized =   this.authenticationService.isRole('estoque') ||  this.authenticationService.isRole('admin') ;

      return authorized ? true : this.router.createUrlTree(['/']);
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
