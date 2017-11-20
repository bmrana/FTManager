import { CategoryRating } from './categoryRating.model';
import { UsersService } from './../../../core/services/users.service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DORRating } from './../../../core/data-models/dor-rating.model';
import { DorComponent } from './../dor.component';
import { DORComment } from './../../../core/data-models/dor-comment.model';
import { FormData } from './dor-form-data.model';
import { Injectable } from '@angular/core';
import { CannedComment } from './CannedComment.model';

@Injectable()
export class DorFormDataService {
  formData: FormData = new FormData();
  formChanged = new BehaviorSubject<boolean>(false);
  currentDORNumber = new BehaviorSubject<number>(null);
  recruitName = new Subject<string>();

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
    this.formData.recruit = recruit;
    this.formData.fto = fto;
    this.formChanged.next(true);
  }

  setDorCategories(formData, catID) {
    const rating: CategoryRating = new CategoryRating(catID, formData.rating, formData.remedial, formData.otherComments);
    const ratingIndex = this.formData.dorRatings.indexOf(this.formData.dorRatings.find(r => r.catID === catID));
    if (ratingIndex > -1) {
      this.formData.dorRatings[ratingIndex] = rating;
    } else {
      this.formData.dorRatings.push(rating);
    }

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

  updateDorNumber(dorNumber: number) {
    this.formData.dorNumber = dorNumber;
    this.formChanged.next(false);
    this.currentDORNumber.next(dorNumber);
  }

  resetFormData(): FormData {
    this.formData.clear();
    return this.formData;
  }
}
