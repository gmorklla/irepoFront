import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenOrClosePipe, OrderBy } from './filters.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OpenOrClosePipe,
    OrderBy
  ],
  exports: [
    OpenOrClosePipe,
    OrderBy
  ]
})
export class FiltersModule { }
