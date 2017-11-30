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

  constructor(private users: UsersService,
              private httpService: WebConnectServiceService,
              private auth: AuthorizationService) { }

  ngOnInit() {
    // this.currentUserName = this.users.currentUser.DisplayName;
    this.subscription = this.httpService.getMe()
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
  }

}
