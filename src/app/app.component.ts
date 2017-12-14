import { DorCategoryFilterPipe } from './core/pipes/dor-category-filter.pipe';
import { FormLoader } from './core/data-models/formLoader.model';
import { ActivatedRoute } from '@angular/router';
import { WebConnectServiceService } from './core/web-services/web-connect-service.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import 'rxjs/add/operator/pairwise';
import { CryptoService } from './core/services/crypto.service';
import * as hello from 'hellojs/dist/hello.all.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  subs: Subscription;


  constructor(private authService: AuthService,
              private httpService: WebConnectServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private cryptoService: CryptoService,
            private zone: NgZone) {
    // this.router.events.pairwise()
    //   .subscribe((event) => {
    //     console.log(event);
    //   });
  }

  ngOnInit() {
    // this.httpService.fetchAppUsers();
    // this.router.navigate(['/']);

    this.route.queryParams.subscribe(
      (qsp) => {
        if (qsp.docID && qsp.docType && qsp.jedi) {
          this.authService.formLoader = new FormLoader(this.cryptoService.decrypt(qsp.docType),
                                                        +this.cryptoService.decrypt(qsp.docID),
                                                        this.cryptoService.decrypt(qsp.jedi));
        }
        this.authService.initAuth();
      }
    );


    // hello.on('auth.login', this.authService.login());
    
  }

}
