import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildMultiPipe } from './build-multi.pipe';
import { PrettyDatePipe } from './pretty-date.pipe';
import { UserListFilterPipe } from './user-list-filter.pipe';
import { SortArrayPipe } from './sort-array.pipe';
import { DerpPipe } from './derp.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BuildMultiPipe,
    DerpPipe,
    PrettyDatePipe,
    SortArrayPipe,
    UserListFilterPipe
  ],
  exports: [
    BuildMultiPipe,
    DerpPipe,
    PrettyDatePipe,
    SortArrayPipe,
    UserListFilterPipe
  ],
  providers: [
  ]
})
export class ApplicationPipesModule { }
