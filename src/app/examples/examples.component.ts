import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../app-data.service';
import { ExamplesService } from './examples.service';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent {
  constructor(private router: Router, public dataService: AppDataService, public moduleService: ExamplesService) { }

  public navigate(route: string) {
    this.router.navigate([route]);
  }
}
