import { Observable } from 'rxjs/Observable';
import { RouterStateSnapshot } from '@angular/router/src/router_state';
import { WebConnectServiceService } from './../core/web-services/web-connect-service.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { OverviewDOR } from './overviewDOR.model';
import { Injectable } from '@angular/core';

@Injectable()
export class OverviewResolverService implements Resolve<OverviewDOR[]> {
  constructor(private router: Router,
              private httpService: WebConnectServiceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OverviewDOR[]> {
    return this.httpService.getRecruitOverview();
  }

}
