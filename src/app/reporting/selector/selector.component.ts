import { SortArrayPipe } from './../../core/pipes/sort-array.pipe';
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
  selectedRecruit = '';
  appUsers: AppUser[] = [];
  categorySubsription: Subscription;

  constructor(private reportingService: ReportingService,
    private dorService: DorService,
    private usersService: UsersService,
    private http: WebConnectServiceService,
    private sortPipe: SortArrayPipe) { }

  onNewRecruit(recruitID) {
    this.reportingService.reportingRecruit = recruitID;
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

  onClearSelections() {
    this.selectedCategories.length = 0;
    this.reportingService.reportingCategories.next(this.selectedCategories);
  }

  getCheckedCategories(category): boolean {
    return this.selectedCategories.indexOf(category) > -1;
  }

  getCheckedPhases(value): boolean {
    return this.selectedPhases.indexOf(value) > -1;
  }

  ngOnInit() {
    this.appUsers.push(...this.usersService.appUsers.slice());
    this.appUsers = this.sortPipe.transform(this.appUsers, 'DisplayName');
    this.allCategories.push(...this.dorService.categories);


    this.selectedCategories = this.reportingService.reportingCategories.value;
    this.selectedPhases = this.reportingService.reportingPhases.value;
    this.selectedRecruit = this.reportingService.reportingRecruit;
  }

}
