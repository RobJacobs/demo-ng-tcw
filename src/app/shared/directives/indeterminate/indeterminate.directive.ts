import { Directive, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isDefined } from '@tyler-components-web/core';

@Directive({
  selector: '[appIndeterminate]'
})
export class IndeterminateDirective {
  private value?: boolean;
  private inputElement: HTMLInputElement;

  @Input()
  public set appIndeterminate(control: FormControl) {
    if (isDefined(control.value)) {
      this.value = control.value;
      this.inputElement.indeterminate = false;
    }

    control.valueChanges.subscribe(o => {
      if (this.value !== control.value) {
        const inputElement = this.element.nativeElement as HTMLInputElement;
        if (!isDefined(this.value)) {
          this.value = true;
        } else if (this.value) {
          this.value = false;
        } else {
          this.value = null;
        }

        control.setValue(this.value);
        inputElement.indeterminate = !isDefined(this.value);
      }
    });
  };

  constructor(private element: ElementRef) {
    this.inputElement = this.element.nativeElement as HTMLInputElement;
    this.inputElement.indeterminate = true;
  }
}
