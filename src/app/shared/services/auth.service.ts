import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, ReplaySubject } from 'rxjs-compat';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: ReplaySubject<any> = new ReplaySubject();

  constructor(
    public afAuth: AngularFireAuth,
    private http: HttpRequestService
  ) {
    this.afAuth.authState
    .flatMap(res => this.findUserInDb(res))
    .catch(err => {
      return Observable.throw(err);
    })
    .subscribe(user => this.user$.next(user));
  }

  findUserInDb (data): Observable<any> {
    const user = data ? data.toJSON() : null;
    if (user) {
      const endpoint = 'http://localhost:3000/user/find';
      const params = { email: user.email };
      return this.http.getRequest(endpoint, params);
    } else {
      return Observable.of(null);
    }
  }
}
