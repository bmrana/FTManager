import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { WebConnectServiceService } from './../../../core/web-services/web-connect-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { DailyJournal } from '../../../forms/daily-journal/daily-journal.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { DorFormDataService } from '../../../forms/dor/data/dor-form-data.service';

@Component({
  selector: 'app-drjs',
  templateUrl: './drjs.component.html',
  styleUrls: ['./drjs.component.css']
})
export class DrjsComponent implements OnInit, OnDestroy {
  @Input() dorNumber: number;
  @Input() dailyJournal: DailyJournal;
  @Input() authLevel: number;

  saveStatus: Subscription;
  formClean = true;
  message: string;
  enabled = false;

  constructor(private http:  WebConnectServiceService, private dorFormService: DorFormDataService) { }

  ngOnInit() {
    if (this.authLevel === 3) {
      this.enabled = true;
    }

    this.saveStatus = this.dorFormService.dailyJournalSaveStatus
      .subscribe(
        (status) => {
          if (status === 1) {
            this.formClean = true;
            this.message = 'Journal Entry is saved';
          }
          if (status === 0) {
            this.formClean = true;
            this.message = 'There was an error saving this journal entry';
          }
        }
      );
  }

  ngOnDestroy() {
    this.saveStatus.unsubscribe();
  }

  onChanged() {
    this.formClean = false;
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const dj = this.dailyJournal;
    dj.applyKnowledge = value.applyKnowledge;
    dj.areaProud = value.areaProud;
    dj.improveMost = value.improveMost;
    dj.leastSatisfied = value.leastSatisfied;
    dj.questions = value.questions;
    dj.singleMost = value.singleMost;
    dj.modified = new Date();

    console.log(dj);

    this.http.updateRDJ(dj);
  }

  onClose() {
    this.dorFormService.dailyJournalCloser.next(true);
  }

}
