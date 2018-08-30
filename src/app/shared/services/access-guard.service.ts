import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ErrorSnackService } from './error-snack.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AccessGuardService implements CanActivate {

  user;

  constructor(
    private router: Router,
    private errorSnack: ErrorSnackService,
    private auth: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const requiresAdmin = route.data.requiresAdmin || false;
    return this.auth.user$
      .map(auth => {
        const login = auth ? true : false;
        const admin = login ? this.auth.admin$.value ? true : false : false;
        return requiresAdmin ? admin : login;
      })
      .do(authenticated => {
        this.user = authenticated;
        if (!authenticated) {
          this.errorSnack.openSnackBar('Not allowed', 'Ok');
          this.router.navigate([this.router.url]);
        }
      });
  }

}
