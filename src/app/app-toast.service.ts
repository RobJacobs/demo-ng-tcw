import { Injectable } from '@angular/core';
import { ToastService } from '@tylertech/tyler-components-web-angular';
import { PopupPlacement } from '@tylertech/tyler-components-web';

@Injectable({
  providedIn: 'root'
})
export class AppToastService {
  constructor(private toastService: ToastService) {}

  public show(message: string): void {
    const toast = this.toastService.show({
      message: `${message}`,
      actionHandler: () => toast.hide(),
      placement: PopupPlacement.Bottom,
      duration: 3000
    });
  }
}
