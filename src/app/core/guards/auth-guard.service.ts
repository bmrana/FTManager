import { WebConnectServiceService } from './../web-services/web-connect-service.service';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, public auth: AuthService, private http: WebConnectServiceService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const token = this.http.accessToken;

    if (!token) {
      // this.http.returnURL = window.location.pathname.split('/')[1];
      this.http.returnURL = 'dashboard/dors';
      console.log('params: ' + route.queryParams);
      this.router.navigate(['notAuthorized']);
      return false;
    }

    return true;
  }
}
