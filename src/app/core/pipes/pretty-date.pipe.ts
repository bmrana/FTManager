import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyDate'
})
export class PrettyDatePipe implements PipeTransform {

  transform(value: any, args?: any): Date {
    
    const prettyDate: Date = new Date(+((value.toString()).substr(6, 13)));
    return prettyDate;
  }

}
