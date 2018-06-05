import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { EmitterService } from '../../shared/services/emitter.service';
import { BehaviorSubject } from 'rxjs-compat/BehaviorSubject';
import { Observable } from 'rxjs-compat';

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
