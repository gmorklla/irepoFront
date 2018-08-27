import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs-compat/BehaviorSubject';

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
