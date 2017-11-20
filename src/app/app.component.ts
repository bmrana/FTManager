import { Router } from '@angular/router';
import { WebConnectServiceService } from './core/web-services/web-connect-service.service';

import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/pairwise';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private httpService: WebConnectServiceService, private router: Router) {
    // this.router.events.pairwise()
    //   .subscribe((event) => {
    //     console.log(event);
    //   });
  }

  ngOnInit() {
    // this.httpService.fetchAppUsers();
    this.router.navigate(['/']);
  }
}
