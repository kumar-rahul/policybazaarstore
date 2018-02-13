import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'app/models/product.model';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: Product): any {
    if (!items) {
      return [];
    }
    if (!filter.name) {
      return items;
    }

    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1);
  }
}
