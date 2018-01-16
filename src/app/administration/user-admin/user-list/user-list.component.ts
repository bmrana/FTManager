import { SortArrayPipe } from './../../../core/pipes/sort-array.pipe';
import { AppUser } from './../../../core/data-models/app-user.model';
import { UsersService } from './../../../core/services/users.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  appUsers: AppUser[];
  listId: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private usersService: UsersService,
              private sortPipe: SortArrayPipe) { }

  ngOnInit() {
    this.appUsers = this.usersService.appUsers;
    this.appUsers = this.sortPipe.transform(this.appUsers, 'DisplayName');
      this.subscription = this.usersService.appUsersChanged
        .subscribe(
          (appUsers: AppUser[]) => {
            this.appUsers = appUsers;
            this.appUsers = this.sortPipe.transform(this.appUsers, 'DisplayName');
          }
        );
      this.route.params
        .subscribe(
          (params: Params) => {
            this.listId = +params['type'];
          }
        );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewPerson() {
    this.router.navigate(['/administration/users', {outlets: {'person': ['edit', this.listId.toString()]}}]);
  }
}
