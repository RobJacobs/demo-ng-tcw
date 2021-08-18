import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedFormsModule } from '../shared/shared-forms.module';
import { AutocompleteRangeModule } from '../shared/components/autocomplete-range/autocomplete-range.module';
import { SearchComponent } from './search.component';
import { SearchSaveComponent } from './save/search-save.component';

const routes: Routes = [{ path: '', component: SearchComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedFormsModule, AutocompleteRangeModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SearchComponent, SearchSaveComponent]
})
export class SearchModule {}
