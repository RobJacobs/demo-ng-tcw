import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public navigate(route: string): void {
    switch (route) {
      case 'back':
        this.router.navigate(['pets/home']);
        break;
    }
  }
}
