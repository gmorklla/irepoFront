import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { Observable } from 'rxjs-compat';
import { HttpRequestService } from '../../shared/services/http-request.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('appear', [
      state('inactive', style({
        opacity: 0,
        transform: 'translateY(30%)'
      })),
      state('active', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('inactive => active', animate('500ms ease-out')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
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
