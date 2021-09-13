import { Component, ViewChild, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

import { isDefined } from '@tyler-components-web/core';
import { AutocompleteFilterCallback, IOption, SortDirection } from '@tylertech/tyler-components-web';
import { PopupDirective, DialogService, ToastService } from '@tylertech/tyler-components-web-angular';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

// TODO import service
import { AppDataService } from '../app-data.service';
import { IFilter } from '../shared/interfaces/filter.interface';
import { ISearch } from '../shared/interfaces/search.interface';
import { SearchSaveComponent } from './save/search-save.component';

@Component({
  selector: 'app-search',
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  @ViewChild('searchesPopup', { static: false }) searchesPopup: PopupDirective;

  public searchName: string;
  public searchDescription: string;
  // TODO consider moving to a cache service
  public searchCache: { activeSearchId?: number; searches: ISearch[] } = {
    activeSearchId: null,
    searches: []
  };
  // TODO consider moving to a cache service
  public formGroup = new FormGroup({
    name: new FormControl(),
    dateOfBirth: new FormControl(),
    address: new FormControl(),
    facet: new FormControl()
  });
  // public nameOptions: { label: string; value: number }[] = [];
  public facetOptions: { label: string; value: number }[] = [];
  public filters: IFilter[] = [
    { property: 'name', label: 'Name' },
    { property: 'dateOfBirth', label: 'DOB' },
    { property: 'address', label: 'Address' },
    { property: 'facet', label: 'Facet' }
  ];
  public operatorPopupFilter: IFilter;

  private storageKey = 'search-searches';
  private operatorPopup: PopupDirective;

  constructor(private dialogService: DialogService, private toastService: ToastService, private dataService: AppDataService) {
    this.dataService.getSearches(this.storageKey).subscribe((result) => {
      this.searchCache.searches = result || [];
    });
    for (let index = 0; index < 20; index++) {
      this.facetOptions.push({ value: index, label: `${name} Option ${index}` });
    }
  }

  ngOnInit() {
    const activeSearch = this.searchCache.searches.find((s) => s.id === this.searchCache.activeSearchId);
    if (isDefined(activeSearch)) {
      this.searchName = activeSearch.name;
      this.searchDescription = activeSearch.description;
      this.loadForm(activeSearch.filters);
    }
  }

  public search() {
    // TODO implement search action
  }

  public saveSearch(search?: {
    id: number;
    name: string;
    description: string;
    isDefault: boolean;
    isPublic: boolean;
    filters: { property: string; value: string }[];
  }) {
    const activeSearch = isDefined(search) ? search : this.searchCache.searches.find((s) => s.id === this.searchCache.activeSearchId);
    const record = {
      id: activeSearch?.id,
      name: activeSearch?.name,
      description: activeSearch?.description,
      isDefault: activeSearch?.isDefault,
      isPublic: activeSearch?.isPublic,
      filters: this.parseForm()
    };
    const dialogRef = this.dialogService.show(SearchSaveComponent, { backdropClose: false, escapeClose: false }, { data: record });
    const sub = dialogRef.afterClosed.subscribe((result) => {
      sub.unsubscribe();
      if (result) {
        if (isDefined(result.id)) {
          const searchIndex = this.searchCache.searches.findIndex((s) => s.id === result.id);
          if (searchIndex !== -1) {
            this.searchCache.searches[searchIndex] = result;
          }
        } else {
          result.id = this.searchCache.searches.length ? Math.max(...this.searchCache.searches.map((s) => s.id)) + 1 : 1;
          this.searchCache.searches.push(result);
        }

        this.dataService.saveSearches(this.storageKey, this.searchCache.searches).subscribe(
          () => {
            this.searchCache.activeSearchId = result.id;
            this.searchName = result.name;
            this.searchDescription = result.description;
            this.toastService.show({ message: 'Search saved' });
          },
          () => this.toastService.show({ message: 'Search save failed' })
        );
      }
    });
  }

  public clearSearch() {
    this.formGroup.reset();
    this.filters.forEach((f) => delete f.operator);
  }

  public searchAction(event: CustomEvent, action: string, id: number) {
    event.stopPropagation();
    this.searchesPopup.close();

    if (!isDefined(id)) {
      this.searchCache.activeSearchId = null;
      this.searchName = '';
      this.searchDescription = '';
      this.formGroup.reset();
    } else {
      const search = this.searchCache.searches.find((s) => s.id === id);
      if (isDefined(search)) {
        switch (action) {
          case 'search':
            this.searchCache.activeSearchId = search.id;
            this.searchName = search.name;
            this.searchDescription = search.description;
            this.search();
            break;
          case 'edit':
            this.searchCache.activeSearchId = search.id;
            this.searchName = search.name;
            this.searchDescription = search.description;
            this.loadForm(search.filters);
            break;
          case 'copy':
            const copySearch = JSON.parse(JSON.stringify(search));
            copySearch.id = undefined;
            copySearch.name = `${copySearch.name} copy`;
            copySearch.isDefault = false;
            this.saveSearch(copySearch);
            break;
          case 'delete':
            const searchIndex = this.searchCache.searches.findIndex((s) => s.id === search.id);
            if (searchIndex !== -1) {
              this.searchCache.searches.splice(searchIndex, 1);
              this.dataService.saveSearches(this.storageKey, this.searchCache.searches).subscribe((result) => { });
            }

            if (this.searchCache.activeSearchId === search.id) {
              this.searchCache.activeSearchId = undefined;
              this.searchName = '';
              this.searchDescription = '';
            }
            break;
        }
      }
    }
  }

  public nameFilter: AutocompleteFilterCallback = (filter: string) => this.dataService.getPeople().pipe(
    map(r => r.data
      .filter(p => p.firstName.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || p.lastName.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
      .map(p => ({ label: `${p.firstName} ${p.lastName}`, value: p.id }))
    )
  ).toPromise();

  public optionFilter(property: string): (filter: string) => Observable<IOption[]> {
    return (filter: string): Observable<IOption[]> =>
      new Observable((sub) => {
        let options = [];
        switch (property) {
          case 'facet':
            options = this.facetOptions.filter((fo) => fo.label.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
            break;
        }
        sub.next(options);
        sub.complete();
        sub.unsubscribe();
      });
  }

  public operatorPopupOpen(event: Event, popup: PopupDirective, name: string) {
    event.stopPropagation();
    this.operatorPopupFilter = this.filters.find((f) => f.property === name);
    this.operatorPopup = popup;
    this.operatorPopup.open();
  }

  public operatorSelected(value: string | number) {
    value = parseInt(value as string, 10);
    if (this.operatorPopupFilter.operator === value) {
      delete this.operatorPopupFilter.operator;
    } else {
      this.operatorPopupFilter.operator = value;
    }
    console.log(this.operatorPopupFilter);
    this.operatorPopup.close();
  }

  public hasOperator(name: string): number | undefined {
    return this.filters.find((f) => f.property === name).operator;
  }

  private loadForm(filters: IFilter[]) {
    Object.keys(this.formGroup.controls).forEach((ck) => {
      const filter = filters.find((f) => f.property === ck);
      if (filter) {
        this.formGroup.get(ck).setValue(filter.value);
        this.filters.find((f) => f.property === ck).operator = filter.operator;
      } else {
        this.formGroup.get(ck).setValue(null);
        delete this.filters.find((f) => f.property === ck).operator;
      }
    });
  }

  private parseForm(): IFilter[] {
    const filters: IFilter[] = [];
    Object.keys(this.formGroup.controls).forEach((ck) => {
      const control = this.formGroup.get(ck) as FormControl;
      if (isDefined(control.value)) {
        const filter = { property: ck, value: control.value } as IFilter;
        const operator = this.filters.find((f) => f.property === ck).operator;
        if (isDefined(operator)) {
          filter.operator = operator;
        }
        filters.push(filter);
      }
    });
    return filters;
  }
}
