import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-chips',
  templateUrl: './filter-chips.component.html',
  styleUrls: ['./filter-chips.component.scss']
})
export class FilterChipsComponent implements OnInit {
  @Input()
  public filters: { property: string; value: string; label: string }[];

  @Output()
  public filter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public filterDelete(event: CustomEvent) {
    const filterIndex = this.filters.findIndex((f) => f.property === event.detail.value);
    if (filterIndex !== -1) {
      this.filters.splice(filterIndex, 1);
      this.filter.emit();
    }
  }
}
