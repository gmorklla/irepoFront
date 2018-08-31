import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenOrClosePipe, OrderBy, EmailF } from './filters.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OpenOrClosePipe,
    OrderBy,
    EmailF
  ],
  exports: [
    OpenOrClosePipe,
    OrderBy,
    EmailF
  ]
})
export class FiltersModule { }
