import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { IssuesComponent } from './issues/issues.component';

const routes: Routes = [
  { path: '', component: IssuesComponent },
  { path: 'issue/:id', component: IssuesComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CustomMaterialModule
  ],
  exports: [RouterModule]
})
export class IssuesRoutingModule { }
