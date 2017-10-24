import { AppUser } from './../../../core/data-models/app-user.model';
import { UsersService } from './../../../core/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  subscription: Subscription;
  appUsers: AppUser[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private usersService: UsersService) { }

  ngOnInit() {
    this.subscription = this.usersService.appUsersChanged
      .subscribe(
        (appUsers: AppUser[]) => {
          this.appUsers = appUsers;
        }
      );
  }

  onNewPerson() {
    this.router.navigate(['/administration/users', {outlets: {'person': ['edit']}}]);
  }
}
