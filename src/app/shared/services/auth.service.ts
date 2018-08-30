import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs-compat';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: ReplaySubject<any> = new ReplaySubject(null);
  admin$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    public afAuth: AngularFireAuth,
    private http: HttpRequestService
  ) {
    this.afAuth.authState
      .subscribe(user => {
        // console.log('auth service', user);
        this.user$.next(user);
        if (user) {
          this.findUserInDb(user)
            .subscribe(val => this.admin$.next(val.admin));
        }
      });
  }

  findUserInDb (data): Observable<any> {
    const endpoint = 'http://187.163.52.165:3100/user/find';
    const params = { email: data.email };
    return this.http.getRequest(endpoint, params).switchMap(val => val ? Observable.of(val) : this.saveUserInDb(data));
  }

  saveUserInDb (user): Observable<any> {
    const endpoint = 'http://187.163.52.165:3100/user/create';
    const params = { email: user.email, id: user.uid };
    return this.http.getRequest(endpoint, params);
  }
}
