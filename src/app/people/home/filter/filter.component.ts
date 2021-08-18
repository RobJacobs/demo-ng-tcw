import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { isArray, isDefined } from '@tyler-components-web/core';
import { IOption } from '@tylertech/tyler-components-web';
import { Observable } from 'rxjs';
import { AppCacheService } from 'src/app/app-cache.service';
import { IFilter } from 'src/app/shared/interfaces/filter.interface';
import { PeopleCacheService } from '../../people-cache.service';

@Component({
  selector: 'app-people-home-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output()
  public filter = new EventEmitter();

  public viewCache = this.moduleCache.homeView;
  public formGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    occupation: new FormControl(),
    facet: new FormControl()
  });
  public genderOptions: IOption[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Undecided', value: 'undecided' }
  ];

  constructor(public appCache: AppCacheService, public moduleCache: PeopleCacheService) {}

  ngOnInit(): void {
    this.loadForm(this.moduleCache.homeView.filter.filters);
  }

  public clearFilter(): void {
    this.formGroup.reset();
    this.moduleCache.homeView.filter.filters = [];
  }

  public optionFilter(property: string): (filter: string) => Observable<IOption[]> {
    return (filter: string): Observable<IOption[]> =>
      new Observable((sub) => {
        const options = [];
        for (let index = 0; index < 20; index++) {
          options.push({ value: index, label: `${property} Option ${index}` });
        }
        sub.next(options);
        sub.complete();
      });
  }

  public applyFilter(): void {
    this.moduleCache.homeView.filter.filters = [];
    Object.keys(this.formGroup.controls).forEach((controlName) => {
      const control = this.formGroup.get(controlName);
      if (isDefined(control?.value)) {
        if ((isArray(control.value) && control.value.length) || control.value.toString().trim().length) {
          this.moduleCache.homeView.filter.filters.push({
            property: controlName,
            value: control.value,
            label: this.propertyLabel(controlName)
          });
        }
      }
    });

    this.filter.emit();
  }

  public loadForm(filters: IFilter[]) {
    this.formGroup.reset();
    filters.forEach((f) => {
      const formControl = this.formGroup.get(f.property);
      if (formControl) {
        formControl.setValue(f.value);
      }
    });
  }

  private propertyLabel(property: string): string {
    switch (property) {
      case 'firstName':
        return 'First name';
      case 'lastName':
        return 'Last name';
      case 'gender':
        return 'Gender';
      case 'occupation':
        return 'Occupation';
      case 'facet':
        return 'Facet';
    }
  }
}
