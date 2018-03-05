import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortArray'
})
export class SortArrayPipe implements PipeTransform {

  transform(inputArray: any[], sortKey: any, descending = false): any {

    if (descending === true) {
      inputArray.sort(
        function(a, b) {
          if (a[sortKey] < b[sortKey]) {
            return 1; }
          if (a[sortKey] > b[sortKey]) {
            return -1; }
          return 0;
        }
      );
      return inputArray;
    }
    inputArray.sort(
      function(a, b) {
        if (a[sortKey] < b[sortKey]) {
          return -1; }
        if (a[sortKey] > b[sortKey]) {
          return 1; }
        return 0;
      }
    );
    return inputArray;
  }

}
