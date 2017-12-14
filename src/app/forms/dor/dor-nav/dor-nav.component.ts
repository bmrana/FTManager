import { DorService } from './../../../core/services/dor.service';
import { DORCategory } from './../../../core/data-models/dor-category.model';
import { Component, OnInit } from '@angular/core';
import { CategoryRating } from '../data/categoryRating.model';
import { DorFormDataService } from '../data/dor-form-data.service';

@Component({
  selector: 'app-dor-nav',
  templateUrl: './dor-nav.component.html',
  styleUrls: ['./dor-nav.component.css']
})
export class DorNavComponent implements OnInit {
  categories: DORCategory[];
  ratings: CategoryRating[] = [];

  constructor(private dorService: DorService, private dorData: DorFormDataService) {
    this.categories = this.dorService.categories;
  }

  ngOnInit() {
    this.dorData.navIndicators.subscribe(
      (i) => {
        this.ratings.length = 0;
        this.ratings.push(...i);
      }
    );

    this.categories.sort( function(value1, value2) {
      if (value1.value < value2.value) {
        return -1;
      } else if (value1.value > value2.value) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  
}
