import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../shared/services/http-request.service';
import { MatDialog } from '@angular/material';
import { CreateIssueComponent } from './create-issue/create-issue.component';
import { animations } from '../../shared/config/animations';
import { BehaviorSubject } from 'rxjs-compat';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
  animations: [ animations.showing, animations.appearDisplay ]
})
export class IssuesComponent implements OnInit {

  appearIn = 'inactive';
  issues$: BehaviorSubject<any> = new BehaviorSubject(null);
  showSearch = 'inactive';
  searchField: FormControl;
  term = 'engineer';
  status = '';
  order = 'severity';
  load = false;

  constructor(
    private http: HttpRequestService,
    private dialog: MatDialog,
  ) { }

  ngOnInit () {
    // Call function to get all issues
    this.getAllIssues();
    // Init new formControl
    this.searchField = new FormControl();
    // Listen to searchField changes to get filtered issues
    this.searchField.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap( term => {
        this.load = true;
        return this.getIssuesBy(term);
      })
      .map(iss => {
        iss.issues.forEach(element => element.selected = 'not');
        return iss;
      })
      .subscribe(issues => {
        this.issues$.next(issues.issues);
        this.load = false;
      });
  }
  // Function to get all issues
  getAllIssues () {
    this.load = true;
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
          this.issues$.next(issues.issues);
          this.appearIn = 'active';
          this.load = false;
        });
  }
  // Function to open dialog to create new issue
  createIssue () {
    const data = {
      maxWidth: '80vh',
      width: '80vh',
      maxHeight: '100vh',
      height: 'auto',
      data: {}
    };
    const dialogRef = this.dialog.open(CreateIssueComponent, data);
    dialogRef.afterClosed().subscribe(issues => issues ? this.getAllIssues() : null);
  }
  // Function to get issues filtered by...
  getIssuesBy (word) {
    const endpoint = 'http://localhost:3000/issues';
    const params = { };
    params[this.term] = word;
    return this.http.getRequest(endpoint, params);
  }

}
