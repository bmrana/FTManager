import { UsersService } from './../core/services/users.service';
import { WebConnectServiceService } from './../core/web-services/web-connect-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showProgress: boolean;

  constructor(private httpService: WebConnectServiceService,
              private users: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.showProgress = this.users.domainUsersRetrieved;
    this.router.navigate(['manager']);
  }

}
