import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DORCategory } from './../core/data-models/dor-category.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportingService {
  singleUserRatings = new BehaviorSubject<any[]>([]);
  reportingRecruit = '';
  reportingCategories = new BehaviorSubject<any[]>([]);
  reportingPhases = new BehaviorSubject<any[]>([]);

  constructor() { }

  setSingleUserRatings(ratings) {
    this.singleUserRatings.next(ratings);
  }
}
