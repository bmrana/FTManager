import { CryptoService } from './../services/crypto.service';
import { FormLoader } from './../data-models/formLoader.model';
import { ErrorComponent } from './../../home/error/error.component';
import { WebConnectServiceService } from './../web-services/web-connect-service.service';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import * as hello from 'hellojs/dist/hello.all.js';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
    private http: WebConnectServiceService,
    private error: ErrorComponent,
    private cryptoService: CryptoService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const qsp = route.queryParams;
    if (qsp.docID && qsp.docType && qsp.jedi) {
      sessionStorage.setItem(
        'ftm_formLoader', '{\"docID\":\"' + qsp.docID + '\",\"docType\":\"' + qsp.docType + '\",\"jedi\":\"' + qsp.jedi + '\"}');
      // this.auth.formLoader = new FormLoader(this.cryptoService.decrypt(qsp.docType),
      //   +this.cryptoService.decrypt(qsp.docID),
      //   this.cryptoService.decrypt(qsp.jedi));
      // localStorage.setItem('getDOR', 'true');
      // localStorage.setItem('docType', this.auth.formLoader.docType);
    }
    
    // Determine if current session has expired
    const online = function (session) {
      const currentTime = (new Date()).getTime() / 1000;
      return session && session.access_token && session.expires > currentTime;
    };

    // get current session
    const msft = hello('msft').getAuthResponse();

    if (!online(msft)) {
      this.router.navigate(['login']);
      return false;
    }
    // const getDOR = localStorage.getItem('getDOR');
    // if (!this.auth.formLoader && getDOR && getDOR === 'true') {
    //   const msftState = JSON.parse(msft.state);
    //   if (msftState.docType && msftState.docID && msftState.recruitID) {
    //     const fl: FormLoader = new FormLoader(msftState.docType, msftState.docID, msftState.recruitID);
    //     this.auth.formLoader = new FormLoader(msftState.docType,
    //       msftState.docID, msftState.recruitID);
    //   }
    // }

    return true;
  }


  // }
}
