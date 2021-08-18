import { Injectable } from '@angular/core';

@Injectable()
export class TestCacheService {
  public mode: 'default' | 'layout' | 'linking' = 'default';
}
