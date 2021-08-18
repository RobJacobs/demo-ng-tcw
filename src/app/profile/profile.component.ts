import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utils } from 'src/utils';
import { AppDataService } from '../app-data.service';
import { AppToastService } from '../app-toast.service';
import { IProfile } from '../models/IProfile';
import { ProfileCacheService } from './profile-cache.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public personalFormGroup = new FormGroup({
    firstName: new FormControl(null, { validators: [Validators.required] }),
    lastName: new FormControl(null, { validators: [Validators.required] }),
    gender: new FormControl(null),
    email: new FormControl(null, { validators: [Validators.required] }),
    phone: new FormControl(null, { validators: [Validators.required] }),
    dateOfBirth: new FormControl(null),
    comment: new FormControl(),
    friends: new FormArray([])
  });

  public addressFormGroup = new FormGroup({
    name: new FormControl(null, { validators: [Validators.required] }),
    street: new FormControl(null, { validators: [Validators.required] }),
    city: new FormControl(null, { validators: [Validators.required] }),
    state: new FormControl(null, { validators: [Validators.required] }),
    zip: new FormControl(null, { validators: [Validators.required] })
  });

  public activeTab = 0;
  public imageUrl: string;

  private noImageUrl = 'data/people/no-image.png';

  constructor(private router: Router, private appDataService: AppDataService, protected appToastService: AppToastService, public cache: ProfileCacheService) {
    this.cache.formGroup.setControl('personalFormGroup', this.personalFormGroup);
    this.cache.formGroup.setControl('addressFormGroup', this.addressFormGroup);
    if (this.cache.profile) {
      this.loadForm(this.cache.profile);
    }
  }

  public loadProfile(): void {
    this.appDataService.getProfile().subscribe((result) => {
      this.cache.formGroup.reset();
      this.cache.profile = result;
      this.loadForm(this.cache.profile);
    });
  }

  public tabSelected(route: string): void {
    switch (route) {
      case 'personal':
        this.activeTab = 0;
        break;
      case 'address':
        this.activeTab = 1;
        break;
    }
    this.router.navigate([`profile/${route}`]);
  }

  public save(): void {
    if (this.cache.formGroup.invalid) {
      return;
    }

    this.cache.profile = this.parseForm(this.cache.profile?.id);
    this.cache.formGroup.markAsPristine();
    this.appToastService.show('Profile saved.');
  }

  public cancel(): void {
    this.cache.formGroup.reset();
    this.imageUrl = undefined;
    this.cache.profile = undefined;
  }

  public imageError(event: Event): void {
    const targetElement = event.target as HTMLImageElement;
    if (!targetElement.src.includes(this.noImageUrl)) {
      targetElement.src = this.noImageUrl;
      targetElement.onerror = null;
    }
  }

  public isInvalid(formGroup: FormGroup, tab: number): boolean {
    return this.activeTab !== tab && formGroup.invalid && formGroup.touched;
  }

  private loadForm(profile: IProfile): void {
    this.imageUrl = `data/people/${Utils.formatNumber(this.cache.profile?.id, '2.0-0')}-small.png`;

    (this.personalFormGroup.get('friends') as FormArray)?.clear();
    this.personalFormGroup.patchValue({
      firstName: profile.firstName,
      lastName: profile.lastName,
      gender: profile.gender,
      email: profile.email,
      phone: profile.phone,
      dateOfBirth: formatDate(profile.dateOfBirth, 'MM/dd/yyyy', navigator.language)
    });

    this.addressFormGroup.patchValue(profile.address);
  }

  private parseForm(id?: number): IProfile {
    return {
      id,
      firstName: this.personalFormGroup.value.firstName,
      lastName: this.personalFormGroup.value.lastName,
      gender: this.personalFormGroup.value.gender,
      email: this.personalFormGroup.value.email,
      phone: this.personalFormGroup.value.phone,
      dateOfBirth: this.personalFormGroup.value.dateOfBirth,
      address: this.addressFormGroup.value
    };
  }
}
