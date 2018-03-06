import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { EmailService } from './../../../core/services/email.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { WebConnectServiceService } from '../../../core/web-services/web-connect-service.service';
import { DorFormDataService } from '../data/dor-form-data.service';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../../core/services/authorization.service';
import { DailyJournal } from '../../daily-journal/daily-journal.model';

@Component({
  selector: 'app-form-status',
  templateUrl: './form-status.component.html',
  styleUrls: ['./form-status.component.css']
})
export class FormStatusComponent implements OnInit, OnDestroy {
  @ViewChild('closeRDJ') closeRDJ: ElementRef;

  currentDorNumber: number;
  dailyJournal: DailyJournal;
  dorNumberSubscription: Subscription;
  formChangedSubscription: Subscription;
  recruitNameChanged: Subscription;
  sendMailSubscription: Subscription;
  rdjCloseSubscription: Subscription;
  formChanged = false;
  recruitName: string;
  saveStatus: string;
  currentFto: string;
  authLevel = 0;
  currentShiftDate: string;
  locked = false;
  reviewed = false;
  authSubscription: Subscription;


  constructor(private http: WebConnectServiceService, private dorData: DorFormDataService,
    private router: Router, private auth: AuthorizationService, private mail: EmailService) { }

    ngOnDestroy() {
      this.authSubscription.unsubscribe();
      this.dorNumberSubscription.unsubscribe();
      this.formChangedSubscription.unsubscribe();
      this.recruitNameChanged.unsubscribe();
      if (this.sendMailSubscription) {this.sendMailSubscription.unsubscribe(); }
      this.rdjCloseSubscription.unsubscribe();
    }

    ngOnInit() {
      this.locked = this.dorData.formData.finalized;
      this.dailyJournal = this.dorData.dailyJournal;

      this.dorNumberSubscription = this.dorData.currentDORNumber
        .subscribe(
          (dorNumber) => {
            this.currentDorNumber = dorNumber;
            this.currentFto = this.dorData.formData.fto.DisplayName;
            this.currentShiftDate = this.dorData.formData.shiftDate.toString();
            this.reviewed = this.dorData.formData.reviewed;
          }
        );

        this.authSubscription = this.auth.authorization
        .subscribe(
          (authLevel) => {
            this.authLevel = authLevel;
          }
        );

      this.formChangedSubscription = this.dorData.formChanged
        .subscribe(
          (formChanged) => {
            this.formChanged = formChanged;
            this.saveStatus = formChanged ? 'Not Saved' : 'Saved';
          }
        );

      this.recruitNameChanged = this.dorData.recruitName
        .subscribe(
          (name) => {
            this.recruitName = name;
          }
        );

        this.rdjCloseSubscription = this.dorData.dailyJournalCloser
          .subscribe(
            (c) => {
              this.closeRDJ.nativeElement.click();
            }
          );
    }

    onSubmit() {
      this.dorData.saveTrigger.next(1);
      this.http.insertDOR(this.dorData.getDorData());
    }

    onFinalize() {
      if (this.dorData.setFinalized()) {
        this.dorData.saveTrigger.next(1);
        this.http.insertFinalized(this.dorData.getDorData())
          .subscribe(
            d => {
              this.sendMailSubscription =  this.mail.sendMail(
                this.mail.constructMessage(
                  this.dorData.formData, 'dor'))
                    .subscribe();
              this.router.navigate(['/dashboard/dors']);
            }
          );
      }
    }

    onReviewed() {
      if (this.dorData.setReviewed()) {
        this.dorData.saveTrigger.next(9);
        this.http.insertFinalized(this.dorData.getDorData())
          .subscribe(
            d => {
              this.router.navigate(['/dashboard/dors']);
            }
          );
      }
    }

}
