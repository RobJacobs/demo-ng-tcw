import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IOption, SelectOptionBuilder, SelectSelectedTextBuilder } from '@tylertech/tyler-components-web';
import { ExamplesService } from '../examples.service';

@Component({
  selector: 'app-examples-select-example',
  templateUrl: './select-example.component.html',
  styleUrls: ['./select-example.component.scss']
})
export class SelectExampleComponent {
  public options = this.moduleService.mockData.slice(0, 20).map(d => ({ value: d.id, label: d.description }));
  public objectOptions = this.moduleService.mockData.slice(0, 20).map(d => ({ value: d, label: d.description }));
  public formGroup = new FormGroup({
    select01: new FormControl(1),
    select02: new FormControl(this.objectOptions[2].value),
    // select02: new FormControl({ id: 2, code: '002', description: 'Item 002' }),
    select03: new FormControl([3, 4, 5]),
    select04: new FormControl(),
    select05: new FormControl()
  });
  public select06 = 6;
  public select07 = 7;

  constructor(public moduleService: ExamplesService) {
  }

  public optionBuilder: SelectOptionBuilder = (option: IOption, parentElement: HTMLElement) => {
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
  public selectedTextBuilder: SelectSelectedTextBuilder = (options: IOption[]): string => {
    return options[0] ? `${options[0].value} - ${options[0]?.label}` : '';
  };

  public selectChange(event: CustomEvent) {
    this.select07 = event.detail;
  }

}
