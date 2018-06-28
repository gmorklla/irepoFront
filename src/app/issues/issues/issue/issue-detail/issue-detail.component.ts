import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs-compat/BehaviorSubject';
import { HttpRequestService } from '../../../../shared/services/http-request.service';
import { animations } from '../../../../shared/config/animations';
import { MatDialog } from '@angular/material';
import { AddActionComponent } from './add-action/add-action.component';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css'],
  animations: [ animations.appear ]
})
export class IssueDetailComponent implements OnInit {

  id;
  issue$: BehaviorSubject<any> = new BehaviorSubject(null);
  appearIn = 'inactive';

  constructor(
    private route: ActivatedRoute,
    private http: HttpRequestService,
    private dialog: MatDialog,
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
    this.http.getRequest(endpoint, params)
      .subscribe(data => {
        this.issue$.next(data);
        this.appearIn = 'active';
      });
  }

  addAction () {
    const data = {
      maxWidth: '80vh',
      width: '80vh',
      maxHeight: '100vh',
      height: 'auto',
      data: { issue: this.issue$ }
    };
    const dialogRef = this.dialog.open(AddActionComponent, data);
    dialogRef.afterClosed().subscribe(issue => issue ? this.issue$.next(issue) : null);
  }

}
