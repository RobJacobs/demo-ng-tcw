import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { isDefined } from '@tyler-components-web/core';
import { ExpansionPanelComponent } from '@tylertech/tyler-components-web';
import { AppCacheService } from 'src/app/app-cache.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-menu]',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class SideMenuComponent {
  constructor(public appCache: AppCacheService, private router: Router, private elementRef: ElementRef) {}

  public menuItemSelected(option: string): void {
    if (isDefined(option)) {
      this.router.navigate([option]);
    }
  }

  public expand() {
    this.appCache.menu.type = this.appCache.menu.type === 'dismissible' ? 'mini' : 'dismissible';
    if (this.appCache.menu.type === 'mini') {
      (this.elementRef.nativeElement as HTMLElement).querySelectorAll('tcw-expansion-panel').forEach((ep: ExpansionPanelComponent) => ep.open = false);
    }
  }
}
