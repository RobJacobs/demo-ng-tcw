
import { Pipe, PipeTransform } from '@angular/core';
import { isDeepEqual } from '@tylertech/tyler-components-web';

@Pipe({
  name: 'arrayFind'
})
export class ArrayFindPipe implements PipeTransform {
  transform(value: string | number, source: any[], filterProperty: string, returnProperty = null) {
    if (!value?.toString().length || !source.length || !filterProperty.length) {
      return;
    }
    const sourceValue = source.find(o => isDeepEqual(o[filterProperty], value));
    if (!sourceValue) {
      return;
    }

    return returnProperty ? sourceValue[returnProperty] : sourceValue;
  }
}
