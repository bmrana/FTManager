import { UsersService } from './../core/services/users.service';
import { Subject } from 'rxjs/Subject';
import { OverviewDOR } from './overviewDOR.model';
import { Injectable } from '@angular/core';
import { AppUser } from '../core/data-models/app-user.model';

@Injectable()
export class OverviewService {
  overviewDORS: OverviewDOR[];
  filteredOverviewDORS = new Subject<OverviewDOR[]>();
  selectedRecruit = new Subject<AppUser>();
  appUsers: AppUser[] = [];

  constructor(private usersService: UsersService) {
    // this.appUsers = this.usersService.appUsers;
    this.usersService.appUsersChanged
      .subscribe( a => this.appUsers.push(...a));
  }

  setOverviewDORs(recruitID) {
    
  }

  setSelectedRecruit(recruitID) {
    const selectedUser = this.appUsers.find(u => u.EmployeeID === recruitID);
    this.selectedRecruit.next(selectedUser);

    const filteredDORS = this.overviewDORS.filter(dors => dors.recruitEmpID === recruitID);
    this.filteredOverviewDORS.next(filteredDORS);
  }

  setOverviewDORS(dors: OverviewDOR[]) {
    this.overviewDORS = dors;
  }
}
