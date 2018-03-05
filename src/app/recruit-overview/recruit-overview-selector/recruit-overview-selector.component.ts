import { Component, OnInit } from '@angular/core';
import { OverviewService } from '../overview.service';
import { AppUser } from '../../core/data-models/app-user.model';

@Component({
  selector: 'app-recruit-overview-selector',
  templateUrl: './recruit-overview-selector.component.html',
  styleUrls: ['./recruit-overview-selector.component.css']
})
export class RecruitOverviewSelectorComponent implements OnInit {

  appUsers: AppUser[];

  constructor(private overviewService: OverviewService) { }

  ngOnInit() {
    this.appUsers = this.overviewService.appUsers;
  }

  onPersonSelected(user) {
    this.overviewService.setSelectedRecruit(user);
  }

}
