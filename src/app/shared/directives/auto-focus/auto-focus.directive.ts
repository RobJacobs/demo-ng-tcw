import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private element: ElementRef) { }

  public ngAfterViewInit() {
    window.requestAnimationFrame(() => {
      this.element.nativeElement.focus();
    });
  }
}
