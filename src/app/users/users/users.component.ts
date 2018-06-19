import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { animations } from '../../shared/config/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [ animations.appear ]
})
export class UsersComponent implements OnInit {

  appearIn = 'inactive';
  users;

  constructor(
    private http: HttpRequestService
  ) { }

  ngOnInit() {
    this.getAllUsers().subscribe(
      users => {
        this.users = users;
        this.appearIn = 'active';
      });
  }

  getAllUsers(): Observable<any> {
    const endpoint = 'http://localhost:3000/user/all';
    const params = { };
    return this.http.getRequest(endpoint, params);
  }

}
