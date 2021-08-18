import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterChipsComponent } from './filter-chips.component';

@NgModule({
  declarations: [FilterChipsComponent],
  imports: [CommonModule],
  exports: [FilterChipsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilterChipsModule {}
