import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { Routes, RouterModule } from '@angular/router';

@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
  }

}
