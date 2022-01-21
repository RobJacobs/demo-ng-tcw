import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedFormsModule } from '../shared/shared-forms.module';
import { ExamplesService } from './examples.service';
import { ExamplesComponent } from './examples.component';
import { AutocompleteExampleComponent } from './autocomplete-example/autocomplete-example.component';
import { SelectExampleComponent } from './select-example/select-example.component';


const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      { path: 'autocomplete', component: AutocompleteExampleComponent },
      { path: 'select', component: SelectExampleComponent },
      { path: '', redirectTo: 'autocomplete' }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedFormsModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ExamplesComponent, AutocompleteExampleComponent, SelectExampleComponent],
  providers: [ExamplesService]
})
export class ExamplesModule { }
