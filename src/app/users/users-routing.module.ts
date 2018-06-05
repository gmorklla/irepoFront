import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{ path: '', component: UsersComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CustomMaterialModule
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
