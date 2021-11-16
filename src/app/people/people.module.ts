import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedFormsModule } from '../shared/shared-forms.module';
import { AutocompleteRangeModule } from '../shared/components/autocomplete-range/autocomplete-range.module';

import { PeopleCacheService } from './people-cache.service';
import { PeopleComponent } from './people.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { FilterComponent } from './home/filter/filter.component';
import { FilterChipsModule } from '../shared/components/filter-chips/filter-chips.module';
import { AutoFocusModule } from '../shared/directives/auto-focus/auto-focus.module';
import { TableDetailComponent } from './home/table-detail/table-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'detail', component: DetailComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedFormsModule, AutocompleteRangeModule, FilterChipsModule, AutoFocusModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PeopleComponent, HomeComponent, DetailComponent, FilterComponent, TableDetailComponent],
  providers: [PeopleCacheService]
})
export class PeopleModule {}
