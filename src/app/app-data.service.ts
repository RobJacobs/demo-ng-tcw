import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isDefined } from '@tyler-components-web/core';
import { IPerson } from './models/IPerson';
import { IProfile } from './models/IProfile';
import { ISearch } from './shared/interfaces/search.interface';
import { IFilterParameter } from './shared/interfaces/filter.interface';
import { Utils } from 'src/utils';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  constructor(private httpClient: HttpClient) { }

  public getProfile(): Observable<IProfile> {
    return this.httpClient.get<IProfile>('data/profile/profile.json');
  }

  public getPeople(filter?: IFilterParameter): Observable<{ count: number; data: Array<IPerson> }> {
    return this.httpClient.get<Array<IPerson>>('data/people/people.json').pipe(
      map((r) => {
        let count = r.length;
        if (filter) {
          if (filter.filters?.length) {
            r = Utils.filterData(
              r,
              filter.filters.map((f) => ({ key: f.property, value: f.value, strict: f.property === 'gender' }))
            );
          }
          count = r.length;
          r = Utils.sortData(r, filter.sort.property, 'string', filter.sort.direction);
          r = r.slice(filter.skip, filter.skip + filter.take);
        }
        return { count, data: r };
      })
    );
  }

  public getPerson(id: number): Observable<IPerson> {
    return this.httpClient.get('data/people/people.json').pipe(map((r) => (r as IPerson[]).find((p) => p.id.toString() === id.toString()))) as any;
  }

  public getSearches(key: string): Observable<any> {
    return new Observable<ISearch[]>((o) => {
      let searches = localStorage.getItem(key);
      if (isDefined(searches)) {
        searches = JSON.parse(searches);
      }
      o.next(searches as any);
      o.complete();
    });
  }

  public saveSearches(key: string, searches: ISearch[]): Observable<boolean> {
    return new Observable<boolean>((o) => {
      localStorage.setItem(key, JSON.stringify(searches));
      o.next(true);
      o.complete();
    });
  }
}
