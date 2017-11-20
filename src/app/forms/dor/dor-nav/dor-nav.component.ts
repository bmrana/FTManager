import { DorService } from './../../../core/services/dor.service';
import { DORCategory } from './../../../core/data-models/dor-category.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dor-nav',
  templateUrl: './dor-nav.component.html',
  styleUrls: ['./dor-nav.component.css']
})
export class DorNavComponent implements OnInit {
  categories: DORCategory[];

  constructor(private dorService: DorService) {
    this.categories = this.dorService.categories;    
  }

  ngOnInit() {
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
