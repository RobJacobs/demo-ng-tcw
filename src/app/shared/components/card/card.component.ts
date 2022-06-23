import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() hasHeader = true;
  @Input() hasFooter = true;
  @Input() border: 'raised' | 'outlined' = 'raised';

  constructor() { }

  @HostBinding('class.app-card--raised') public get raisedClass() { return this.border === 'raised'; }
  @HostBinding('class.app-card--outlined') public get outlinedClass() { return this.border === 'outlined'; }
}
