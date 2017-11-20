import { AppUser } from './../../../core/data-models/app-user.model';
import { DomainUser } from './../../../core/data-models/domain-user.model';
import { UsersService } from './../../../core/services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

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
              private router: Router) {
   }

  ngOnInit() {
    this.domainUsers = this.users.getDomainUsers();
    this.domainUsers.sort( function(name1, name2) {
      if (name1.DisplayName < name2.DisplayName) {
        return -1;
      } else if (name1.DisplayName > name2.DisplayName) {
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
      this.domainUsers[userID].DisplayName,
      this.domainUsers[userID].EmailAddress,
      this.domainUsers[userID].EmployeeID,
      this.domainUsers[userID].GivenName,
      this.domainUsers[userID].Surname,
      this.domainUsers[userID].Description,
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
    } else {
      return 'Unknown';
    }
  }
}
