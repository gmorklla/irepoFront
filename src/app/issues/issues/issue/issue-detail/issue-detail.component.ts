import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../../shared/services/http-request.service';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit {

  id;
  issue;

  constructor(
    private route: ActivatedRoute,
    private http: HttpRequestService
  ) {
    this.route.params.subscribe( params => {
      this.id = params.id;
      this.getIssueData();
    });
  }

  ngOnInit() {}

  getIssueData () {
    const endpoint = 'http://localhost:3000/issues';
    const params = { id: this.id };
    this.http.getRequest(endpoint, params).subscribe(
      issue => this.issue = issue
    );
  }

}
