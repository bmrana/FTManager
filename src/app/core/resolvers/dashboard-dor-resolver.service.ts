import { Observable } from 'rxjs/Observable';
import { WebConnectServiceService } from './../web-services/web-connect-service.service';
import { DashboardDOR } from './../data-models/dashboard-dor.model';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router/src/interfaces';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { AuthorizationService } from '../services/authorization.service';


@Injectable()
export class DashboardDORResolver implements Resolve<DashboardDOR[]> {
    constructor(private router: Router,
                private httpService: WebConnectServiceService,
                private authService: AuthorizationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DashboardDOR[]> {
        console.log('resolver');
        return this.httpService.getDashboardDORs(this.authService.currentAppUser);
    }
}
