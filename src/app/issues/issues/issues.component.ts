import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { Observable } from 'rxjs-compat';
import { BehaviorSubject } from 'rxjs-compat/BehaviorSubject';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
  animations: [
    trigger('showing', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter',
          stagger('300ms', [
            animate('.6s ease-in',
              keyframes([
                style({opacity: 0, offset: 0}),
                style({opacity: .5, offset: 0.3}),
                style({opacity: 1, offset: 1.0}),
              ])
            )
          ]),
          {optional: true})
      ])
    ])
  ]
})
export class IssuesComponent implements OnInit {

  appearIn = 'inactive';
  issues;

  constructor(
    private http: HttpRequestService
  ) { }

  ngOnInit () {
    this.getAllIssues();
  }

  getAllIssues () {
    const endpoint = 'http://localhost:3000/issues';
    const params = { };
    this.http.getRequest(endpoint, params).subscribe(
      issues => {
        this.issues = issues.issues;
        this.appearIn = 'active';
      });
  }

  createIssue () {
    console.log('Creating issue');
  }

}
