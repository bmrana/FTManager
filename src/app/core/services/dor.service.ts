import { DORRating } from './../data-models/dor-rating.model';
import { DORComment } from './../data-models/dor-comment.model';
import { DORCategory } from './../data-models/dor-category.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DorService {
  categories: DORCategory[] = [];
  comments: DORComment[] = [];
  ratings: DORRating[] = [];
  lookupsRetrieved = new Subject<boolean>();

  constructor() { }

  populateLists(lookupValues: any[]) {
    lookupValues.map(
      (item) => {
        switch (item.lookupType) {
          case 'CAT': {
            this.categories.push(new DORCategory(item.catID, item.catName, item.catValue, item.catDesc));
            break;
          }
          case 'COM': {
            this.comments.push(new DORComment(item.commentsID,
                                              item.commentsCatID,
                                              item.commentsComment,
                                              item.commentsPrefix));
            break;
          }
          case 'RAT': {
            this.ratings.push(new DORRating(item.ratingID,
                                            item.ratingName,
                                            item.ratingValue, null, null, null, null));
            break;
          }
        }
      }
    );
    this.lookupsRetrieved.next(true);
  }

}
