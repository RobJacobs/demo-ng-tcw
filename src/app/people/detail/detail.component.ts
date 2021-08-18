import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isDefined } from '@tyler-components-web/core';
import { AppCacheService } from 'src/app/app-cache.service';
import { AppDataService } from 'src/app/app-data.service';
import { IPerson } from 'src/app/models/IPerson';
import { Utils } from 'src/utils';
import { PeopleCacheService } from '../people-cache.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  public person = {} as IPerson;
  public imageUrl: string;
  public index = 0;

  private noImageUrl = 'data/people/no-image.png';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public appCache: AppCacheService,
    private appDataService: AppDataService,
    public cache: PeopleCacheService
  ) {
    const id = this.route.snapshot.params.id;
    if (isDefined(id)) {
      this.appDataService.getPerson(id).subscribe((r) => {
        this.person = r;
        this.imageUrl = `data/people/${Utils.formatNumber(this.person.id, '2.0-0')}.png`;
      });
    } else {
      this.router.navigate(['people/home']);
    }
  }

  public navigate(route: string): void {
    switch (route) {
      case 'back':
        this.router.navigate(['people/home']);
        break;
    }
  }

  public viewWiki(): void {
    window.open(this.person.url, '_blank');
  }

  public imageError(event: Event): void {
    const targetElement = event.target as HTMLImageElement;
    if (!targetElement.src.includes(this.noImageUrl)) {
      targetElement.src = this.noImageUrl;
      targetElement.onerror = null;
    }
  }
}
