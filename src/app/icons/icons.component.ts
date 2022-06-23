import { Component } from '@angular/core';
import { AutocompleteFilterCallback, IOption } from '@tylertech/tyler-components-web';
import { IconsCacheService } from './icons-cache.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent {
  public selectedIcon: IOption;

  constructor(public moduleCache: IconsCacheService) {
  }

  public iconOptionFilter: AutocompleteFilterCallback = (filter: string, value: string) => {
    if (value) {
      return [this.moduleCache.iconOptions?.find(o => o.value === value)];
    } else {
      if (filter.length) {
        return this.moduleCache.iconOptions?.filter(o => o.label.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).slice(0, 100);
      } else {
        return this.moduleCache.iconOptions?.slice(0, 100);
      }
    }
  };

  public iconSelected(value) {
    this.selectedIcon = this.moduleCache.iconOptions?.find(o => o.value === value)?.value;
    console.log(this.selectedIcon);
  }

}
