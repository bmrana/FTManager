import { DashboardService } from './../../../core/services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { DashboardDOR } from '../../../core/data-models/dashboard-dor.model';
import { Router } from '@angular/router';
import { DorFormDataService } from '../../../forms/dor/data/dor-form-data.service';

@Component({
  selector: 'app-unreviewed-dor',
  templateUrl: './unreviewed-dor.component.html',
  styleUrls: ['./unreviewed-dor.component.css']
})
export class UnreviewedDorComponent implements OnInit {
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
