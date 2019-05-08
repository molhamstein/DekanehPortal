import { ConstService } from './const.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(private router: Router, private constSer: ConstService) {
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (localStorage.getItem('token'))
            if (localStorage.getItem('clientType') != null) {
                var url = state.url.split('/');
                console.log(url);
                if (url[1] == "" && localStorage.getItem('clientType') == 'warehouseKeeper') {
                    this.router.navigate(['home']);
                    return true
                }
                else if (url[1] == "home" && localStorage.getItem('clientType') != 'warehouseKeeper') {
                    this.router.navigate(['']);
                    return true
                }

                else if ((url[1] == "home" && localStorage.getItem('clientType') == 'warehouseKeeper') || (url[1] == "" && localStorage.getItem('clientType') != 'warehouseKeeper')) {
                    return true
                }

                else if (this.constSer.cheachRole(url[1], url[2]) == true)
                    return true
                else {
                    this.router.navigate(['']);
                    return false;
                }
            }
            else
                return true;
        if (!localStorage.getItem('token')) {
            this.router.navigate(['auth/login']);
            return false;
        }

    }
}
