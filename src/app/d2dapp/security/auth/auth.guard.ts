import { Injectable } from '@angular/core';
import { CanActivate, Router,
    ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private _authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (!this._authService.isLoggedIn()) {
            this.router.navigate(['/pages/signin']);
            return false;
        }
        return true;
    }

}
