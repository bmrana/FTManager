import { WebConnectServiceService } from './../web-services/web-connect-service.service';
import { AppUser } from './../data-models/app-user.model';
import { DomainUser } from './../data-models/domain-user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UsersService {
  domainUsers: DomainUser[];
  domainUsersRetrieved = new Subject<DomainUser[]>();
  currentUser: DomainUser;
  currentAppUser: AppUser;
  currentUserRetrieved = new Subject<DomainUser>();
  appUsersChanged = new Subject<AppUser[]>();
  appUsers: AppUser[] = [];


  constructor() { }

  setDomainUsers(dUsers: DomainUser[]) {
    this.domainUsers = dUsers;
    this.domainUsersRetrieved.next(dUsers);
  }

  setCurrentUser(currentUser: DomainUser) {
    this.currentUser = currentUser;
    this.currentUserRetrieved.next(currentUser);
  }

  setAppUsers(appUsers: AppUser[]) {
    this.appUsers.length = 0;
    this.appUsers.push(...appUsers);
    this.appUsersChanged.next(this.appUsers.slice());
  }

  getAppUsers() {
    return this.appUsers.slice();
  }

  getAppUser(eid): AppUser {
    const appUser: AppUser = this.appUsers.find(u => u.EmployeeID === eid);
    return appUser;
  }

  addAppUser(appUser: AppUser, userType: number) {
    this.appUsers.push(appUser);
    this.appUsersChanged.next(this.appUsers.slice());
  }

  // updateAppUser(index: number, newUser: AppUser) {
  //   this.appUsers[index] = newUser;
  //   this.appUsersChanged.next(this.appUsers.slice());
  // }

  getDomainUsers() {
    return this.domainUsers.slice();
  }

  

  
}
