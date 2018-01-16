import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buildMulti'
})
export class BuildMultiPipe implements PipeTransform {

  transform(values: any[], phase: number): any {
    const multi = [];
    // values.sort(
    //   function(a, b) {
    //     if (a.shiftDate < b.shiftDate) {
    //       return -1; }
    //     if (a.shiftDate > b.shiftDate) {
    //       return 1; }
    //     return 0;
    //   }
    // );
    for (let value of values) {
      if (value.phase === phase) {

        const item = {
          name: value.shiftDate,
          series: [{
            name: value.category_name,
            value: value.rating,
            category: value.catid,
            dorID: value.dorID,
            phase: value.phase
          }]
        };

        const i = multi.indexOf(multi.find(v => v.name === value.shiftDate));
        if (i === -1) {
          multi.push(item);
        } else {
          multi[i].series.push(...item.series);
        }
      }
    }
    return multi;
  }
}

