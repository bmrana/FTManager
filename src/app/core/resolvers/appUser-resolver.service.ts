import { UsersService } from './../services/users.service';
import { WebConnectServiceService } from './../web-services/web-connect-service.service';
import { AppUser } from './../data-models/app-user.model';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AppUserResolver implements Resolve<AppUser[]> {
    constructor(private router: Router,
                private httpService: WebConnectServiceService,
                private users: UsersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AppUser[]> {
        return this.httpService.updateAppUser(this.users.currentAppUser);
    }
}
