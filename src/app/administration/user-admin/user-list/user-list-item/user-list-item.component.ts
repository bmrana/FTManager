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

  ngOnInit() {
  }

}
