import { WebConnectServiceService } from './../../core/web-services/web-connect-service.service';
import { UsersService } from './../../core/services/users.service';
import { DORCategory } from './../../core/data-models/dor-category.model';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../reporting.service';
import { DorService } from '../../core/services/dor.service';
import { DorCategoryFormComponent } from '../../forms/dor/dor-category-form/dor-category-form.component';
import { AppUser } from '../../core/data-models/app-user.model';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  allCategories: DORCategory[] = [];
  selectedCategories: any[] = [];
  selectedPhases: any[] = [];
  appUsers: AppUser[] = [];

  constructor(private reportingService: ReportingService,
    private dorService: DorService,
    private usersService: UsersService,
    private http: WebConnectServiceService) { }

  onNewRecruit(recruitID) {
    this.http.getSingleRecruitRatings(recruitID);
  }

  onPhaseSelected(value: number, selected: boolean) {
    if (selected === true) {
      this.selectedPhases.push(value);
    } else {
      const i = this.selectedPhases.indexOf(value);
      this.selectedPhases.splice(i, 1);
    }

    this.reportingService.reportingPhases.next(this.selectedPhases);
  }

  onCategorySelected(value: number, selected: boolean) {
    if (selected === true) {
      this.selectedCategories.push(value);
    } else {
      const i = this.selectedCategories.indexOf(value);
      if (i > -1) {
        this.selectedCategories.splice(i, 1);
      }
    }

    this.reportingService.reportingCategories.next(this.selectedCategories);
  }
  ngOnInit() {
    this.appUsers.push(...this.usersService.appUsers.slice());
    this.allCategories.push(...this.dorService.categories);
  }

}
