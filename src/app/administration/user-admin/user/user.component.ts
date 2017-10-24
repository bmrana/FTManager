import { AppUser } from './../../../core/data-models/app-user.model';
import { DomainUser } from './../../../core/data-models/domain-user.model';
import { UsersService } from './../../../core/services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  domainUsers: DomainUser[];
  currentUser: DomainUser;
  editMode= false;
  id: number;
  personForm: FormGroup;

  constructor(private users: UsersService,
              private route: ActivatedRoute) {
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
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    const newAppUser: AppUser = new AppUser (
      this.personForm.value.selectedUser.DisplayName,
      this.personForm.value.selectedUser.EmailAddress,
      this.personForm.value.selectedUser.EmployeeID,
      this.personForm.value.selectedUser.GivenName,
      this.personForm.value.selectedUser.Surname,
      this.personForm.value.selectedUser.Description,
      1,
    );
    this.users.addAppUser(newAppUser);
  }

  initForm() {
    let surname = '';
    // let givenname = '';
    // let employeeID = '';

    if (this.editMode) {
      surname = 'Edit';
    }

    this.personForm = new FormGroup({
      'selectedUser': new FormControl()
    });
  }


}
