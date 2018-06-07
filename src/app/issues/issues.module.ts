import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { IssuesRoutingModule } from './issues-routing.module';
import { IssuesComponent } from './issues/issues.component';
import { IssueComponent } from './issues/issue/issue.component';
import { IssueDetailComponent } from './issues/issue/issue-detail/issue-detail.component';

@NgModule({
  imports: [
    CommonModule,
    IssuesRoutingModule,
    CustomMaterialModule
  ],
  declarations: [IssuesComponent, IssueComponent, IssueDetailComponent]
})
export class IssuesModule { }
