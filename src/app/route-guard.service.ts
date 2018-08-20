import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.auth.isUserLoggedIn());

    return true;

  }

}
