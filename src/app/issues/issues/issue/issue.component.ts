import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  @Input() issue;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  issueDetail () {
    this.router.navigate(['/issues/issue', this.issue._id]);
  }

}
