import { Subscription } from 'rxjs/Subscription';
import { FormData } from './../data/dor-form-data.model';
import { AppUser } from './../../../core/data-models/app-user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../../../core/services/users.service';
import { DorFormDataService } from './../data/dor-form-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { WebConnectServiceService } from '../../../core/web-services/web-connect-service.service';

@Component({
  selector: 'app-dor-general-form',
  templateUrl: './dor-general-form.component.html',
  styleUrls: ['./dor-general-form.component.css']
})
export class DorGeneralFormComponent implements OnInit {
  dorForm: FormGroup;
  appUsers: AppUser[];
  dorData: FormData;
  dorNumberSubscription: Subscription;
  currentDorNumber: number;
  locked = false;

  phases: any[] = [{name: 'Phase 2', value: '2'},
                  {name: 'Phase 3', value: '3'},
                  {name: 'Phase 4', value: '4'},
                  {name: 'Traffic', value: '10'},
                  {name: 'Remedial', value: '0'}];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dorDataService: DorFormDataService,
              private usersService: UsersService,
              private http: WebConnectServiceService) { }

  ngOnInit() {
    this.appUsers = this.usersService.appUsers;
    this.appUsers.sort( function(name1, name2) {
      if (name1.DisplayName < name2.DisplayName) {
        return -1;
      } else if (name1.DisplayName > name2.DisplayName) {
        return 1;
      } else {
        return 0;
      }
    });

    this.dorNumberSubscription = this.dorDataService.currentDORNumber
    .subscribe(
      (dorNumber) => {
        this.currentDorNumber = dorNumber;
      }
    );

    this.dorData = this.dorDataService.getDorData();

    this.initForm();
  }

  onGenerateDOR() {
    this.dorDataService.setDorData(this.dorForm.value);
    this.http.insertDOR(this.dorDataService.formData);
  }

  initForm() {
    let recruit: AppUser = null;
    let fto: AppUser = null;
    let phase = '';
    let dateOfShift: Date = null;
    let shiftWorked = '';
    let districtWorked = '';
    let primaryCalls = null;
    let backupCalls = null;
    let selfInitCalls = null;
    let arrestsMade = null;
    let mostAcceptable = null;
    let leastAcceptable = null;
    let otherComments = null;

    const dor = this.dorData;
    recruit = dor.recruit;
    fto = dor.fto;
    phase = dor.phase;
    dateOfShift = dor.shiftDate;
    shiftWorked = dor.shiftWorked;
    districtWorked = dor.districtWorked;
    primaryCalls = dor.primaryCalls;
    backupCalls = dor.backupCalls;
    selfInitCalls = dor.selfInitCalls;
    arrestsMade = dor.arrestsMade;
    mostAcceptable = dor.mostAcceptable;
    leastAcceptable = dor.leastAcceptable;
    otherComments = dor.otherComments;

    this.locked = dor.finalized;

    this.dorForm = new FormGroup({
      'recruit': new FormControl(recruit.EmployeeID, Validators.required),
      'fto': new FormControl(fto.EmployeeID, Validators.required),
      'phase': new FormControl({value: phase, disabled: this.locked}, Validators.required),
      'shiftDate': new FormControl({value: dateOfShift, disabled: this.locked}, Validators.required),
      'shiftWorked': new FormControl({value: shiftWorked, disabled: this.locked}, Validators.required),
      'districtWorked': new FormControl({value: districtWorked, disabled: this.locked}, Validators.required),
      'primaryCalls': new FormControl({value: primaryCalls, disabled: this.locked}, Validators.required),
      'backupCalls': new FormControl({value: backupCalls, disabled: this.locked}, Validators.required),
      'selfInitCalls': new FormControl({value: selfInitCalls, disabled: this.locked}, Validators.required),
      'arrestsMade': new FormControl({value: arrestsMade, disabled: this.locked}, Validators.required),
      'mostAcceptable': new FormControl({value: mostAcceptable, disabled: this.locked}, Validators.required),
      'leastAcceptable': new FormControl({value: leastAcceptable, disabled: this.locked}, Validators.required),
      'otherComments': new FormControl({value: otherComments, disabled: this.locked})
    });

  }
  save(): boolean {
    if (!this.dorForm.valid) {
      return false;
    }
    this.dorDataService.setDorData(this.dorForm.value);
    return true;
  }

  goToNext() {
    if (this.save()) {
      this.router.navigate(['../1'], {relativeTo: this.route});
    }
  }

  onRecruitSelected(eid) {
    const user = this.appUsers.find(a => a.EmployeeID === eid);
    this.dorDataService.recruitName.next(user.DisplayName);
  }
}
