import { DorFormDataService } from './../../../forms/dor/data/dor-form-data.service';
import { DashboardDOR } from './../../../core/data-models/dashboard-dor.model';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-dor',
  templateUrl: './pending-dor.component.html',
  styleUrls: ['./pending-dor.component.css']
})
export class PendingDorComponent implements OnInit {
  dors: DashboardDOR[];

  constructor(private dashboardService: DashboardService, private router: Router, private dorDataService: DorFormDataService) { }

  ngOnInit() {
    this.dors = this.dashboardService.dashboardDORs;
  }

  getDOR(dorID) {
    this.dorDataService.getDorID = dorID;
    this.router.navigate(['/dor/dor']);
  }

}
