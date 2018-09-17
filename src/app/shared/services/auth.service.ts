import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs-compat';
import { HttpRequestService } from './http-request.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: ReplaySubject<any> = new ReplaySubject(null);
  admin$: BehaviorSubject<any> = new BehaviorSubject(null);
  url: string = environment.url;

  constructor(
    public afAuth: AngularFireAuth,
    private http: HttpRequestService
  ) {
    this.afAuth.authState
      .do(user => this.user$.next(user))
      .switchMap(user => this.findUserInDb(user))
      .subscribe(val => this.admin$.next(val.admin));
  }

  findUserInDb(data): Observable<any> {
    if (data) {
      const endpoint = 'http://' + this.url + '/user/find';
      const params = { email: data.email };
      return this.http
        .getRequest(endpoint, params)
        .switchMap(val => (val ? Observable.of(val) : this.saveUserInDb(data)));
    } else {
      return Observable.empty();
    }
  }

  saveUserInDb(user): Observable<any> {
    const endpoint = 'http://' + this.url + '/user/create';
    const params = { email: user.email, id: user.uid };
    return this.http.getRequest(endpoint, params);
  }
}
