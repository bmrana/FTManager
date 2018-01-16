import { Component, OnInit, Input } from '@angular/core';
import { DashboardDOR } from '../../core/data-models/dashboard-dor.model';
import { PrettyDatePipe } from '../../core/pipes/pretty-date.pipe';

@Component({
  selector: 'app-dashboard-dor-item',
  templateUrl: './dashboard-dor-item.component.html',
  styleUrls: ['./dashboard-dor-item.component.css']
})
export class DashboardDorItemComponent implements OnInit {
  @Input() dor: DashboardDOR;
  prettyDate: Date;
  constructor(private prettyDatePipe: PrettyDatePipe) { }

  ngOnInit() {
    this.prettyDate = this.prettyDatePipe.transform(this.dor.shiftDate);
  }

}
