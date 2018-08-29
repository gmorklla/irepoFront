import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { animations } from '../../shared/config/animations';
import { AuthService } from '../../shared/services/auth.service';
import { ErrorSnackService } from '../../shared/services/error-snack.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [ animations.appear ]
})
export class UsersComponent implements OnInit {

  appearIn = 'inactive';
  users;
  user;

  constructor(
    private http: HttpRequestService,
    private auth: AuthService,
    private errorSnack: ErrorSnackService,
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
    this.getAllUsers().subscribe(
      users => {
        this.users = users;
        this.appearIn = 'active';
      });
  }

  getAllUsers(): Observable<any> {
    const endpoint = 'http://localhost:3100/user/all';
    const params = { };
    return this.http.getRequest(endpoint, params);
  }

  switchRole (e) {
    const endpoint = 'http://localhost:3100/switchRole';
    const params = {
      id: e._id,
      engineer: this.user.email
    };
    this.http.getRequest(endpoint, params)
      .switchMap(_ => this.getAllUsers())
      .subscribe(
        users => {
          this.users = users;
          this.appearIn = 'active';
          this.errorSnack.openSnackBar(`Switched!`, 'Ok');
        },
        error => this.errorSnack.openSnackBar(`Error: ${error.message}`, 'Ok')
      );
  }

}
