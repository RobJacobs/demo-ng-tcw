import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IProfile } from '../models/IProfile';

@Injectable()
export class ProfileCacheService {
  public formGroup = new FormGroup({});
  public profile: IProfile;
}
