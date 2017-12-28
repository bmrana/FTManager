import { CannedComment } from './cannedComment.model';
import { CategoryRating } from './categoryRating.model';
import { UsersService } from './../../../core/services/users.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DORRating } from './../../../core/data-models/dor-rating.model';
import { DorComponent } from './../dor.component';
import { DORComment } from './../../../core/data-models/dor-comment.model';
import { FormData } from './dor-form-data.model';
import { Injectable } from '@angular/core';
import { AppUser } from '../../../core/data-models/app-user.model';

@Injectable()
export class DorFormDataService {
  formData: FormData = new FormData();
  formChanged = new BehaviorSubject<boolean>(false);
  currentDORNumber = new BehaviorSubject<number>(null);
  recruitName = new BehaviorSubject<string>(null);
  saveTrigger = new Subject<number>();
  getDorID: number;
  navIndicators = new BehaviorSubject<CategoryRating[]>(this.formData.dorRatings);

  constructor(private users: UsersService) {}

  getDorData() {
    return this.formData;
  }

  setDorData(formData) {
    const recruit = this.users.appUsers.find(a => a.EmployeeID === formData.recruit);
    const fto = this.users.appUsers.find(a => a.EmployeeID === formData.fto);
    this.formData.arrestsMade = formData.arrestsMade;
    this.formData.backupCalls = formData.backupCalls;
    this.formData.districtWorked = formData.districtWorked;
    this.formData.phase = formData.phase;
    this.formData.primaryCalls = formData.primaryCalls;
    this.formData.selfInitCalls = formData.selfInitCalls;
    this.formData.shiftDate = formData.shiftDate;
    this.formData.shiftWorked = formData.shiftWorked;
    this.formData.mostAcceptable = formData.mostAcceptable;
    this.formData.leastAcceptable = formData.leastAcceptable;
    this.formData.otherComments = formData.otherComments;
    this.formData.recruit = recruit;
    this.formData.fto = fto;
    this.formChanged.next(true);
    this.navIndicators.next(this.formData.dorRatings);
  }

  setFinalized(): boolean {
    this.formData.finalized = true;
    return this.formData.finalized;
  }

  setReviewed(): boolean {
    this.formData.reviewed = true;
    return this.formData.reviewed;
  }

  setDorCategories(formData, catID) {
    const rating: CategoryRating = new CategoryRating(catID, formData.rating, formData.remedial, formData.otherComments);
    const ratingIndex = this.formData.dorRatings.indexOf(this.formData.dorRatings.find(r => r.catID === catID));
    if (ratingIndex > -1) {
      this.formData.dorRatings[ratingIndex] = rating;
    } else {
      this.formData.dorRatings.push(rating);
    }

    this.navIndicators.next(this.formData.dorRatings);

    for (let comment of formData.commentsArray) {
      const newComment: CannedComment = new CannedComment(catID, comment.commentID, comment.selected);
      const commentIndex = this.formData.dorComments.indexOf(this.formData.dorComments.find(c => c.commentID === comment.commentID));
      if (commentIndex > -1) {
        this.formData.dorComments[commentIndex] = newComment;
      } else {
      this.formData.dorComments.push(newComment);
      }
    }
    this.formChanged.next(true);
  }

  setDOR(dorData: any[]) {
    this.formData = new FormData();

    for (let row of dorData) {
      if (row.rowType === 'comment') {
        const newComment: CannedComment = new CannedComment(row.commentCatID, row.commentID, row.commentSelected);
        this.formData.dorComments.push(newComment);
      }

      if (row.rowType === 'rating') {
        const newRating: CategoryRating = new CategoryRating(row.ratingCatID, row.rating, row.ratingRemedial, row.ratingOtherComments);
        this.formData.dorRatings.push(newRating);
      }

      if (row.rowType === 'general') {
        const recruit: AppUser = this.users.appUsers.find(a => a.EmployeeID === row.recruit);
        const fto: AppUser = this.users.appUsers.find(a => a.EmployeeID === row.fto);
        this.formData.arrestsMade = row.arrestsMade;
        this.formData.backupCalls = row.backupCalls;
        this.formData.otherComments = row.otherComments;
        this.formData.mostAcceptable = row.mostAcceptable;
        this.formData.leastAcceptable = row.leastAcceptable;
        this.formData.districtWorked = row.districtWorked;
        this.formData.phase = row.phase;
        this.formData.primaryCalls = row.primaryCalls;
        this.formData.selfInitCalls = row.selfInitCalls;
        this.formData.shiftDate =  new Date(+((row.shiftDate.toString()).substr(6, 13)));
        this.formData.recruit = recruit;
        this.formData.shiftWorked = row.shiftWorked;
        this.formData.fto = fto;
        this.formData.finalized = row.finalized;
        this.formData.reviewed = row.reviewed;
        this.formData.dorNumber = row.dor_number;
        this.recruitName.next(recruit.DisplayName);
        this.currentDORNumber.next(row.dor_number);
      }
    }
    this.navIndicators.next(this.formData.dorRatings);
    sessionStorage.removeItem('ftm_formLoader');
  }

  updateDorNumber(dorNumber: number) {
    this.formData.dorNumber = dorNumber;
    this.formChanged.next(false);
    this.currentDORNumber.next(dorNumber);
  }

  resetFormData(): FormData {
    this.formData.clear();
    this.currentDORNumber.next(null);
    this.recruitName.next('');

    // Default ratings for each category
    for (let i = 1; i < 27; i++) {
      const catRating: CategoryRating = new CategoryRating(i, 99, 0, '');
      this.formData.dorRatings.push(catRating);
  }
  this.navIndicators.next(this.formData.dorRatings);
  
    return this.formData;
  }

  
}
