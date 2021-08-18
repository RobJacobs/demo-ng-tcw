import { Injectable } from '@angular/core';
import { IAppCacheService } from './shared/interfaces/app-cache.interface';

@Injectable({
  providedIn: 'root'
})
export class AppCacheService implements IAppCacheService {
  public isBusy = false;
  public layoutMode: 'sm' | 'md' | 'lg' = 'lg';
  public menu = {
    isOpen: true,
    // 'permanent' | 'dismissible' | 'modal' | 'mini' | 'min-hover' = 'dismissible'
    type: 'mini' as 'dismissible' | 'mini',
    options: [
      { label: 'Dashboard', value: 'dashboard', icon: 'home' },
      { label: 'Profile', value: 'profile', icon: 'person' },
      { label: 'People', value: 'people', icon: 'list_alt' },
      { label: 'Pets', value: 'pets', icon: 'pets' },
      {
        label: 'Test',
        icon: 'child_friendly',
        children: [
          {
            label: 'Home', value: 'test/home', icon: 'home', leadingBuilder: () => {
              const iconElement = document.createElement('tcw-icon');
              iconElement.setAttribute('name', 'home');
              return iconElement;
            }
          },
          {
            label: 'Child', value: 'test/child', icon: 'person', leadingBuilder: () => {
              const iconElement = document.createElement('tcw-icon');
              iconElement.setAttribute('name', 'person');
              return iconElement;
            }
          }
        ]
      },
      { label: 'Search', value: 'search', icon: 'search' },
      { label: 'Query Builder', value: 'query-builder', icon: 'category' }
    ]
  };
  public activeRoute: string[] = [];
}
