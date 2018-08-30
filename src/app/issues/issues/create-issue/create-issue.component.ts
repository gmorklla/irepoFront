import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpRequestService } from '../../../shared/services/http-request.service';
import { ErrorSnackService } from '../../../shared/services/error-snack.service';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {

  addIssue: FormGroup;
  users = [];
  tags: Array<string> = [];
  tagsDb: Array<string> = [];
  filteredTags: Observable<string[]>;
  myControl = new FormControl();
  url: string = environment.url;

  constructor(
    private fb: FormBuilder,
    private http: HttpRequestService,
    public dialogRef: MatDialogRef<CreateIssueComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private errorSnack: ErrorSnackService
  ) {
    this.filteredTags = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(tag => tag ? this._filterTags(tag) : this.tagsDb.slice())
      );
  }

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
    this.getTags();
  }

  private _filterTags(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tagsDb.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

  getUsers () {
    const endpoint = 'http://' + this.url + '/user/all';
    const params = { };
    this.http.getRequest(endpoint, params).subscribe(users => this.users = users);
  }

  selectedEngineersChange (e) {
    this.users = e;
  }

  createIssue () {
    const endpoint = 'http://' + this.url + '/create';
    const params = {
      engineer: this.addIssue.get('engineer').value,
      title: this.addIssue.get('title').value,
      description: this.addIssue.get('description').value,
      customer: this.addIssue.get('customer').value,
      severity: this.addIssue.get('severity').value,
      platform: this.addIssue.get('platform').value,
      tags: this.tags.length !== 0 ? this.tags : null
    };
    this.http.getRequest(endpoint, params)
      .subscribe(issues => {
        this.errorSnack.openSnackBar(`${issues[issues.length - 1].issue.title} issue created`, 'Ok');
        this.dialogRef.close(issues);
      });
  }

  addTag (txt) {
    Observable.of(txt)
      .filter(txtV => txtV.value !== '' && !this.tags.includes(txtV.value))
      .map(txtV => txtV.value)
      .subscribe(txtF => this.tags.push(txtF));
  }

  removeTag (tag) {
    const i = this.tags.indexOf(tag);
    const clone = [...this.tags];
    clone.splice(i, 1);
    this.tags = clone;
  }

  getTags () {
    const endpoint = 'http://' + this.url + '/tags';
    const params = {};
    this.http.getRequest(endpoint, params)
      .subscribe(tags => this.tagsDb = tags[0] ? tags[0].list : []);
  }

}
