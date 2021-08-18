import { Component, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-detail-one',
  templateUrl: './detail-one.component.html',
  styleUrls: ['./detail-one.component.scss']
})
export class DetailOneComponent implements OnInit {
  constructor() {
    console.log('DetailOne contructor');
  }

  ngOnInit(): void {
    console.log('DetailOne ngOnInit');
  }
}
