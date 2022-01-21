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

  constructor(private router: Router, public dataService: AppDataService, public moduleCache: TestCacheService) { }

  public toggleMode() {
    this.mode = this.mode === 'detail-one' ? 'detail-two' : 'detail-one';
  }
}
