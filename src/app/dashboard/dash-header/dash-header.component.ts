import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthorizationService } from '../../core/services/authorization.service';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.css']
})
export class DashHeaderComponent implements OnInit {
  authLevel: number;

  constructor(private auth: AuthorizationService) {
    this.authLevel = this.auth.currentAppUser.RoleID; }

  ngOnInit() {
  }

  log() {
  }
}
