import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpRequestService } from '../../../../../shared/services/http-request.service';
import { AuthService } from '../../../../../shared/services/auth.service';
import { ErrorSnackService } from '../../../../../shared/services/error-snack.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.css']
})
export class AddActionComponent implements OnInit {

  addAction: FormGroup;
  user;

  constructor(
    private fb: FormBuilder,
    private http: HttpRequestService,
    public auth: AuthService,
    private dialogRef: MatDialogRef<AddActionComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private errorSnack: ErrorSnackService
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => this.user = user);
    const opts = {
      title: [ '', Validators.required ],
      description: ['', Validators.required ]
    };
    this.addAction = this.fb.group(opts);
  }

  createAction () {
    const endpoint = 'http://localhost:3100/actions/create';
    const params = {
      id: this.data.issue.value._id,
      title: this.addAction.get('title').value,
      description: this.addAction.get('description').value,
      engineer: this.user.email,
    };
    this.http.getRequest(endpoint, params)
      .subscribe(action => {
        this.errorSnack.openSnackBar(`Action created`, 'Ok');
        this.dialogRef.close(action);
      });
  }

}
