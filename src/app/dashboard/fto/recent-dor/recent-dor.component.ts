import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DashboardDOR } from '../../../core/data-models/dashboard-dor.model';
import { DashboardService } from '../../../core/services/dashboard.service';
import { DorFormDataService } from '../../../forms/dor/data/dor-form-data.service';

@Component({
  selector: 'app-recent-dor',
  templateUrl: './recent-dor.component.html',
  styleUrls: ['./recent-dor.component.css']
})
export class RecentDorComponent implements OnInit {
  dors: DashboardDOR[];
  constructor(private DashboardService: DashboardService, private router: Router, private dorDataService: DorFormDataService) { }

  ngOnInit() {
    this.dors = this.DashboardService.dashboardDORs;
  }

  getDOR(dorID) {
    this.dorDataService.getDorID = dorID;
    this.router.navigate(['/dor/dor']);
  }

}
