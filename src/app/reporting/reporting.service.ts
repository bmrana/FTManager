import { DORCategory } from './../core/data-models/dor-category.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportingService {
  singleUserRatings = new Subject<any[]>();
  reportingCategories = new Subject<any[]>();
  reportingPhases = new Subject<any[]>();

  constructor() { }

  setSingleUserRatings(ratings) {
    this.singleUserRatings.next(ratings);
  }
}
