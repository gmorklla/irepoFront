import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UsersTableComponent } from './users/users-table/users-table.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    CustomMaterialModule
  ],
  declarations: [UsersComponent, UsersTableComponent]
})
export class UsersModule { }
