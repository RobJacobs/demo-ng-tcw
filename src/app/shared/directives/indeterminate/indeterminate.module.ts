import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndeterminateDirective } from './indeterminate.directive';

@NgModule({
  declarations: [IndeterminateDirective],
  imports: [CommonModule],
  exports: [IndeterminateDirective]
})
export class IndeterminateModule { }
