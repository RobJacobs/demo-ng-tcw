import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../../app-data.service';
import { TestCacheService } from '../test-cache.service';

@Component({
  selector: 'app-test-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('body') bodyElementRef: ElementRef;

  public mode: 'detail-one' | 'detail-two' = 'detail-one';
  constructor(private router: Router, public dataService: AppDataService, public moduleCache: TestCacheService) { }

  public toggleMode() {
    this.mode = this.mode === 'detail-one' ? 'detail-two' : 'detail-one';
  }
}
