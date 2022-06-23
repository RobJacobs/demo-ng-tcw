import { NgModule, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedFormsModule } from '../shared/shared-forms.module';
import { AutocompleteRangeModule } from '../shared/components/autocomplete-range/autocomplete-range.module';
import { CardModule } from '../shared/components/card/card.module';

import { TestCacheService } from './test-cache.service';
import { TestComponent } from './test.component';
import { ChildComponent } from './child/child.component';
import { HomeComponent } from './home/home.component';
import { DetailOneComponent } from './detail-one/detail-one.component';
import { DetailTwoComponent } from './detail-two/detail-two.component';
import { ArrayFindPipeModule } from '../shared/pipes/array-find/array-find.module';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'child', component: ChildComponent },
      { path: '', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedFormsModule, AutocompleteRangeModule, CardModule, ArrayFindPipeModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [TestComponent, ChildComponent, HomeComponent, DetailOneComponent, DetailTwoComponent],
  providers: [TestCacheService]
})
export class TestModule { }
