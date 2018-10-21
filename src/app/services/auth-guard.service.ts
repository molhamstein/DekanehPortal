import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute,state)
  }
  constructor (private router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!!localStorage.getItem('token'))
      return true;
    this.router.navigate(['auth/login'])

    return false;


  }
}
