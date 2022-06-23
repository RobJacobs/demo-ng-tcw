import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../../app-data.service';
import { TestCacheService } from '../test-cache.service';

@Component({
  selector: 'app-test-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public mode: 'detail-one' | 'detail-two' = 'detail-one';
  public selectedOption = 1;
  public data = [
    { value: 0, label: 'Item 0' },
    { value: 1, label: 'Item 1' },
    { value: 2, label: 'Item 2' },
    { value: 3, label: 'Item 3' },
    { value: 4, label: 'Item 4' },
    { value: 5, label: 'Item 5' },
    { value: 6, label: 'Item 6' },
    { value: 7, label: 'Item 7' },
    { value: 8, label: 'Item 8' },
    { value: 9, label: 'Item 9' }
  ];

  constructor(private router: Router, public dataService: AppDataService, public moduleCache: TestCacheService) { }

  public toggleMode() {
    this.mode = this.mode === 'detail-one' ? 'detail-two' : 'detail-one';
  }
}
