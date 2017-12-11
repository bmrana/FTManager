import { WebConnectServiceService } from './../web-services/web-connect-service.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GetDocResolverService implements Resolve<any[]> {

  constructor(private router: Router, private httpService: WebConnectServiceService, private authService: AuthService) { }

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.httpService.getDoc(
      this.authService.formLoader.docType, this.authService.formLoader.docID, this.authService.formLoader.recruitID);
  }
}
