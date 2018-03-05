import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AppUser } from '../../core/data-models/app-user.model';
import { OverviewDOR } from '../overviewDOR.model';
import { OverviewService } from '../overview.service';

@Component({
  selector: 'app-recruit-overview-infobar',
  templateUrl: './recruit-overview-infobar.component.html',
  styleUrls: ['./recruit-overview-infobar.component.css']
})
export class RecruitOverviewInfobarComponent implements OnInit, OnDestroy {
  @Input() selectedUser: AppUser;
  @Input() filteredDORS: OverviewDOR[];

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
