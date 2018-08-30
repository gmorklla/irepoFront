import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs-compat/BehaviorSubject';
import { HttpRequestService } from '../../../../shared/services/http-request.service';
import { animations } from '../../../../shared/config/animations';
import { MatDialog } from '@angular/material';
import { AddActionComponent } from './add-action/add-action.component';
import { AuthService } from '../../../../shared/services/auth.service';
import { ErrorSnackService } from '../../../../shared/services/error-snack.service';
import { Observable } from 'rxjs/Observable';

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
  user;

  constructor(
    private route: ActivatedRoute,
    private http: HttpRequestService,
    private dialog: MatDialog,
    private auth: AuthService,
    private errorSnack: ErrorSnackService
  ) {
    this.route.params.subscribe( params => {
      this.id = params.id;
      this.getIssueData();
    });
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
  }

  getIssueData () {
    const endpoint = 'http://187.163.52.165:3100/issues';
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

  close (): void {
    const closeIssue = confirm('Do yo really want to close this issue?');
    Observable
      .of(closeIssue)
      .filter(val => val)
      .switchMap(_ => this.closeCall())
      .subscribe(
        issue => {
          this.issue$.next(issue);
          this.errorSnack.openSnackBar(`Issue closed`, 'Ok');
        },
        error => this.errorSnack.openSnackBar(`Error: ${error.message}`, 'Ok')
      );
  }

  closeCall (): Observable<any> {
    const endpoint = 'http://187.163.52.165:3100/close';
    const params = {
      id: this.id,
      engineer: this.user.email,
    };
    return this.http.getRequest(endpoint, params);
  }

  reopen (): void {
    const reopenIssue = confirm('Do yo really want to re-open this issue?');
    Observable
      .of(reopenIssue)
      .filter(val => val)
      .switchMap(_ => this.reopenCall())
      .subscribe(
        issue => {
          this.issue$.next(issue);
          this.errorSnack.openSnackBar(`Issue re-open`, 'Ok');
        },
        error => this.errorSnack.openSnackBar(`Error: ${error.message}`, 'Ok')
      );
  }

  reopenCall (): Observable<any> {
    const endpoint = 'http://187.163.52.165:3100/reopen';
    const params = {
      id: this.id,
      engineer: this.user.email,
    };
    return this.http.getRequest(endpoint, params);
  }

}
