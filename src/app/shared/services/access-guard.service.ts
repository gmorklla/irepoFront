import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ErrorSnackService } from './error-snack.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { EmitterService } from '../../shared/services/emitter.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AccessGuardService implements CanActivate {

  user;

  constructor(
    private router: Router,
    private errorSnack: ErrorSnackService,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const requiresLogin = route.data.requiresLogin || false;
    const requiresAdmin = route.data.requiresAdmin || false;
    return Observable.of(true);
  }

}
