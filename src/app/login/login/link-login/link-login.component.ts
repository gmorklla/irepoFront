import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
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
  signUpForm: FormGroup;
  user;
  email: string;
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
    const loginOpts = {
      email: ['', [Validators.required, Validators.email, ValidateDomain]],
      password: ['', [Validators.required, ValidatePassword]]
    };
    const signUpOpts = {
      email: ['', [Validators.required, Validators.email, ValidateDomain]],
      password: ['', [Validators.required, ValidatePassword]],
      confirm: ['', [Validators.required]]
    };
    this.loginForm = this.fb.group(loginOpts);
    this.signUpForm = this.fb.group(signUpOpts, {
      validator: ConfirmPassword
    });
    this.auth.user$.subscribe(user => (this.user = user));
  }
  // Function to check if typed match any registered user
  inputIsInDb(input): Observable<boolean> {
    return this.http
      .getRequest('http://' + this.url + '/user/all', {})
      .map(users => {
        const inOrNot = users.findIndex(user => {
          const reg = new RegExp(input, 'gi');
          return reg.test(user.email);
        });
        return inOrNot !== -1 ? true : false;
      });
  }

  redirect() {
    setTimeout(() => this.router.navigate(['issues']), 500);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
  // Create
  signUpWithEmail() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => this.redirect())
      .catch(error => {
        this.errorSnack.openSnackBar(error.message, 'Ok');
        console.log(error);
      });
  }
  // Login
  loginWithEmail() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => this.redirect())
      .catch(error => {
        this.errorSnack.openSnackBar(error.message, 'Ok');
        console.log(error);
      });
  }
  // Reset password
  resetPassword() {
    const email = this.loginForm.get('email').value;
    console.log('reset', email);
    this.afAuth.auth
      .sendPasswordResetEmail(email)
      .then(val =>
        this.errorSnack.openSnackBar(
          'Check your email to reset your password!',
          'Ok'
        )
      )
      .catch(error => {
        this.errorSnack.openSnackBar(error.message, 'Ok');
        console.log(error);
      });
  }
}

import { AbstractControl } from '@angular/forms';

export function ValidateDomain(control: AbstractControl) {
  const validation = /(gmail.com|hotmail.com|intelmas.com)$/.test(
    control.value
  );
  return validation ? null : { validDomain: true };
}

export function ValidatePassword(control: AbstractControl) {
  const validation = /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(
    control.value
  );
  return validation ? null : { validPassword: true };
}

export function ConfirmPassword(control: AbstractControl) {
  const password = control.get('password').value;
  const confirm = control.get('confirm').value;
  const validation = password === confirm;
  return validation ? null : { validPassword: true };
}
