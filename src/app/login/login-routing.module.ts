import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CustomMaterialModule
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
