import { Component, OnInit, Input } from '@angular/core';
import { DashboardDOR } from '../../core/data-models/dashboard-dor.model';

@Component({
  selector: 'app-dashboard-dor-item',
  templateUrl: './dashboard-dor-item.component.html',
  styleUrls: ['./dashboard-dor-item.component.css']
})
export class DashboardDorItemComponent implements OnInit {
  @Input() dor: DashboardDOR;
  prettyDate: Date;
  constructor() { }

  ngOnInit() {
    console.log((this.dor.shiftDate.toString()).substr(6, 13));
    this.prettyDate = new Date(+((this.dor.shiftDate.toString()).substr(6, 13)));
  }

}
