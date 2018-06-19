import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { MatDialog } from '@angular/material';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { animations } from '../../shared/config/animations';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
  animations: [ animations.showing ]
})
export class IssuesComponent implements OnInit {

  appearIn = 'inactive';
  issues;

  constructor(
    private http: HttpRequestService,
    public dialog: MatDialog,
  ) { }

  ngOnInit () {
    this.getAllIssues();
  }

  getAllIssues () {
    const endpoint = 'http://localhost:3000/issues';
    const params = { };
    this.http.getRequest(endpoint, params)
      .map(iss => {
        iss.issues.forEach(element => element.selected = 'not');
        return iss;
      })
      .subscribe(
        issues => {
          console.log('issues', issues);
          this.issues = issues.issues;
          this.appearIn = 'active';
        });
  }

  createIssue () {
    const data = {
      maxWidth: '80vh',
      width: '80vh',
      maxHeight: '100vh',
      height: 'auto',
      data: {}
    };
    const dialogRef = this.dialog.open(CreateIssueComponent, data);
    dialogRef.afterClosed().subscribe(() => {
      console.log('dialog closed');
    });
  }

  mouseEnter (issue) {
    issue.selected = 'selected';
  }

  mouseLeave (issue) {
    issue.selected = 'not';
  }

}
