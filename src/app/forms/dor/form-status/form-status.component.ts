import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebConnectServiceService } from '../../../core/web-services/web-connect-service.service';
import { DorFormDataService } from '../data/dor-form-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-status',
  templateUrl: './form-status.component.html',
  styleUrls: ['./form-status.component.css']
})
export class FormStatusComponent implements OnInit {
  currentDorNumber: number;
  dorNumberSubscription: Subscription;
  formChangedSubscription: Subscription;
  recruitNameChanged: Subscription;
  formChanged = false;
  recruitName: string;
  saveStatus: string;
  currentFto: string;
  currentShiftDate: string;
  locked = false;

  constructor(private http: WebConnectServiceService, private dorData: DorFormDataService, private router: Router) { }

    ngOnInit() {
      this.locked = this.dorData.formData.finalized;

      this.dorNumberSubscription = this.dorData.currentDORNumber
        .subscribe(
          (dorNumber) => {
            this.currentDorNumber = dorNumber;
            this.currentFto = this.dorData.formData.fto.DisplayName;
            this.currentShiftDate = this.dorData.formData.shiftDate.toString();
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
              this.router.navigate(['/dashboard']);
            }
          );
      }
    }

}
