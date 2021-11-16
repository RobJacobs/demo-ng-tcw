import { Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { isArray } from '@tyler-components-web/core';
import { CellAlign, TableComponent, TextFieldComponentDelegate } from '@tylertech/tyler-components-web';
import { TableUtils } from 'src/app/shared/table/utils';
import { Utils } from 'src/utils';
import { AppDataService } from '../../app-data.service';
import { IPerson } from '../../models/IPerson';
import { BaseTableComponent } from '../../shared/table/base-table.component';
import { PeopleCacheService } from '../people-cache.service';
import { FilterComponent } from './filter/filter.component';
import { TableDetailComponent } from './table-detail/table-detail.component';

@Component({
  selector: 'app-people-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseTableComponent implements OnInit, OnDestroy {
  @ViewChild('peopleTable', { static: true }) peopleTable: ElementRef;
  @ViewChild(FilterComponent) peopleFilter: FilterComponent;
  public recordset: Array<IPerson>;
  public filterCache = this.moduleCache.homeView.filter;
  public viewCache = this.moduleCache.homeView;
  public optionalTableColumns = [
    { property: 'image', header: 'Image', hidden: false },
    { property: 'firstName', header: 'First', hidden: false },
    { property: 'lastName', header: 'Last', hidden: false },
    { property: 'gender', header: 'Gender', hidden: true },
    { property: 'occupation', header: 'Occupation', hidden: true }
  ];
  public selectedPeople: IPerson[] = [];
  public selectedTableColumns = this.optionalTableColumns.filter(c => !c.hidden).map(c => c.property);

  constructor(private router: Router, private appDataService: AppDataService, public moduleCache: PeopleCacheService, private injector: Injector) {
    super();

    const storedTableColumns = JSON.parse(localStorage.getItem(this.moduleCache.homeView.storageKey)) as Array<{
      property: string;
      hidden: boolean;
    }>;
    if (isArray(storedTableColumns)) {
      this.optionalTableColumns.forEach((c) => {
        const storedColumn = storedTableColumns.find((sc) => sc.property === c.property);
        if (storedColumn) {
          c.hidden = storedColumn.hidden;
        }
      });
    }

    this.tableColumns = [
      {
        property: 'image',
        width: 48,
        align: CellAlign.Center,
        hidden: this.optionalTableColumns.find((c) => c.property === 'image').hidden,
        template: (rowIndex: number, cellElement: HTMLElement, data: any) => {
          const imgElement = document.createElement('img') as HTMLImageElement;
          imgElement.src = `data/people/${Utils.formatNumber(data.id, '2.0-0')}-small.png`;
          imgElement.classList.add('tyl-table-cell__image');
          return imgElement;
        }
      },
      { header: 'Id', property: 'id', sortable: true, filter: true, filterDelegate: new TextFieldComponentDelegate() },
      {
        header: 'First',
        property: 'firstName',
        sortable: true,
        filter: true,
        filterDelegate: new TextFieldComponentDelegate(),
        hidden: this.optionalTableColumns.find((c) => c.property === 'firstName').hidden
      },
      {
        header: 'Last',
        property: 'lastName',
        sortable: true,
        filter: true,
        filterDelegate: new TextFieldComponentDelegate(),
        hidden: this.optionalTableColumns.find((c) => c.property === 'lastName').hidden
      },
      {
        header: 'Gender',
        property: 'gender',
        sortable: true,
        filter: true,
        filterDelegate: new TextFieldComponentDelegate(),
        hidden: this.optionalTableColumns.find((c) => c.property === 'gender').hidden
      },
      {
        header: 'Occupation',
        property: 'occupation',
        sortable: true,
        filter: true,
        filterDelegate: new TextFieldComponentDelegate(),
        hidden: this.optionalTableColumns.find((c) => c.property === 'occupation').hidden
      },
      {
        width: 96,
        align: CellAlign.Right,
        template: (rowIndex: number, cellElement: HTMLElement, data: any) => {
          cellElement.appendChild(
            TableUtils.createExpanderRow(
              rowIndex,
              this.peopleTable.nativeElement,
              this.injector,
              TableDetailComponent,
              'Expand table row',
              data
            )
          );

          cellElement.appendChild(TableUtils.createIconButton(
            'keyboard_arrow_right',
            (event: Event) => {
              this.router.navigate([`people/detail/${data.id}`]);
            },
            'View person details'
          ));

          return '';
        }
      }
    ];
  }

  ngOnInit(): void {
    this.initializeSort();
    this.getRecords();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  public peopleSelected(clearSelection = false): void {
    const tableElement = this.peopleTable?.nativeElement as TableComponent;
    if (clearSelection) {
      this.selectedPeople.length = 0;
      tableElement?.clearSelections();
    } else {
      this.selectedPeople = tableElement?.getSelectedRows();
    }
  }

  public tableOptionSelected(columns: string[]) {
    console.log(columns);
    this.tableColumns = this.tableColumns.map(c => {
      if (columns.includes(c.property)) {
        c.hidden = false;
      } else {
        c.hidden = true;
      }
      return c;
    });
    localStorage.setItem(
      this.moduleCache.homeView.storageKey,
      JSON.stringify(
        this.optionalTableColumns.map((c) => ({
          property: c.property,
          hidden: c.hidden
        }))
      )
    );
  }

  public applyFilter(reloadFilter: boolean) {
    this.getRecords();
    if (reloadFilter) {
      this.peopleFilter.loadForm(this.filterCache.filters);
    }
  }

  protected getRecords(): void {
    this.peopleSelected(true);
    this.appDataService
      .getPeople({
        sort: this.filterCache.sort,
        filters: this.filterCache.filters,
        skip: this.filterCache.skip,
        take: this.filterCache.take
      })
      .subscribe((result) => {
        this.recordset = result.data;
        this.recordCount = result.count;
      });
  }
}
