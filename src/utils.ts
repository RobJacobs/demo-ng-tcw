import { isArray, getPropertyValue, isDefined, isString } from '@tyler-components-web/core';
import { formatDate, formatNumber, Location } from '@angular/common';
import { Router } from '@angular/router';
import { SortDirection } from '@tylertech/tyler-components-web';

export class Utils {
  public static sortData(data: any[], key: string, type: 'string' | 'number' | 'boolean' | 'date', direction: 'ASC' | 'DESC' | SortDirection): any[] {
    if (!data || !data.length) {
      return data;
    }

    type = type || 'string';

    if (direction !== 'DESC') {
      direction = 'ASC';
    }

    return data.slice().sort((a, b): number => {
      a = getPropertyValue(a, key);
      b = getPropertyValue(b, key);

      if (direction === 'DESC') {
        return this.comparator(b, a, type);
      } else {
        return this.comparator(a, b, type);
      }
    });
  }

  public static filterData(data: any[], filters: { key: string; value: string; strict?: boolean }[]): any[] {
    if (!isArray(data) || !data.length || !isArray(filters) || !filters.length) {
      return data;
    }

    filters = filters.map((f) => {
      if (isString(f.value) && f.value.length) {
        let operator;
        if (f.value.substring(0, 2) === '<>') {
          if (f.value.length === 2) {
            f.value = '';
            return f;
          }
          operator = f.value.substring(0, 2);
          f.value = f.value.substring(2);
        } else if (f.value.substring(0, 1) === '<' || f.value.substring(0, 1) === '>') {
          if (f.value.length === 1) {
            f.value = '';
            return f;
          }
          operator = f.value.substring(0, 1);
          f.value = f.value.substring(1);
        }

        if (operator) {
          Object.defineProperty(f, 'operator', { value: operator });
        }
      }

      f.value = ('' + f.value).toLowerCase();
      return f;
    });

    const filter = (rec) =>
      filters.every((f) => {
        if (!f.value.length) {
          return true;
        }

        const value = ('' + getPropertyValue(rec, f.key)).toLowerCase();
        if (!value.length) {
          return false;
        }

        if (f.strict) {
          return value === f.value;
        }

        switch ((f as any).operator) {
          case '<>':
            return this.comparator(value, f.value, 'string') !== 0;
          case '>':
            return this.comparator(value, f.value, 'string') > 0;
          case '<':
            return this.comparator(value, f.value, 'string') < 0;
          default:
            return value.indexOf(f.value) > -1;
        }
      });

    return data.filter((rec) => filter(rec));
  }

  public static comparator(a: any, b: any, type: 'string' | 'number' | 'boolean' | 'date'): number {
    // eslint-disable-next-line eqeqeq
    if (a == b) {
      return 0;
    }
    if (!isDefined(a)) {
      return -1;
    }
    if (!isDefined(b)) {
      return 1;
    }

    switch (type) {
      case 'boolean':
        return a ? -1 : 1;
      case 'date':
        a = new Date(a).getTime();
        if (isNaN(a)) {
          return -1;
        }
        b = new Date(b).getTime();
        if (isNaN(b)) {
          return 1;
        }

        break;
      case 'number':
        a = parseFloat(a);
        if (isNaN(a)) {
          return -1;
        }
        b = parseFloat(b);
        if (isNaN(b)) {
          return 1;
        }

        break;
      default:
        if (!isNaN(parseFloat(a)) && !isNaN(parseFloat(b))) {
          return ('' + a).localeCompare('' + b, 'en', { numeric: true });
        } else {
          return ('' + a).localeCompare('' + b);
        }
    }

    return a < b ? -1 : a > b ? 1 : 0;
  }

  public static navigateBack(location: Location, router: Router, fallbackRoute: any[]): void {
    if ((location.getState() as any)?.navigationId === 1) {
      router.navigate(fallbackRoute);
    } else {
      location.back();
    }
  }

  public static elementId(prefix: string): string {
    return (
      prefix +
      Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '')
    );
  }

  public static formatDate(value: Date): string {
    return formatDate(value, 'MM/dd/yyyy', '', navigator.language);
  }

  public static formatNumber(value: number, format = '1.2-2'): string {
    return formatNumber(value, navigator.language, format);
  }

  public static uniqueId(): string {
    return Math.random().toString(36).substr(2);
  }
}
