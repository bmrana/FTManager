import { Router } from '@angular/router';
import { SortArrayPipe } from './../../../core/pipes/sort-array.pipe';
import { BuildMultiPipe } from './../../../core/pipes/build-multi.pipe';
import { Subscription } from 'rxjs/Subscription';
import { WebConnectServiceService } from './../../../core/web-services/web-connect-service.service';
import { UsersService } from './../../../core/services/users.service';
import { Component, OnInit, Input } from '@angular/core';
import { ReportingService } from '../../reporting.service';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import { moment } from 'moment/src/moment';
import { PrettyDatePipe } from '../../../core/pipes/pretty-date.pipe';
import { DorService } from '../../../core/services/dor.service';
import { DorFormDataService } from '../../../forms/dor/data/dor-form-data.service';

@Component({
  selector: 'app-single-recruit-chart',
  templateUrl: './single-recruit-chart.component.html',
  styleUrls: ['./single-recruit-chart.component.css']
})

export class SingleRecruitChartComponent implements OnInit {
  @Input() phase: number;

  phaseLabel = '';
  ratings: any[] = [];
  subscription: Subscription;
  multi: any[] = [];
  view: any[] = [1000, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  barPadding = '1';
  groupPadding = '8';
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  animations = true;
  yAxisLabel = 'Rating';
  yScaleMax = 7;
  colorSets: any;
  colorScheme: any;

  customColors = [];

  selectedCategorySubscription: Subscription;
  selectedCategories: any[] = [];

  constructor(private http: WebConnectServiceService,
    private reportingService: ReportingService,
    private multiPipe: BuildMultiPipe,
    private sortPipe: SortArrayPipe,
    private datePipe: PrettyDatePipe,
    private dorService: DorService,
    private dorDataService: DorFormDataService,
    private router: Router) {

    // const single = this.single;
    this.colorScheme = colorSets.find(s => s.name === 'vivid');
    Object.assign(this, { colorSets });
  }

  ngOnInit() {
    switch (this.phase) {
      case 0: this.phaseLabel = 'Remedial';
      break;
      case 10: this.phaseLabel = 'Traffic';
      break;
      case 5: this.phaseLabel = 'Ghost';
      break;
      default: this.phaseLabel = this.phase.toString();
    }

    this.selectedCategorySubscription = this.reportingService.reportingCategories
      .subscribe(
      (v) => {
        this.selectedCategories.length = 0;
        this.selectedCategories.push(...v);
        this.filterCategories();

      }
      );

    this.subscription = this.reportingService.singleUserRatings
      .subscribe(
      (ratings) => {
        this.ratings = [...ratings];
        this.filterCategories();
      }
      );
  }

  filterCategories() {
    function cleanValue(value) {
      if (value === 99) {
        return 0;
      } else if (value === 0) {
        return -1;
      } else { return value; }
    }

    function filterCats(item) {
      return this.indexOf(item.category) > -1;
    }

    function filterPhases(item) {
      return item.phase === this;
    }

    this.multi = this.multiPipe.transform(this.ratings, this.phase);

    this.multi = this.multi.map(group => {
      group.name = this.datePipe.transform(group.name);
      group.series = group.series.reduce(function (memo, item) {
        memo.push({
          name: item.name,
          value: cleanValue(item.value),
          category: item.category,
          dorID: item.dorID,
          phase: item.phase,
          remedial: item.remedial,
          fto: item.fto
        });

        return [...memo];
      }, []);
      return group;
    }
    );

    this.multi = this.multi.map(group => {
      group.series = group.series.filter(filterCats, this.selectedCategories);
      group.series = group.series.filter(filterPhases, this.phase);
      return group;
    });

    this.multi = this.sortPipe.transform(this.multi, 'name');
    this.multi = [...this.multi];
  }

  onSelect(dorID) {
    this.dorDataService.getDorID = dorID;
    this.router.navigate(['/dor/dor']);
  }
}
