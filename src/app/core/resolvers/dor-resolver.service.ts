import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { FormData } from '../../forms/dor/data/dor-form-data.model';
import { WebConnectServiceService } from '../web-services/web-connect-service.service';
import { DorFormDataService } from '../../forms/dor/data/dor-form-data.service';

@Injectable()
export class DorResolverService implements Resolve<any[]> {

  constructor(private router: Router,
              private httpService: WebConnectServiceService,
              private dorService: DorFormDataService) {}
            
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.httpService.getDOR(this.dorService.getDorID.toString());
  }

}
