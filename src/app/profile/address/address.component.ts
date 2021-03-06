import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/form/base-form.component';

import { ProfileCacheService } from '../profile-cache.service';

@Component({
  selector: 'app-profile-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent extends BaseFormComponent {
  public formGroup = this.cache.formGroup.get('addressFormGroup') as FormGroup;

  constructor(public cache: ProfileCacheService) {
    super();
  }
}
