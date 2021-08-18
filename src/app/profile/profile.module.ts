import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedFormsModule } from '../shared/shared-forms.module';

import { ProfileCacheService } from './profile-cache.service';
import { DeactivateGuard } from './deactivate.guard';
import { ProfileComponent } from './profile.component';
import { AddressComponent } from './address/address.component';
import { PersonalComponent } from './personal/personal.component';
import { AutoFocusModule } from '../shared/directives/auto-focus/auto-focus.module';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canDeactivate: [DeactivateGuard],
    children: [
      { path: 'address', component: AddressComponent },
      { path: 'personal', component: PersonalComponent },
      { path: '', redirectTo: 'personal' }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedFormsModule, AutoFocusModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ProfileComponent, AddressComponent, PersonalComponent],
  providers: [ProfileCacheService, DeactivateGuard]
})
export class ProfileModule {}
