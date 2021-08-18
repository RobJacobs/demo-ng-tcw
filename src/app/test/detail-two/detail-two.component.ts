import { Component, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-detail-two',
  templateUrl: './detail-two.component.html',
  styleUrls: ['./detail-two.component.scss']
})
export class DetailTwoComponent implements OnInit {
  constructor() {
    console.log('DetaiLTwo constructor');
  }

  ngOnInit(): void {
    console.log('DetaiLTwo ngOnInit');
  }
}
