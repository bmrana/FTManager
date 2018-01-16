import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../reporting.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  phases: any[] = [];
  phasesSubscription: Subscription;

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {
    this.phasesSubscription = this.reportingService.reportingPhases
      .subscribe(
        (p) => {
          this.phases.length = 0;
          this.phases.push(...p.slice());
        }
      );
  }

}
