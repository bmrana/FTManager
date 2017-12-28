import { WebConnectServiceService } from './../web-services/web-connect-service.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { CryptoService } from '../services/crypto.service';

@Injectable()
export class GetDocResolverService implements Resolve<any[]> {

  constructor(private router: Router,
              private httpService: WebConnectServiceService,
              private authService: AuthService,
              private cryptoService: CryptoService) { }

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    const form = JSON.parse(sessionStorage.getItem('ftm_formLoader'));
    return this.httpService.getDoc(
      // this.authService.formLoader.docType, this.authService.formLoader.docID, this.authService.formLoader.recruitID);
      this.cryptoService.decrypt(form.docType),
      +this.cryptoService.decrypt(form.docID),
      this.cryptoService.decrypt(form.jedi)
    );
  }
}
