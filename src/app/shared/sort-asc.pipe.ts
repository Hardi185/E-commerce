import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortAsc'
})
export class SortAscPipe implements PipeTransform {

  transform(products:any[], sortOrder: string): any[] {
    if (sortOrder === 'asc') {
      return products.sort((a: any, b: any) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
    } 
    else if(sortOrder === 'desc'){
      // Sort products in descending order
      return products.sort((a: any, b: any) => {
        if (a.name > b.name) {
          return -1;
        } else if (a.name < b.name) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    else{
      return products;
    }
  }

}
