import { IColumnConfiguration, SortDirection } from '@tylertech/tyler-components-web';
import { isDefined } from '@tyler-components-web/core';
import { IFilterParameter } from '../interfaces/filter.interface';

export abstract class BaseTableComponent {
  public recordCount = 0;
  public tableColumns: IColumnConfiguration[] = [];

  private setTableFiltersAF;

  public abstract filterCache: IFilterParameter;

  constructor() {}

  public initializeSort() {
    if (this.filterCache.sort.property?.length > 0) {
      const column = this.tableColumns.find((c) => c.property === this.filterCache.sort.property);
      if (isDefined(column)) {
        column.sortDirection = this.filterCache.sort.direction;
        column.initialSort = true;
      }
    }
  }

  public get isFiltered(): boolean {
    return this.filterCache?.filters?.length ? true : false;
  }

  public clearFilters(): void {
    this.filterCache.filters.length = 0;
  }

  public getColumnIndex(column: string): number {
    return this.tableColumns.map((c) => c.property).indexOf(column);
  }

  public tableSort(sort: { columnIndex: number; direction: SortDirection }): void {
    const columnProperty = this.getColumnPropertyFromEventIndex(sort.columnIndex);
    this.filterCache.sort = { property: columnProperty, direction: sort.direction };
    this.filterCache.skip = 0;
    this.getRecords();
  }

  public tablePaginatorChange(detail: { pageIndex: number; pageSize: number }): void {
    this.filterCache.skip = detail.pageIndex * detail.pageSize;
    this.filterCache.take = detail.pageSize;
    this.getRecords();
  }

  protected destroy(): void {
    if (this.setTableFiltersAF) {
      window.cancelAnimationFrame(this.setTableFiltersAF);
    }
  }

  protected resetTable(): void {
    this.filterCache.sort = { property: undefined, direction: SortDirection.Ascending };
    this.filterCache.skip = 0;
  }

  private getColumnPropertyFromEventIndex(index: number) {
    return this.tableColumns.filter((c) => !c.hidden)[index].property;
  }

  protected abstract getRecords(): void;
}
