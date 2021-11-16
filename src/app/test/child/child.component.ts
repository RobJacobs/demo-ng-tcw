import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from 'src/app/app-data.service';
import { TestCacheService } from '../test-cache.service';

@Component({
  selector: 'app-test-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  @ViewChild('body') bodyElementRef: ElementRef;

  constructor(private router: Router, public dataService: AppDataService, public moduleCache: TestCacheService) { }

  public go() { }

  public navigate(route: string) {
    this.router.navigate([route]);
  }
}
