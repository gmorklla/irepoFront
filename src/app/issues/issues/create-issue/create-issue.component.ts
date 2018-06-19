import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { HttpRequestService } from '../../../shared/services/http-request.service';
import { ErrorSnackService } from '../../../shared/services/error-snack.service';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {

  addIssue: FormGroup;
  users = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpRequestService,
    public dialogRef: MatDialogRef<CreateIssueComponent>,
    private errorSnack: ErrorSnackService
  ) { }

  ngOnInit() {
    const opts = {
      title: [ '', Validators.required ],
      description: ['', Validators.required ],
      engineer: ['', Validators.required ],
      customer: [ '', Validators.required ],
      platform: [ '', Validators.required ],
      severity: [ null, Validators.required ]
    };
    this.addIssue = this.fb.group(opts);
    this.getUsers();
  }

  getUsers () {
    const endpoint = 'http://localhost:3000/user/all';
    const params = { };
    this.http.getRequest(endpoint, params).subscribe(users => this.users = users);
  }

  selectedEngineersChange (e) {
    this.users = e;
  }

  createIssue () {
    const endpoint = 'http://localhost:3000/create';
    const params = {
      engineer: this.addIssue.get('engineer').value,
      title: this.addIssue.get('title').value,
      description: this.addIssue.get('description').value,
      customer: this.addIssue.get('customer').value,
      severity: this.addIssue.get('severity').value,
      platform: this.addIssue.get('platform').value,
    };
    this.http.getRequest(endpoint, params)
      .subscribe(issues => {
        this.errorSnack.openSnackBar(`${issues[issues.length - 1].issue.title} issue created`, 'Ok');
        this.dialogRef.close();
      });
  }

}
