import { CUSTOM_ELEMENTS_SCHEMA, InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { defineIcons } from './define-icons';
import { PetsCacheService } from './pets-cache.service';
import { PetsComponent } from './pets.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: PetsComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'detail', component: DetailComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PetsComponent, HomeComponent, DetailComponent],
  providers: [PetsCacheService]
})
export class PetsModule {
  constructor() {
    defineIcons();
  }
}
