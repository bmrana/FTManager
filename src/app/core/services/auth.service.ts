import { Subject } from 'rxjs/Subject';
import { Injectable, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as hello from 'hellojs/dist/hello.all.js';

import { Configs } from '../configs';

@Injectable()
export class AuthService {
  loginFinished = new Subject<boolean>();
  
  constructor(private zone: NgZone, private router: Router, private route: ActivatedRoute) { }

  initAuth() {
    hello.init(
      {
        msft: {
          id: Configs.appId,
          oauth: {
            version: 2,
            auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
          },
          scope_delim: ' ',
          form: false
        },
      },
      { redirect_uri: window.location.href }
    );
  }

  login() {
    hello('msft').login({ scope: Configs.scope }).then(
      () => {
        this.zone.run(() => { this.router.navigate(['home']) }
        );
      },
      e => console.error(e.error.message)
    );
  }

  logout() {
    hello('msft').logout().then(
      () => window.location.href ='/',
      e => console.error(e.error.message)
    );
  }

}
