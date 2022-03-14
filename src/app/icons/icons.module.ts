import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import * as tylerIconsModule from '@tylertech/tyler-icons/standard';
import { TylerIconRegistry } from '@tylertech/tyler-components-web';

import { IconsComponent } from './icons.component';
import { IconsCacheService } from './icons-cache.service';

const routes: Routes = [
  { path: 'home', component: IconsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [IconsComponent],
  providers: [IconsCacheService]
})
export class IconsModule {
  constructor(private moduleCache: IconsCacheService) {
    this.moduleCache.iconOptions = Object.values(tylerIconsModule).map((icon: { name: string; data: string }) => {
      const name = icon.name.split('_').map(n => `${n.charAt(0).toUpperCase()}${n.slice(1)}`).join(' ');
      return { label: name, value: icon.name, leadingIcon: icon.name, leadingIconType: 'component' };
    });
    TylerIconRegistry.define(Object.values(tylerIconsModule));
  }
}
