import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppUser } from './../../../../core/data-models/app-user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {
  @Input() appUser: AppUser;
  @Input() index: number;
  id: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['type'];
        }
      );
  }

  onSelected() {
    this.router.navigate(['/administration/users', {outlets: {'person': [this.appUser.EmployeeID, this.id.toString()]}}]);
  }
}
