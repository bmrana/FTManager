import { WebConnectServiceService } from './core/web-services/web-connect-service.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private httpService: WebConnectServiceService) {}

  ngOnInit() {
    this.httpService.getCurrentUser();
  }
}
