import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedFormsModule } from '../shared/shared-forms.module';
import { ExamplesService } from './examples.service';
import { ExamplesComponent } from './examples.component';
import { AutocompleteExampleComponent } from './autocomplete-example/autocomplete-example.component';
import { SelectExampleComponent } from './select-example/select-example.component';
import { DragDropExampleComponent } from './drag-drop-example/drag-drop-example.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TwoWayBindingExampleComponent } from './two-way-binding/two-way-binding.component';
import { ChildComponent } from './two-way-binding/child/child.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      { path: 'autocomplete', component: AutocompleteExampleComponent },
      { path: 'drag-drop', component: DragDropExampleComponent },
      { path: 'select', component: SelectExampleComponent },
      { path: 'two-way-binding', component: TwoWayBindingExampleComponent },
      { path: '', redirectTo: 'autocomplete' }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedFormsModule, DragDropModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ExamplesComponent, AutocompleteExampleComponent, SelectExampleComponent, DragDropExampleComponent, TwoWayBindingExampleComponent, ChildComponent],
  providers: [ExamplesService]
})
export class ExamplesModule { }
