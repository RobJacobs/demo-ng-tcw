import { Injectable } from '@angular/core';
import { SortDirection } from '@tylertech/tyler-components-web';
import { IPerson } from '../models/IPerson';
import { IFilter, IFilterParameter } from '../shared/interfaces/filter.interface';

@Injectable()
export class PeopleCacheService {
  public people: IPerson[];
  public homeView: {
    storageKey: string;
    showFilter: boolean;
    filter: IFilterParameter;
  } = {
      storageKey: 'people-home',
      showFilter: false,
      filter: {
        sort: {
          property: 'lastName',
          direction: SortDirection.Ascending
        },
        filters: [],
        skip: 0,
        take: 25
      }
    };
}
