import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../app-data.service';
import { TestCacheService } from './test-cache.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  constructor(private router: Router, public dataService: AppDataService, public moduleCache: TestCacheService) {}

  public navigate(route: string) {
    this.router.navigate([route]);
  }
}
