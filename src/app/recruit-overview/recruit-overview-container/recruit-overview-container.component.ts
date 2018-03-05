import { OverviewDOR } from './../overviewDOR.model';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from '../../core/data-models/app-user.model';
import { OverviewService } from '../overview.service';

@Component({
  selector: 'app-recruit-overview-container',
  templateUrl: './recruit-overview-container.component.html',
  styleUrls: ['./recruit-overview-container.component.css']
})
export class RecruitOverviewContainerComponent implements OnInit, OnDestroy {
  selectedUser: AppUser;
  filteredDORS: OverviewDOR[];

  selectedUserSubscription: Subscription;
  filteredDORSSubscription: Subscription;

  constructor(private overviewService: OverviewService) { }

  ngOnInit() {
    this.selectedUserSubscription = this.overviewService.selectedRecruit
      .subscribe(
        (u) => {
          this.selectedUser = u;
        }
      );

    this.filteredDORSSubscription = this.overviewService.filteredOverviewDORS
      .subscribe(
        (dors) => {
          this.filteredDORS = dors;
        }
      );
  }

  ngOnDestroy() {
    this.selectedUserSubscription.unsubscribe();
    this.filteredDORSSubscription.unsubscribe();
  }
}
