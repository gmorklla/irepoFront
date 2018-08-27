import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { ErrorSnackService } from '../../../shared/services/error-snack.service';
import { HttpRequestService } from '../../../shared/services/http-request.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-link-login',
  templateUrl: './link-login.component.html',
  styleUrls: ['./link-login.component.css']
})
export class LinkLoginComponent implements OnInit {

  loginForm: FormGroup;
  user;
  users;
  email: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private errorSnack: ErrorSnackService,
    public afAuth: AngularFireAuth,
    private http: HttpRequestService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const opts = {
      email: [ '', [Validators.required, Validators.email, ValidateDomain] ]
    };
    this.loginForm = this.fb.group(opts);
    this.auth.user$.subscribe(user => this.user = user);
    const url = this.router.url;
    if (url.includes('signIn')) {
      this.confirmSignIn(url);
    }
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

  saveUserInDb (user): Observable<any> {
    const endpoint = 'http://localhost:3000/user/create';
    const params = { email: user.email, id: user.uid };
    return this.http.getRequest(endpoint, params);
  }

  async sendEmailLink () {
    const actionCodeSettings = {
      // Your redirect URL
      url: 'http://localhost:4200/login',
      handleCodeInApp: true
    };

    try {
      await this.afAuth.auth.sendSignInLinkToEmail(
        this.loginForm.get('email').value,
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', this.loginForm.get('email').value);
      this.errorSnack.openSnackBar('Please check your email. We sent you an email with your login link', 'Ok');
    } catch (err) {
      this.errorSnack.openSnackBar(err.message, 'Ok');
    }
  }

  async confirmSignIn(url) {
    try {
      if (this.afAuth.auth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn');

        // If missing email, prompt user for it
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        // Signin user and remove the email localStorage
        await this.afAuth.auth.signInWithEmailLink(email, url).then(val => {
          if (val) {
            this.saveUser(val);
          }
        });
      }
    } catch (err) {
      this.errorSnack.openSnackBar(err.message, 'Ok');
    }
  }

  saveUser (val) {
    this.saveUserInDb(val.user).subscribe(res => {
      this.errorSnack.openSnackBar('Welcome!', 'OK');
      window.localStorage.removeItem('emailForSignIn');
    });
    setTimeout(() => {
      this.router.navigate(['issues']);
    }, 500);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}

import { AbstractControl } from '@angular/forms';

export function ValidateDomain(control: AbstractControl) {
  const validation = /(gmail.com|hotmail.com|intelmas.com)$/.test(control.value);
  return validation ? null : { validDomain: true };
}
