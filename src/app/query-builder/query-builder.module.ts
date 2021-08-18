import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedFormsModule } from '../shared/shared-forms.module';
import { QueryBuilderComponent } from './query-builder.component';

const routes: Routes = [{ path: '', component: QueryBuilderComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedFormsModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [QueryBuilderComponent]
})
export class QueryBuilderModule {}
