import { AppUser } from './../data-models/app-user.model';
import { DomainUser } from './../data-models/domain-user.model';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthorizationService {
  // 0 - Not Authorized, 1 - Administrator, 2 - FTO, 3 - Recruit Officer
  authorization = new Subject<number>();
  duSubscription: Subscription;
  duSet = false;
  cuSubscription: Subscription;
  cuSet = false;
  currentUser: DomainUser;
  currentAppUser: AppUser;
  appuSubscription: Subscription;
  appuSet = false;
  appUsers: AppUser[];

  constructor(private users: UsersService) {
    this.duSubscription = this.users.domainUsersRetrieved
      .subscribe(
        (domainUsers) => {
          this.duSet = true;
          this.authorizeUser();
        }
      );

    this.cuSubscription = this.users.currentUserRetrieved
      .subscribe(
        (currentUser) => {
          this.cuSet = true;
          this.currentUser = currentUser;
          this.authorizeUser();
        }
      );

   
    this.appuSubscription = this.users.appUsersChanged
      .subscribe(
        (appUsers) => {
          this.appuSet = true;
          this.appUsers = appUsers;
          this.authorizeUser();
        }
      );
  }

  
  authorizeUser() {
    if (this.duSet === true && this.cuSet === true && this.appuSet === true) {
      const authUser: AppUser = this.appUsers.find(u => u.EmployeeID === this.currentUser.EmployeeID);
      this.currentAppUser = authUser;
      if (authUser) {
        switch (authUser.RoleID) {
          case 1: {
            this.authorization.next(1);
            break;
          }
          case 2: {
          this.authorization.next(2);
            break;
          }
          case 3: {
          this.authorization.next(3);
            break;
          }
          default: {
            this.authorization.next(0);
            break;
          }
        }
      } else {
        this.authorization.next(0);
      }
    }
  }

}
