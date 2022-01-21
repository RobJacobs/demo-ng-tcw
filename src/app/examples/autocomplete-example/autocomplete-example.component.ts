import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AutocompleteFilterCallback, AutocompleteOptionBuilder, AutocompleteSelectedTextBuilder, IOption } from '@tylertech/tyler-components-web';
import { map } from 'rxjs/operators';
import { ExamplesService } from '../examples.service';

@Component({
  selector: 'app-examples-autocomplete-example',
  templateUrl: './autocomplete-example.component.html',
  styleUrls: ['./autocomplete-example.component.scss']
})
export class AutocompleteExampleComponent implements OnInit {
  public formGroup = new FormGroup({
    autocomplete01: new FormControl(1),
    autocomplete02: new FormControl({ value: { id: 2, code: '002', description: 'Item 002' }, label: 'Item 002' }),
    autocomplete03: new FormControl([3, 4, 5]),
    autocomplete04: new FormControl(),
    autocomplete05: new FormControl()
  });

  public constructor(public moduleService: ExamplesService) { }

  public optionBuilder: AutocompleteOptionBuilder = (option: IOption, filterText: string, parentElement: HTMLElement) => {
    const titleSpan = document.createElement('span');
    titleSpan.classList.add('tyl-list-item__title');
    titleSpan.innerText = option.value.description;
    parentElement.appendChild(titleSpan);

    const subTitleSpan = document.createElement('span');
    subTitleSpan.classList.add('tyl-list-item__subtitle');
    subTitleSpan.innerText = option.value.code;
    parentElement.appendChild(subTitleSpan);

    return null;
  };

  // eslint-disable-next-line arrow-body-style
  public selectedTextBuilder: AutocompleteSelectedTextBuilder = (options: IOption[]): string => {
    return options[0] ? `${options[0].value} - ${options[0]?.label}` : '';
  };

  public singleSelectPrimitiveFilter: AutocompleteFilterCallback = (filterText: string, value: string) => {
    if (value) {
      return this.moduleService.getSingleSelectOptions(null, value).pipe(map(result => result.map(d => ({ value: d.id, label: d.description })))).toPromise();
    } else {
      return this.moduleService.getSingleSelectOptions(filterText).pipe(map(result => result.map(d => ({ value: d.id, label: d.description })))).toPromise();
    }
  };

  public singleSelectObjectFilter: AutocompleteFilterCallback = (filterText: string, value: IOption) => {
    if (value) {
      return [{ label: value.label, value }];
    } else {
      return this.moduleService.getSingleSelectOptions(filterText).pipe(map(result => result.map(d => ({ label: d.description, value: d })))).toPromise();
    }
  };

  public multipleSelectFilter: AutocompleteFilterCallback = (filterText: string, value: string) => {
    if (value) {
      return [];
    } else {
      return this.moduleService.getMutlipleSelectOptions(filterText, this.formGroup.get('autocomplete03').value).pipe(map(result => result.map(d => ({ value: d.id, label: d.description })))).toPromise();
    }
  };

  ngOnInit(): void {
  }

}
