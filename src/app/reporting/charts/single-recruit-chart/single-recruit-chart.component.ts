import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-single-recruit-chart',
  templateUrl: './single-recruit-chart.component.html',
  styleUrls: ['./single-recruit-chart.component.css']
})
export class SingleRecruitChartComponent implements OnInit {
  view: any[] = [700, 400];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Rating';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    const single = [
      {
        'date': '12/23/2017',
        'value': 4
      },
      {
        'date': '12/24/2017',
        'value': 3
      },
      {
        'date': '12/25/2017',
        'value': 4
      }
    ];

    Object.assign(this, {single});
   }

  ngOnInit() {
  }

}
