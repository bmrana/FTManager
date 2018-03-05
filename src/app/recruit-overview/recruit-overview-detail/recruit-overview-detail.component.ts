import { Router } from '@angular/router';
import { SortArrayPipe } from './../../core/pipes/sort-array.pipe';
import { OverviewDOR } from './../overviewDOR.model';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Input } from '@angular/core';
import { OverviewService } from '../overview.service';
import { DorFormDataService } from '../../forms/dor/data/dor-form-data.service';

@Component({
  selector: 'app-recruit-overview-detail',
  templateUrl: './recruit-overview-detail.component.html',
  styleUrls: ['./recruit-overview-detail.component.css']
})
export class RecruitOverviewDetailComponent implements OnInit {
  @Input() dors: OverviewDOR[];

  // An Array to filter without modifying original
  filteredDors: OverviewDOR[];
  phases = [];

  dorSubscription: Subscription;
  availablePhases = new Set();

  constructor(private overviewService: OverviewService,
              private sortPipe: SortArrayPipe,
              private dorDataService: DorFormDataService,
              private router: Router) { }

  ngOnInit() {
    this.dors = this.sortPipe.transform(this.dors, 'shiftDate', true);
    for (let dor of this.sortArray(this.dors)) {
      this.availablePhases.add(dor.name);
    }

    this.dorSubscription = this.overviewService.filteredOverviewDORS
      .subscribe(
        (dors) => {
          this.dors = dors;
          this.availablePhases.clear();
          for (let dor of this.sortArray(dors)) {
            this.availablePhases.add(dor.name);
          }
        }
      );

    this.filterDors();
  }

  sortArray(dorsIn: OverviewDOR[]): [{value, name}] {
    this.phases.length = 0;

    for (let dor of dorsIn) {
      switch (dor.phase) {
        case 0:
          this.phases.push({value: 0, name: 'Remedial'});
          break;
        case 2:
          this.phases.push({ value: 2, name: 'Phase 2'});
          break;
        case 3:
          this.phases.push({ value: 3, name: 'Phase 3' });
          break;
        case 4:
          this.phases.push({ value: 4, name: 'Phase 4'});
          break;
        case 5:
          this.phases.push({ value: 5, name: 'Ghost'});
          break;
        case 10:
          this.phases.push({ value: 10, name: 'Traffic'});
          break;
      }
    }

    const dorsOut = this.sortPipe.transform(this.phases, 'value');

    return dorsOut;
  }

  filterDors(phase = null) {
    if (phase != null) {
      const selectedPhase = this.phases.find(p => p.name === phase).value;
      this.filteredDors = this.dors.slice();
      this.filteredDors = this.filteredDors.filter(d => d.phase === selectedPhase);
    } else {
      this.filteredDors = this.dors.slice();
    }
  }

  getDOR(dorID) {
    this.dorDataService.getDorID = dorID;
    this.router.navigate(['/dor/dor']);
  }
}
