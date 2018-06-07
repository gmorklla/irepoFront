import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { IssuesComponent } from './issues/issues.component';
import { IssueDetailComponent } from './issues/issue/issue-detail/issue-detail.component';

const routes: Routes = [
  { path: '', component: IssuesComponent },
  { path: 'issue/:id', component: IssueDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CustomMaterialModule
  ],
  exports: [RouterModule]
})
export class IssuesRoutingModule { }
