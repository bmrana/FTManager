import { AppUser } from './../data-models/app-user.model';
import { DomainUser } from './../data-models/domain-user.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsersService {
  domainUsers: DomainUser[];
  currentUser: DomainUser;
  domainUsersRetrieved = false;
  currentUserRetrieved = new Subject<DomainUser>();
  appUsersChanged = new Subject<AppUser[]>();
  appUsers: AppUser[] = [];

  constructor() { }

  setDomainUsers(dUsers: DomainUser[]) {
    this.domainUsers = dUsers;
    this.domainUsersRetrieved = true;
  }

  setCurrentUser(currentUser: DomainUser) {
    this.currentUser = currentUser;
    this.currentUserRetrieved.next(currentUser);
  }

  setAppUsers(appUsers: AppUser[]) {
    this.appUsers = appUsers;
    this.appUsersChanged.next(this.appUsers.slice());
  }
  getAppUsers() {
    return this.appUsers.slice();
  }

  getAppUser(index: number) {
    return this.appUsers[index];
  }

  addAppUser(appUser: AppUser) {
    this.appUsers.push(appUser);
    this.appUsersChanged.next(this.appUsers.slice());
  }

  getDomainUsers() {
    return this.domainUsers.slice();
  }
}
