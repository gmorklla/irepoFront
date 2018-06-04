import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { EmitterService } from '../../shared/services/emitter.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

@Injectable()
export class CheckUserService {

  userS: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState
      .subscribe(user => {
        this.userS.next(user);
      });
  }

}
