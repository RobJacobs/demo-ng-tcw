import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPetsConfig, PETS_CONFIG_SERVICE } from '../pets.config';

@Component({
  selector: 'lib-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, @Inject(PETS_CONFIG_SERVICE) public moduleConfig: IPetsConfig) {
    console.log(moduleConfig);
  }

  ngOnInit(): void { }

  public navigate(route: string) {
    this.router.navigate([`pets/${route}`]);
  }

  public toggleNav() {
    this.moduleConfig.appCache.menu.type = this.moduleConfig.appCache.menu.type === 'dismissible' ? 'mini' : 'dismissible';
  }
}
