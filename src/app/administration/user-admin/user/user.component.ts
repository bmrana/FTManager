import { WebConnectServiceService } from './../../../core/web-services/web-connect-service.service';
import { AppUser } from './../../../core/data-models/app-user.model';
import { DomainUser } from './../../../core/data-models/domain-user.model';
import { UsersService } from './../../../core/services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  domainUsers: DomainUser[];
  currentUser: AppUser;
  editMode= false;
  id: string;
  type: number;
  typeName: string;
  personForm: FormGroup;
  showProgress = false;

  constructor(private users: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              private httpService: WebConnectServiceService) {
   }

  ngOnInit() {
    this.domainUsers = this.httpService.policeUsers;
    
    this.domainUsers.sort( function(name1, name2) {
      if (name1.displayName < name2.displayName) {
        return -1;
      } else if (name1.displayName > name2.displayName) {
        return 1;
      } else {
        return 0;
      }
    });

    this.route.params
      .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.type = +params['type'];
        this.editMode = params['id'] != null;
        this.typeName = this.getTypeName(this.type);
        this.initForm();
      }
    );
  }

  onSubmit() {
    this.showProgress = true;
    this.currentUser.Active = this.personForm.value.Active;
      // this.users.addAppUser(this.currentUser, this.type);
    this.users.currentAppUser = this.currentUser;
    this.router.navigate(['/administration/users', {outlets: {'person': ['post']}}]);
  }

  onDelete() {
    this.showProgress = true;
    this.users.currentAppUser = this.currentUser;
    this.router.navigate(['/administration/users', {outlets: {'person': ['delete']}}]);
  }

  onPersonSelected(userID) {
    this.currentUser = null;
    this.currentUser = new AppUser(
      this.domainUsers[userID].displayName,
      this.domainUsers[userID].mail,
      this.domainUsers[userID].id,
      this.domainUsers[userID].givenName,
      this.domainUsers[userID].surname,
      this.domainUsers[userID].jobTitle,
      this.personForm.value.Active,
      this.type
    );
  }

  initForm() {
    let active = true;
    // let givenname = '';
    // let employeeID = '';

    if (this.editMode) {
      this.currentUser = this.users.getAppUser(this.id);
      active = this.currentUser.Active;
    }

    this.personForm = new FormGroup({
      'Active': new FormControl(active)
    });
  }

  getTypeName(type: number) {
    if (type === 2) {
      return 'FTO';
    } else if (type === 3) {
      return 'Recruit Officer';
    } else if (type === 1) {
      return 'System Administrator';
    } else {
      return 'Unknown';
    }
  }
}
