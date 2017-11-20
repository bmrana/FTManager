import { DashboardDOR } from './../../../core/data-models/dashboard-dor.model';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard.service';

@Component({
  selector: 'app-pending-dor',
  templateUrl: './pending-dor.component.html',
  styleUrls: ['./pending-dor.component.css']
})
export class PendingDorComponent implements OnInit {
  dors: DashboardDOR[];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dors = this.dashboardService.dashboardDORs;
    console.log(this.dors);
  }

}
