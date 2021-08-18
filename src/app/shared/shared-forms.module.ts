import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TylerComponentsWebModule } from '@tylertech/tyler-components-web-angular';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [FormsModule, ReactiveFormsModule, TylerComponentsWebModule],
  providers: []
})
export class SharedFormsModule {}
