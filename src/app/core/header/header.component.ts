import { WebConnectServiceService } from './../web-services/web-connect-service.service';
import { UsersService } from './../services/users.service';
import { DomainUser } from './../data-models/domain-user.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUserName: DomainUser;
  subscription: Subscription;

  constructor(private users: UsersService, private httpService: WebConnectServiceService) { }

  ngOnInit() {
    // this.currentUserName = this.users.currentUser.DisplayName;
    this.subscription = this.users.currentUserRetrieved
      .subscribe(
        (currentUser: DomainUser) => {
          this.currentUserName = currentUser;
        }
      );

  }

}
