import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBusyInterceptor } from './app-busy.interceptor';

import { HeaderComponent } from './shared/components/header/header.component';
import { SideMenuComponent } from './shared/components/menu/menu.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { SharedFormsModule } from './shared/shared-forms.module';
import { PETS_CONFIG_SERVICE } from 'dist/pets';
import { AppPetsConfigService } from './app-pets-config.service';

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, SharedFormsModule],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent, HeaderComponent, SideMenuComponent, ConfirmDialogComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppBusyInterceptor, multi: true },
    { provide: PETS_CONFIG_SERVICE, useExisting: AppPetsConfigService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
