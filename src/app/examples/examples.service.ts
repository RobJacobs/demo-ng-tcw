import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utils } from 'src/utils';

export interface IRecord {
  id: number;
  code: string;
  description: string;
}

@Injectable()
export class ExamplesService {
  public mockData: IRecord[] = [];

  public constructor() {
    for (let index = 0; index < 300; index++) {
      this.mockData.push({ id: index, code: Utils.formatNumber(index, '3.0'), description: `Item ${Utils.formatNumber(index, '3.0')}` });
    }
  }

  public getSingleSelectOptions(filterText: string, value?: string): Observable<IRecord[]> {
    return new Observable((o) => {
      setTimeout(() => {
        let records = [];
        if (filterText?.length) {
          records = this.mockData.filter(d => d.description.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())).slice(0, 100);
        } else if (value) {
          records = this.mockData.filter(d => d.id.toString() === value.toString());
        } else {
          records = this.mockData.slice(0, 100);
        }
        o.next(records);
        o.complete();
      }, 1000);
    });
  }

  public getMutlipleSelectOptions(filterText: string, values?: string[]): Observable<IRecord[]> {
    return new Observable((o) => {
      setTimeout(() => {
        let records = [];
        if (filterText?.length) {
          records = this.mockData.filter(d => d.description.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())).slice(0, 100);
        } else {
          if (values?.length) {
            records = [...new Set([...this.mockData.filter(d => values.map(v => v.toString()).includes(d.id.toString())), ...this.mockData.slice(0, 100)])];
          } else {
            records = this.mockData.slice(0, 100);
          }
        }

        o.next(records);
        o.complete();
      }, 1000);
    });
  }

}
