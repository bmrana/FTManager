import { WebConnectServiceService } from './../web-services/web-connect-service.service';
import { Subject } from 'rxjs/Subject';
import { DashboardDOR } from './../data-models/dashboard-dor.model';
import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {
  dashboardDORs: DashboardDOR[];

  constructor() { }

  setDashboardDORs(dors: DashboardDOR[]) {
    this.dashboardDORs = [];
    this.dashboardDORs = dors;
  }
}
