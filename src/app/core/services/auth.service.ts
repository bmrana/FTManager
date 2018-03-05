import { FormLoader } from './../data-models/formLoader.model';
import { Subject } from 'rxjs/Subject';
import { Injectable, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as hello from 'hellojs/dist/hello.all.js';

import { Configs } from '../configs';
import { WebConnectServiceService } from '../web-services/web-connect-service.service';

@Injectable()
export class AuthService {
  loginFinished = new Subject<boolean>();
  formLoader: FormLoader;

  constructor(private zone: NgZone, private router: Router, private route: ActivatedRoute, private httpService: WebConnectServiceService) {}

  initAuth() {
    hello.init(
      {
        msft: {
          id: Configs.appId,
          oauth: {
            version: 2,
            auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
          },
          scope_delim: ' ',
          form: false,
        },
      },
      { redirect_uri: window.location.origin }
    );
  }

  login() {
    hello('msft').login({ scope: Configs.scope,
                          state: JSON.stringify(this.formLoader),
                          display: 'page',
                          force: false
                         }).then(
      (res) => {
        this.zone.run(() => { this.router.navigate(['home']); }
        );
      },
      e => console.error(e.error.message)
    );
  }

  logout() {
    hello('msft').logout().then(
      () => window.location.href = '/',
      e => console.error(e.error.message)
    );
  }

}
