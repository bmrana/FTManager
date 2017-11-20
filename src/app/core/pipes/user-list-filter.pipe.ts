import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userListFilter'
})
export class UserListFilterPipe implements PipeTransform {

  transform(value: any, filterString: number, propName: string): any {
    if (value.length === 0) {
      return value;
    }

    const resultArray = [];

    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
