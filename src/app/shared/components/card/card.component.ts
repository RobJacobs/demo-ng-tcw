import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() hasHeader = true;
  @Input() hasFooter = true;
  @Input() outlined = false;

  constructor() {}
}
