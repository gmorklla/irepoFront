import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenOrClosePipe } from './filters.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OpenOrClosePipe
  ],
  exports: [
    OpenOrClosePipe
  ]
})
export class FiltersModule { }
