import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { WebConnectServiceService } from '../../../core/web-services/web-connect-service.service';
import { DorFormDataService } from '../data/dor-form-data.service';

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

  constructor(private http: WebConnectServiceService, private dorData: DorFormDataService) { }
  
    ngOnInit() {
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
      this.http.insertDOR(this.dorData.formData);
    }
  

}
