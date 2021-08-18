import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutocompleteRangeComponent } from './autocomplete-range.component';

@NgModule({
  declarations: [AutocompleteRangeComponent],
  imports: [CommonModule, FormsModule],
  exports: [AutocompleteRangeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AutocompleteRangeModule {}
