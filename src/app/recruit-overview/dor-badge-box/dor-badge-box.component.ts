import { Subscription } from 'rxjs/Subscription';
import { OverviewDOR } from './../overviewDOR.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { OverviewService } from '../overview.service';

@Component({
  selector: 'app-dor-badge-box',
  templateUrl: './dor-badge-box.component.html',
  styleUrls: ['./dor-badge-box.component.css']
})
export class DorBadgeBoxComponent implements OnInit, OnDestroy {
  @Input() type: string;
  @Input() dors: OverviewDOR[];

  dorSubscription: Subscription;

  itemCount: number;

  constructor(private overviewService: OverviewService) { }

  ngOnInit() {
    this.itemCount = this.getCount(this.type);

    this.dorSubscription = this.overviewService.filteredOverviewDORS
      .subscribe(
        (dors) => {
          this.dors = dors;
          this.itemCount = this.getCount(this.type);
        }
      );
  }

  ngOnDestroy() {
    this.dorSubscription.unsubscribe();
  }

  getCount(type): number {
    if (type === 'PENDING') {
        const count = this.dors.filter(d => d.finalized === false).length;
        return count;
    }

    if (type === 'UNREVIEWED') {
      const count = this.dors.filter(d => d.finalized === true && d.reviewed === false).length;
      return count;
    }
  }
}

