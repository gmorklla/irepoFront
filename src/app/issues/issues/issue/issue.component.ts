import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { animations } from '../../../shared/config/animations';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  animations: [ animations.hover ]
})
export class IssueComponent implements OnInit {

  @Input() issue;
  @Input() selected;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  issueDetail () {
    this.router.navigate(['/issues/issue', this.issue._id]);
  }

}
