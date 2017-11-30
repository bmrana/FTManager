import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { AuthorizationService } from './../services/authorization.service';
import { WebConnectServiceService } from './../web-services/web-connect-service.service';
import { UsersService } from './../services/users.service';
import { DomainUser } from './../data-models/domain-user.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUserName: MicrosoftGraph.User;
  authLevel = 0;
  subscription: Subscription;
  authSubscription: Subscription;
  loginFinishedSubscription: Subscription;

  constructor(private users: UsersService,
              private httpService: WebConnectServiceService,
              private router: Router,
              private auth0: AuthService,
              private auth: AuthorizationService) { }

  ngOnInit() {
    // this.currentUserName = this.users.currentUser.DisplayName;
    this.subscription = this.users.currentUserRetrieved
      .subscribe(
        (currentUser: MicrosoftGraph.User) => {
          this.currentUserName = currentUser;
        }
      );
    this.authSubscription = this.auth.authorization
      .subscribe(
        (authLevel) => {
          this.authLevel = authLevel;
        }
      );
    this.loginFinishedSubscription = this.auth0.loginFinished
      .subscribe(
        (f) => {
          if (f) {
            this.router.navigate(['dashboard']);
          }
        }
      );
  }

}
