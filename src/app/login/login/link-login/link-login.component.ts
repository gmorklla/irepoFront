import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ErrorSnackService } from '../../../shared/services/error-snack.service';
import { HttpRequestService } from '../../../shared/services/http-request.service';
import { AuthService } from '../../../shared/services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-link-login',
  templateUrl: './link-login.component.html',
  styleUrls: ['./link-login.component.css']
})
export class LinkLoginComponent implements OnInit {

  loginForm: FormGroup;
  user;
  users: Observable<any>;
  email: string;
  userInDb = false;
  url: string = environment.url;

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
      email: [ '', [Validators.required, Validators.email, ValidateDomain] ],
      password: [ '', [Validators.required, ValidatePassword]]
    };
    this.loginForm = this.fb.group(opts);
    this.auth.user$.subscribe(user => this.user = user);
    this.users = this.http.getRequest('http://' + this.url + '/user/all', {});
    this.loginForm.get('email').valueChanges
      .switchMap(input => this.users
        .map(users => {
          const inOrNot = users.findIndex(user => {
            const reg = new RegExp(input, 'gi');
            return reg.test(user.email);
          });
          return inOrNot !== -1 ? true : false;
        })
      ).subscribe(val => this.userInDb = val);
  }

  redirect() {
    setTimeout(() => {
      this.router.navigate(['issues']);
    }, 500);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
  // Create
  signUpWithEmail() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => console.log('login', user))
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
  // Login
  loginWithEmail() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

}

import { AbstractControl } from '@angular/forms';

export function ValidateDomain(control: AbstractControl) {
  const validation = /(gmail.com|hotmail.com|intelmas.com)$/.test(control.value);
  return validation ? null : { validDomain: true };
}

export function ValidatePassword(control: AbstractControl) {
  const validation = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(control.value);
  return validation ? null : { validPassword: true };
}
