import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs-compat';
import { ErrorSnackService } from '../../../shared/services/error-snack.service';
import { HttpRequestService } from '../../../shared/services/http-request.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-link-login',
  templateUrl: './link-login.component.html',
  styleUrls: ['./link-login.component.css']
})
export class LinkLoginComponent implements OnInit {

  usersForm: FormGroup;
  user;
  users;
  email: string;

  constructor(
    private router: Router,
    private errorSnack: ErrorSnackService,
    public afAuth: AngularFireAuth,
    private http: HttpRequestService,
    private auth: AuthService
  ) {}

  ngOnInit() {
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
    if (this.checkDomain()) {
      return;
    }
    const actionCodeSettings = {
      // Your redirect URL
      url: 'http://localhost:4200/login',
      handleCodeInApp: true
    };

    try {
      await this.afAuth.auth.sendSignInLinkToEmail(
        this.email,
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', this.email);
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
    // setTimeout(() => {
    //   this.router.navigate(['activities']);
    // }, 500);
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  checkDomain () {
    const email = this.email;
    if (email.indexOf('@') !== -1) {
      const [_, domain] = email.split('@');
      if (String(domain) === 'gmail.com' || String(domain) === 'intelmas.com' || String(domain) === 'hotmail.com') {
        return null;
      } else {
        this.errorSnack.openSnackBar('Domain not allowed', 'Ok');
        return {
          status: 'Domain not allowed'
        };
      }
    }
  }

}
