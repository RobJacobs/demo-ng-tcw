import { Injectable, NgZone } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppCacheService } from './app-cache.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class AppBusyInterceptor implements HttpInterceptor {
  activeRequests = 0;

  constructor(private appCache: AppCacheService, private zone: NgZone) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
      // this.zone.run(() => (this.appCache.isBusy = true));
      window.requestAnimationFrame(() => this.appCache.isBusy = true);
    }
    this.activeRequests++;

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          // this.zone.run(() => (this.appCache.isBusy = false));
          window.requestAnimationFrame(() => this.appCache.isBusy = false);
        }
      })
    );
  }
}
