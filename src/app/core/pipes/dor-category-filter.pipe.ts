import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dorCategoryFilter'
})
export class DorCategoryFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
