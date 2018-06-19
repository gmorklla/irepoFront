import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { IssuesRoutingModule } from './issues-routing.module';
import { IssuesComponent } from './issues/issues.component';
import { IssueComponent } from './issues/issue/issue.component';
import { IssueDetailComponent } from './issues/issue/issue-detail/issue-detail.component';
import { CreateIssueComponent } from './issues/create-issue/create-issue.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IssuesRoutingModule,
    CustomMaterialModule
  ],
  declarations: [
    IssuesComponent,
    IssueComponent,
    IssueDetailComponent,
    CreateIssueComponent
  ],
  entryComponents: [
    CreateIssueComponent
  ]
})
export class IssuesModule { }
