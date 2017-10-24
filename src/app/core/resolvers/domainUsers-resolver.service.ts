import { WebConnectServiceService } from './../web-services/web-connect-service.service';
import { DomainUser } from './../data-models/domain-user.model';
import { Injectable } from '@angular/core';
import { Resolve,
        Router,
        ActivatedRouteSnapshot,
        RouterStateSnapshot } from '@angular/router';
import {Observable } from 'rxjs/Observable';

@Injectable()
export class DomainUsersResolver implements Resolve<DomainUser[]> {

    constructor(private router: Router,
                private httpService: WebConnectServiceService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DomainUser[]> {
        return this.httpService.fetchAllUsers();
    }
}
